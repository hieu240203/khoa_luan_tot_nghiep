"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { BarChart, Store, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function OwnerDashboard() {
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [restaurantIdToDelete, setRestaurantIdToDelete] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState({ message: "", type: "" })
  const [alert, setAlert] = useState({ message: "", type: "" })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    if (!token) {
      setAlert({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error",
      })
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } else {
      fetch("http://127.0.0.1:8000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data?.role === "owner" && data?.id) {
            localStorage.setItem("owner_id", data.id)
            fetchRestaurantCount(data.id, token)
          }
        })
        .catch(() => {
          setAlert({ message: "Không lấy được thông tin người dùng", type: "error" })
        })
    }
  }, [router])

  const fetchRestaurantCount = async (ownerId: string, token: string) => {
    if (!token || !ownerId) return

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/owner/owner/${ownerId}/total-restaurants`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        setTotalRestaurants(data.total_restaurants || 0)
      }
    } catch (error) {
      console.error("Error fetching restaurant count:", error)
    }
  }

  const handleDeleteRestaurant = async () => {
    const token = localStorage.getItem("token")
    const ownerId = localStorage.getItem("owner_id")

    if (!restaurantIdToDelete) {
      setDeleteStatus({ message: "Vui lòng nhập ID nhà hàng cần xóa", type: "error" })
      return
    }

    if (!token || !ownerId) {
      setDeleteStatus({ message: "Thiếu token hoặc ID chủ quán. Vui lòng đăng nhập lại", type: "error" })
      setTimeout(() => {
        router.push("/login")
      }, 2000)
      return
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/owner/owner/${ownerId}/restaurant/${restaurantIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setDeleteStatus({ message: "Xóa nhà hàng thành công", type: "success" })
        setRestaurantIdToDelete("")
        fetchRestaurantCount(ownerId, token)
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
        setIsDeleteDialogOpen(false)
      } else {
        const error = await res.json()
        const msg = error?.detail || (Array.isArray(error) ? error.map(e => e.msg).join(", ") : "Không thể xóa nhà hàng")
        setDeleteStatus({ message: `Lỗi: ${msg}`, type: "error" })
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error)
      setDeleteStatus({ message: "Đã xảy ra lỗi khi xóa nhà hàng", type: "error" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển Chủ quán</h1>
          <p className="text-gray-500">Quản lý hệ thống quán ăn của bạn</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/owner/create-restaurant")}>Thêm quán ăn mới</Button>
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
                <DialogDescription>Nhập ID của nhà hàng bạn muốn xóa.</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
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
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Hủy</Button>
                <Button variant="destructive" onClick={handleDeleteRestaurant}>Xóa nhà hàng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="mb-4 text-green-600 bg-green-100 p-4 rounded shadow-sm">
          ✅ Nhà hàng đã được xóa thành công.
        </div>
      )}

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
              <h3 className="text-2xl font-bold">{totalRestaurants}</h3>
            </div>
          </CardContent>

        </Card>
      </div>
    </div>
  )
}
