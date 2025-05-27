// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// // Thêm vào phần import đầu của file
// import { Button } from "@/components/ui/button"; // Nhập Button
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; // Nhập các component Dialog
// import { Trash2, CheckCircle, XCircle, UserPlus } from "lucide-react"; // Thêm các icon mới
// import { BarChart, Users, Store, Star } from "lucide-react"; // Nhập các icon
// import { Input } from "@/components/ui/input"; // Nhập Input
// import { Label } from "@/components/ui/label"; // Nhập Label
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Thêm components Table
// import { Badge } from "@/components/ui/badge"; // Thêm component Badge
// import { format } from "date-fns"; // Để format ngày tháng

// // Khai báo interface cho owner request
// interface OwnerRequest {
//   id: number;
//   user_id: number;
//   message: string;
//   status: string;
//   created_at: string;
// }

// export default function AdminDashboard() {
// const [totalRestaurants, setTotalRestaurants] = useState(0)
// const [totalUsers, setTotalUsers] = useState(0)
// const [totalReviews, setTotalReviews] = useState(0)
// const [totalFeedbacks, setTotalFeedbacks] = useState(0) // Thêm state mới cho lượt click/feedbacks
// const [restaurantIdToDelete, setRestaurantIdToDelete] = useState("")
// const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// const [deleteStatus, setDeleteStatus] = useState({ message: "", type: "" })
// const [alert, setAlert] = useState({ message: "", type: "" });
// const [ownerRequests, setOwnerRequests] = useState<OwnerRequest[]>([]); // Thêm state cho owner requests
// const [isOwnerRequestsOpen, setIsOwnerRequestsOpen] = useState(false); // State để kiểm soát hiển thị dialog
// const [requestActionStatus, setRequestActionStatus] = useState({ message: "", type: "" }); // State cho thông báo khi xử lý request
// const [restaurantIdToUpdate, setRestaurantIdToUpdate] = useState("");
// const [showUpdateDialog, setShowUpdateDialog] = useState(false);
// const router = useRouter()

// // Kiểm tra token trong localStorage khi client-side
// useEffect(() => {
// const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

// if (!token) {
//   setAlert({
//     message: "Bạn cần đăng nhập để thực hiện chức năng này",
//     type: "error",
//   });
//   setTimeout(() => {
//     router.push("/login");
//   }, 2000);
// }

// }, [router]);

// // Fetch data from the backend APIs
// useEffect(() => {
// const fetchData = async () => {
// try {
// const token = localStorage.getItem("auth_token");
// const headers: Record<string, string> = {
// "Content-Type": "application/json"
// };

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     // Fetch data
//     const restaurantsResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/restaurants", {
//       headers
//     });

//     if (restaurantsResponse.ok) {
//       const restaurantsData = await restaurantsResponse.json();
//       setTotalRestaurants(restaurantsData.total_restaurants);
//     }

//     const usersResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/users", {
//       headers
//     });

//     if (usersResponse.ok) {
//       const usersData = await usersResponse.json();
//       setTotalUsers(usersData.total_users);
//     }

//     const reviewsResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/reviews", {
//       headers
//     });

//     if (reviewsResponse.ok) {
//       const reviewsData = await reviewsResponse.json();
//       setTotalReviews(reviewsData.total_reviews);
//     }
    
//     // Thêm API để lấy số lượng feedbacks (lượt click vào quán ăn)
//     const feedbacksResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/feedbacks", {
//       headers
//     });
    
//     if (feedbacksResponse.ok) {
//       const feedbacksData = await feedbacksResponse.json();
//       setTotalFeedbacks(feedbacksData.total_feedbacks); // Giả sử API trả về dạng {total_feedbacks: số_lượng}
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// fetchData();
// }, []);

// // Hàm fetch owner requests
// const fetchOwnerRequests = async () => {
//   try {
//     const token = localStorage.getItem("token");
    
//     if (!token) {
//       setRequestActionStatus({
//         message: "Bạn cần đăng nhập để thực hiện chức năng này",
//         type: "error"
//       });
//       return;
//     }
    
//     const response = await fetch("http://127.0.0.1:8000/api/admin/api/admin/owner-requests", {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       }
//     });
    
//     if (response.ok) {
//       const data = await response.json();
//       setOwnerRequests(data);
//     } else {
//       console.error("Failed to fetch owner requests");
//       setRequestActionStatus({
//         message: "Không thể lấy danh sách yêu cầu",
//         type: "error"
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching owner requests:", error);
//     setRequestActionStatus({
//       message: "Đã xảy ra lỗi khi lấy danh sách yêu cầu",
//       type: "error"
//     });
//   }
// };

// // Gọi fetchOwnerRequests khi dialog được mở
// useEffect(() => {
//   if (isOwnerRequestsOpen) {
//     fetchOwnerRequests();
//   }
// }, [isOwnerRequestsOpen]);

// const handleCreateRestaurant = () => {
// router.push("/admin/create-restaurant")
// }

// const handleDeleteRestaurant = async () => {
// if (!restaurantIdToDelete) {
// setDeleteStatus({
// message: "Vui lòng nhập ID nhà hàng",
// type: "error"
// });
// return;
// }

// // Lấy token xác thực
// const token = localStorage.getItem("token");  // Sử dụng "token" thay vì "auth_token"

// if (!token) {
//   setDeleteStatus({
//     message: "Bạn cần đăng nhập để thực hiện chức năng này",
//     type: "error"
//   });
//   setTimeout(() => {
//     router.push("/login");
//   }, 2000);
//   return;
// }

// try {
//   // Xóa nhà hàng
//   const response = await fetch(`http://127.0.0.1:8000/api/admin/api/admin/${restaurantIdToDelete}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`, // Đảm bảo token được truyền đúng
//     }
//   });

//   if (response.ok) {
//     setDeleteStatus({
//       message: "Xóa nhà hàng thành công",
//       type: "success"
//     });

//     setRestaurantIdToDelete("");

//     // Fetch lại số lượng nhà hàng
//     const restaurantsResponse = await fetch("http://127.0.0.1:8000/api/admin/count/restaurants", {
//       headers: {
//         "Authorization": `Bearer ${token}`  // Đảm bảo token được truyền trong tất cả các yêu cầu
//       }
//     });

//     if (restaurantsResponse.ok) {
//       const restaurantsData = await restaurantsResponse.json();
//       setTotalRestaurants(restaurantsData.total_restaurants);
//     }
//   } else {
//     const errorData = await response.json();
//     setDeleteStatus({
//       message: `Lỗi: ${errorData.detail || "Không thể xóa nhà hàng"}`,
//       type: "error"
//     });
//   }
// } catch (error) {
//   console.error("Error deleting restaurant:", error);
//   setDeleteStatus({
//     message: "Đã xảy ra lỗi khi xóa nhà hàng",
//     type: "error"
//   });
// }
// }

// // Hàm xử lý chấp thuận yêu cầu trở thành owner
// const handleApproveOwnerRequest = async (requestId: number) => {
//   try {
//     const token = localStorage.getItem("token");
    
//     if (!token) {
//       setRequestActionStatus({
//         message: "Bạn cần đăng nhập để thực hiện chức năng này",
//         type: "error"
//       });
//       return;
//     }
    
//     const response = await fetch(`http://127.0.0.1:8000/api/admin/api/admin/approve-owner/${requestId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       }
//     });
    
//     if (response.ok) {
//       setRequestActionStatus({
//         message: "Đã chấp thuận yêu cầu thành công",
//         type: "success"
//       });
      
//       // Cập nhật lại danh sách sau khi chấp thuận
//       fetchOwnerRequests();
//     } else {
//       const errorData = await response.json();
//       setRequestActionStatus({
//         message: `Lỗi: ${errorData.detail || "Không thể chấp thuận yêu cầu"}`,
//         type: "error"
//       });
//     }
//   } catch (error) {
//     console.error("Error approving owner request:", error);
//     setRequestActionStatus({
//       message: "Đã xảy ra lỗi khi chấp thuận yêu cầu",
//       type: "error"
//     });
//   }
// };

// // Format date function
// const formatDate = (dateString: string) => {
//   try {
//     return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
//   } catch (error) {
//     return dateString;
//   }
// };

// return ( <div className="container mx-auto px-4 py-8"> <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"> <div> <h1 className="text-3xl font-bold">Bảng điều khiển</h1> <p className="text-gray-500">Xem tổng quan và quản lý hệ thống</p> </div> <div className="flex gap-3 mt-4 md:mt-0"> <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateRestaurant}>
// Thêm quán ăn mới </Button> 

// {/* Thêm nút hiển thị yêu cầu Owner */}
// <Button 
//   className="bg-blue-600 hover:bg-blue-700"
//   onClick={() => setIsOwnerRequestsOpen(true)}
// >
//   <UserPlus className="mr-2 h-4 w-4" />
//   Yêu cầu Owner
// </Button>

// <Dialog open={isOwnerRequestsOpen} onOpenChange={setIsOwnerRequestsOpen}>
//   <DialogContent className="sm:max-w-4xl">
//     <DialogHeader>
//       <DialogTitle>Danh sách yêu cầu trở thành Owner</DialogTitle>
//       <DialogDescription>
//         Xem và phê duyệt các yêu cầu trở thành owner của người dùng
//       </DialogDescription>
//     </DialogHeader>
//     <div className="py-4">
//       {requestActionStatus.message && (
//         <div className={`p-2 mb-4 rounded ${requestActionStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//           {requestActionStatus.message}
//         </div>
//       )}
      
//       {ownerRequests.length > 0 ? (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>User ID</TableHead>
//               <TableHead>Lời nhắn</TableHead>
//               <TableHead>Trạng thái</TableHead>
//               <TableHead>Ngày tạo</TableHead>
//               <TableHead>Hành động</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {ownerRequests.map((request) => (
//               <TableRow key={request.id}>
//                 <TableCell>{request.id}</TableCell>
//                 <TableCell>{request.user_id}</TableCell>
//                 <TableCell>{request.message}</TableCell>
//                 <TableCell>
//                   <Badge variant={request.status === "pending" ? "outline" : "default"}>
//                     {request.status === "pending" ? "Đang chờ" : request.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>{formatDate(request.created_at)}</TableCell>
//                 <TableCell>
//                   {request.status === "pending" && (
//                     <Button 
//                       onClick={() => handleApproveOwnerRequest(request.id)}
//                       size="sm"
//                       className="bg-green-600 hover:bg-green-700"
//                     >
//                       <CheckCircle className="h-4 w-4 mr-1" />
//                       Chấp thuận
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//         <p className="text-center py-4">Không có yêu cầu nào</p>
//       )}
//     </div>
//     <DialogFooter>
//       <Button variant="outline" onClick={() => setIsOwnerRequestsOpen(false)}>Đóng</Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>

// <Button 
//   variant="destructive"
//   onClick={() => setIsDeleteDialogOpen(true)}
// >
//   <Trash2 className="mr-2 h-4 w-4" />
//   Xóa nhà hàng
// </Button>

// <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}> <DialogContent className="sm:max-w-md"> <DialogHeader> <DialogTitle>Xóa nhà hàng</DialogTitle> <DialogDescription>
// Nhập ID của nhà hàng mà bạn muốn xóa. Hành động này không thể hoàn tác. </DialogDescription> </DialogHeader> <div className="py-4"> <div className="space-y-4"> <div className="space-y-2"> <Label htmlFor="restaurant-id">ID nhà hàng</Label>
// <Input
// id="restaurant-id"
// placeholder="Nhập ID nhà hàng"
// value={restaurantIdToDelete}
// onChange={(e) => setRestaurantIdToDelete(e.target.value)}
// /> </div>
// {deleteStatus.message && (
// <div className={`p-2 rounded ${deleteStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
// {deleteStatus.message} </div>
// )} </div> </div> <DialogFooter>
// <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Hủy</Button> <Button variant="destructive" onClick={handleDeleteRestaurant}>Xóa nhà hàng</Button> </DialogFooter> </DialogContent> </Dialog> </div> </div>

//   {/* Stats Cards */}
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
//             <Store className="h-6 w-6 text-green-600" />
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm text-gray-500">Tổng số quán ăn</p>
//           <h3 className="text-2xl font-bold">{totalRestaurants}</h3> {/* Hiển thị số lượng quán ăn thực tế */}
//         </div>
//       </CardContent>
//     </Card>
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
//             <Users className="h-6 w-6 text-blue-600" />
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm text-gray-500">Tổng số người dùng</p>
//           <h3 className="text-2xl font-bold">{totalUsers}</h3> {/* Hiển thị số lượng người dùng thực tế */}
//         </div>
//       </CardContent>
//     </Card>
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
//             <Star className="h-6 w-6 text-orange-600" />
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm text-gray-500">Tổng số đánh giá</p>
//           <h3 className="text-2xl font-bold">{totalReviews}</h3> {/* Hiển thị số lượng đánh giá thực tế */}
//         </div>
//       </CardContent>
//     </Card>
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
//             <BarChart className="h-6 w-6 text-red-600" />
//           </div>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm text-gray-500">Số lượt click vào quán ăn khi hệ thống gợi ý</p>
//           <h3 className="text-2xl font-bold">{totalFeedbacks}</h3> {/* Sử dụng dữ liệu từ API thay vì giá trị cứng */}
//         </div>
//       </CardContent>
//     </Card>
//   </div>
  
//   {/* Thêm card hiển thị yêu cầu owner gần đây */}
//   <Card className="mb-8">
//     <CardHeader>
//       <CardTitle>Yêu cầu Owner gần đây</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <p className="text-sm text-gray-500 mb-4">
//         Xem và quản lý các yêu cầu trở thành owner của người dùng
//       </p>
//       <Button 
//         className="bg-blue-600 hover:bg-blue-700"
//         onClick={() => setIsOwnerRequestsOpen(true)}
//       >
//         <UserPlus className="mr-2 h-4 w-4" />
//         Xem danh sách yêu cầu
//       </Button>
//     </CardContent>
//   </Card>
// </div>
// )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// Thêm vào phần import đầu của file
import { Button } from "@/components/ui/button"; // Nhập Button
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; // Nhập các component Dialog
import { Trash2, CheckCircle, XCircle, UserPlus } from "lucide-react"; // Thêm các icon mới
import { BarChart, Users, Store, Star } from "lucide-react"; // Nhập các icon
import { Input } from "@/components/ui/input"; // Nhập Input
import { Label } from "@/components/ui/label"; // Nhập Label
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Thêm components Table
import { Badge } from "@/components/ui/badge"; // Thêm component Badge
import { format } from "date-fns"; // Để format ngày tháng

// Khai báo interface cho owner request
interface OwnerRequest {
  id: number;
  user_id: number;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
const [totalRestaurants, setTotalRestaurants] = useState(0)
const [totalUsers, setTotalUsers] = useState(0)
const [totalReviews, setTotalReviews] = useState(0)
const [totalFeedbacks, setTotalFeedbacks] = useState(0) // Thêm state mới cho lượt click/feedbacks
const [restaurantIdToDelete, setRestaurantIdToDelete] = useState("")
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
const [deleteStatus, setDeleteStatus] = useState({ message: "", type: "" })
const [alert, setAlert] = useState({ message: "", type: "" });
const [ownerRequests, setOwnerRequests] = useState<OwnerRequest[]>([]); // Thêm state cho owner requests
const [isOwnerRequestsOpen, setIsOwnerRequestsOpen] = useState(false); // State để kiểm soát hiển thị dialog
const [requestActionStatus, setRequestActionStatus] = useState({ message: "", type: "" }); // State cho thông báo khi xử lý request
const [restaurantIdToUpdate, setRestaurantIdToUpdate] = useState("");
const [showUpdateDialog, setShowUpdateDialog] = useState(false);
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
    
    // Thêm API để lấy số lượng feedbacks (lượt click vào quán ăn)
    const feedbacksResponse = await fetch("http://127.0.0.1:8000/api/admin/api/admin/count/feedbacks", {
      headers
    });
    
    if (feedbacksResponse.ok) {
      const feedbacksData = await feedbacksResponse.json();
      setTotalFeedbacks(feedbacksData.total_feedbacks); // Giả sử API trả về dạng {total_feedbacks: số_lượng}
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();
}, []);

// Hàm fetch owner requests
const fetchOwnerRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setRequestActionStatus({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error"
      });
      return;
    }
    
    const response = await fetch("http://127.0.0.1:8000/api/admin/api/admin/owner-requests", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      setOwnerRequests(data);
    } else {
      console.error("Failed to fetch owner requests");
      setRequestActionStatus({
        message: "Không thể lấy danh sách yêu cầu",
        type: "error"
      });
    }
  } catch (error) {
    console.error("Error fetching owner requests:", error);
    setRequestActionStatus({
      message: "Đã xảy ra lỗi khi lấy danh sách yêu cầu",
      type: "error"
    });
  }
};

// Gọi fetchOwnerRequests khi dialog được mở
useEffect(() => {
  if (isOwnerRequestsOpen) {
    fetchOwnerRequests();
  }
}, [isOwnerRequestsOpen]);

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

// Hàm xử lý chấp thuận yêu cầu trở thành owner
const handleApproveOwnerRequest = async (requestId: number) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setRequestActionStatus({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error"
      });
      return;
    }
    
    const response = await fetch(`http://127.0.0.1:8000/api/admin/api/admin/approve-owner/${requestId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      setRequestActionStatus({
        message: "Đã chấp thuận yêu cầu thành công",
        type: "success"
      });
      
      // Cập nhật lại danh sách sau khi chấp thuận
      fetchOwnerRequests();
    } else {
      const errorData = await response.json();
      setRequestActionStatus({
        message: `Lỗi: ${errorData.detail || "Không thể chấp thuận yêu cầu"}`,
        type: "error"
      });
    }
  } catch (error) {
    console.error("Error approving owner request:", error);
    setRequestActionStatus({
      message: "Đã xảy ra lỗi khi chấp thuận yêu cầu",
      type: "error"
    });
  }
};

// Format date function
const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  } catch (error) {
    return dateString;
  }
};

return ( <div className="container mx-auto px-4 py-8"> <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"> <div> <h1 className="text-3xl font-bold">Bảng điều khiển</h1> <p className="text-gray-500">Xem tổng quan và quản lý hệ thống</p> </div> <div className="flex gap-3 mt-4 md:mt-0"> <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateRestaurant}>
Thêm quán ăn mới </Button> 

{/* Thêm nút hiển thị yêu cầu Owner */}
<Button 
  className="bg-blue-600 hover:bg-blue-700"
  onClick={() => setIsOwnerRequestsOpen(true)}
>
  <UserPlus className="mr-2 h-4 w-4" />
  Yêu cầu Owner
</Button>

{/* Dialog cập nhật nhà hàng */}
<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">🛠️ Sửa nhà hàng</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Sửa nhà hàng</DialogTitle>
      <DialogDescription>Nhập ID của nhà hàng bạn muốn chỉnh sửa.</DialogDescription>
    </DialogHeader>
    <div className="py-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="restaurant-id-edit">ID nhà hàng</Label>
        <Input
          id="restaurant-id-edit"
          placeholder="Nhập ID nhà hàng"
          value={restaurantIdToUpdate}
          onChange={(e) => setRestaurantIdToUpdate(e.target.value)}
        />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline">Hủy</Button>
      <Button
        onClick={() => {
          localStorage.setItem("restaurant_id_to_update", restaurantIdToUpdate);
          router.push("/admin/update_restaurant");
        }}
      >
        Tiếp tục
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


<Dialog open={isOwnerRequestsOpen} onOpenChange={setIsOwnerRequestsOpen}>
  <DialogContent className="sm:max-w-4xl">
    <DialogHeader>
      <DialogTitle>Danh sách yêu cầu trở thành Owner</DialogTitle>
      <DialogDescription>
        Xem và phê duyệt các yêu cầu trở thành owner của người dùng
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {requestActionStatus.message && (
        <div className={`p-2 mb-4 rounded ${requestActionStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {requestActionStatus.message}
        </div>
      )}
      
      {ownerRequests.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Lời nhắn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ownerRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.user_id}</TableCell>
                <TableCell>{request.message}</TableCell>
                <TableCell>
                  <Badge variant={request.status === "pending" ? "outline" : "default"}>
                    {request.status === "pending" ? "Đang chờ" : request.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(request.created_at)}</TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <Button 
                      onClick={() => handleApproveOwnerRequest(request.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Chấp thuận
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center py-4">Không có yêu cầu nào</p>
      )}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOwnerRequestsOpen(false)}>Đóng</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<Button 
  variant="destructive"
  onClick={() => setIsDeleteDialogOpen(true)}
>
  <Trash2 className="mr-2 h-4 w-4" />
  Xóa nhà hàng
</Button>

<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}> <DialogContent className="sm:max-w-md"> <DialogHeader> <DialogTitle>Xóa nhà hàng</DialogTitle> <DialogDescription>
Nhập ID của nhà hàng mà bạn muốn xóa. Hành động này không thể hoàn tác. </DialogDescription> </DialogHeader> <div className="py-4"> <div className="space-y-4"> <div className="space-y-2"> <Label htmlFor="restaurant-id">ID nhà hàng</Label>
<Input
id="restaurant-id"
placeholder="Nhập ID nhà hàng"
value={restaurantIdToDelete}
onChange={(e) => setRestaurantIdToDelete(e.target.value)}
/> </div>
{deleteStatus.message && (
<div className={`p-2 rounded ${deleteStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
{deleteStatus.message} </div>
)} </div> </div> <DialogFooter>
<Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Hủy</Button> <Button variant="destructive" onClick={handleDeleteRestaurant}>Xóa nhà hàng</Button> </DialogFooter> </DialogContent> </Dialog> </div> </div>

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
          <h3 className="text-2xl font-bold">{totalFeedbacks}</h3> {/* Sử dụng dữ liệu từ API thay vì giá trị cứng */}
        </div>
      </CardContent>
    </Card>
  </div>
  
  {/* Thêm card hiển thị yêu cầu owner gần đây */}
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Yêu cầu Owner gần đây</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500 mb-4">
        Xem và quản lý các yêu cầu trở thành owner của người dùng
      </p>
      <Button 
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => setIsOwnerRequestsOpen(true)}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Xem danh sách yêu cầu
      </Button>
    </CardContent>
  </Card>
</div>
)
}