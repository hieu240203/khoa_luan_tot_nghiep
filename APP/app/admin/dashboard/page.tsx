"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// Thêm vào phần import đầu của file
import { Button } from "@/components/ui/button"; // Nhập Button
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; // Nhập các component Dialog
import { Trash2 } from "lucide-react"; 
import { BarChart, Users, Store, Star } from "lucide-react"; // Nhập các icon
import { Input } from "@/components/ui/input"; // Nhập Input
import { Label } from "@/components/ui/label"; // Nhập Label
import { Card, CardContent } from "@/components/ui/card"; 

export default function AdminDashboard() {
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [restaurantIdToDelete, setRestaurantIdToDelete] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState({ message: "", type: "" })
  const [alert, setAlert] = useState({ message: "", type: "" });

  const router = useRouter()

  // Kiểm tra token trong localStorage khi client-side
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setAlert({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [router]);

  // Fetch data from the backend APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const headers: Record<string, string> = {
          "Content-Type": "application/json"
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch data
        const restaurantsResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/restaurants", {
          headers
        });

        if (restaurantsResponse.ok) {
          const restaurantsData = await restaurantsResponse.json();
          setTotalRestaurants(restaurantsData.total_restaurants);
        }

        const usersResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/users", {
          headers
        });

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setTotalUsers(usersData.total_users);
        }

        const reviewsResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/reviews", {
          headers
        });

        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setTotalReviews(reviewsData.total_reviews);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateRestaurant = () => {
    router.push("/admin/create-restaurant")
  }

  const handleDeleteRestaurant = async () => {
    if (!restaurantIdToDelete) {
      setDeleteStatus({
        message: "Vui lòng nhập ID nhà hàng",
        type: "error"
      });
      return;
    }

    // Lấy token xác thực
    const token = localStorage.getItem("token");  // Sử dụng "token" thay vì "auth_token"

    if (!token) {
      setDeleteStatus({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error"
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    try {
      // Xóa nhà hàng
      const response = await fetch(`http://127.0.0.1:8000/api/admin/api/admin/${restaurantIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Đảm bảo token được truyền đúng
        }
      });

      if (response.ok) {
        setDeleteStatus({
          message: "Xóa nhà hàng thành công",
          type: "success"
        });

        setRestaurantIdToDelete("");

        // Fetch lại số lượng nhà hàng
        const restaurantsResponse = await fetch("http://127.0.0.1:8000/api/admin/count/restaurants", {
          headers: {
            "Authorization": `Bearer ${token}`  // Đảm bảo token được truyền trong tất cả các yêu cầu
          }
        });

        if (restaurantsResponse.ok) {
          const restaurantsData = await restaurantsResponse.json();
          setTotalRestaurants(restaurantsData.total_restaurants);
        }
      } else {
        const errorData = await response.json();
        setDeleteStatus({
          message: `Lỗi: ${errorData.detail || "Không thể xóa nhà hàng"}`,
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      setDeleteStatus({
        message: "Đã xảy ra lỗi khi xóa nhà hàng",
        type: "error"
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
          <p className="text-gray-500">Xem tổng quan và quản lý hệ thống</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateRestaurant}>
            Thêm quán ăn mới
          </Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa nhà hàng
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Xóa nhà hàng</DialogTitle>
                <DialogDescription>
                  Nhập ID của nhà hàng mà bạn muốn xóa. Hành động này không thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-id">ID nhà hàng</Label>
                    <Input
                      id="restaurant-id"
                      placeholder="Nhập ID nhà hàng"
                      value={restaurantIdToDelete}
                      onChange={(e) => setRestaurantIdToDelete(e.target.value)}
                    />
                  </div>
                  {deleteStatus.message && (
                    <div className={`p-2 rounded ${deleteStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {deleteStatus.message}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Hủy</Button>
                <Button variant="destructive" onClick={handleDeleteRestaurant}>Xóa nhà hàng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Store className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Tổng số quán ăn</p>
              <h3 className="text-2xl font-bold">{totalRestaurants}</h3> {/* Hiển thị số lượng quán ăn thực tế */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Tổng số người dùng</p>
              <h3 className="text-2xl font-bold">{totalUsers}</h3> {/* Hiển thị số lượng người dùng thực tế */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Tổng số đánh giá</p>
              <h3 className="text-2xl font-bold">{totalReviews}</h3> {/* Hiển thị số lượng đánh giá thực tế */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Số lượt click vào quán ăn khi hệ thống gợi ý</p>
              <h3 className="text-2xl font-bold">24,389</h3> {/* Hiển thị số lượt click thực tế nếu có API */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
