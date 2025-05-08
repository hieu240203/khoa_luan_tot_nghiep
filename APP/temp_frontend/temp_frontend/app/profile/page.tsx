// "use client"

// import { useState } from "react"
// import { User, Mail, Phone, MapPin, Edit, Heart, Star, LogOut } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false)

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <div className="w-full md:w-64 space-y-4">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex flex-col items-center">
//                   <Avatar className="h-24 w-24 mb-4">
//                     <AvatarImage src="/placeholder.svg?height=96&width=96&text=NVA" alt="Nguyễn Văn A" />
//                     <AvatarFallback>NVA</AvatarFallback>
//                   </Avatar>
//                   <h2 className="text-xl font-bold">Nguyễn Văn A</h2>
//                   <p className="text-gray-500 text-sm">Thành viên từ 10/2023</p>
//                   <div className="flex items-center mt-2">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="ml-1 text-sm">12 đánh giá</span>
//                   </div>
//                   <Button variant="outline" className="mt-4 w-full">
//                     <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa hồ sơ
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6 space-y-4">
//                 <div className="flex items-start">
//                   <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Họ và tên</p>
//                     <p className="text-sm text-gray-500">Nguyễn Văn A</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Email</p>
//                     <p className="text-sm text-gray-500">nguyenvana@example.com</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Số điện thoại</p>
//                     <p className="text-sm text-gray-500">0912 345 678</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Địa chỉ</p>
//                     <p className="text-sm text-gray-500">123 Đường ABC, Quận 1, TP.HCM</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
//               <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
//             </Button>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             <Tabs defaultValue="favorites" className="w-full">
//               <TabsList className="w-full grid grid-cols-2 mb-6">
//                 <TabsTrigger
//                   value="favorites"
//                   className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
//                 >
//                   <Heart className="h-4 w-4 mr-2" /> Yêu thích
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="reviews"
//                   className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
//                 >
//                   <Star className="h-4 w-4 mr-2" /> Đánh giá
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="favorites" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Quán ăn yêu thích</CardTitle>
//                     <CardDescription>Danh sách quán ăn bạn đã lưu</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {favorites.map((restaurant, index) => (
//                         <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
//                           <img
//                             src={restaurant.image || "/placeholder.svg"}
//                             alt={restaurant.name}
//                             className="w-20 h-20 rounded-md object-cover"
//                           />
//                           <div className="flex-1">
//                             <div className="flex items-start justify-between">
//                               <div>
//                                 <h3 className="font-medium">{restaurant.name}</h3>
//                                 <div className="flex items-center text-gray-500 text-sm mt-1">
//                                   <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
//                                 </div>
//                                 <div className="flex items-center mt-1">
//                                   <span className="text-sm">{restaurant.rating}/10</span>
//                                 </div>
//                               </div>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="text-red-500 hover:text-red-600 hover:bg-red-50"
//                               >
//                                 <Heart className="h-4 w-4 fill-current" />
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="reviews" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Đánh giá của bạn</CardTitle>
//                     <CardDescription>Các đánh giá bạn đã viết</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-6">
//                       {reviews.map((review) => (
//                         <div key={review.id} className="border rounded-lg p-4">
//                           <div className="flex items-start gap-3">
//                             <img
//                               src={review.restaurantImage || "/placeholder.svg"}
//                               alt={review.restaurantName}
//                               className="w-16 h-16 rounded-md object-cover"
//                             />
//                             <div className="flex-1">
//                               <div className="flex items-center justify-between">
//                                 <h3 className="font-medium">{review.restaurantName}</h3>
//                                 <span className="text-sm text-gray-500">{review.date}</span>
//                               </div>
//                               <div className="flex items-center mt-1">
//                                 <span className="font-medium">{review.rating}/10</span>
//                               </div>
//                               <p className="mt-2 text-gray-700">{review.comment}</p>
//                               {review.images.length > 0 && (
//                                 <div className="flex gap-2 mt-3">
//                                   {review.images.map((image, index) => (
//                                     <img
//                                       key={index}
//                                       src={image || "/placeholder.svg"}
//                                       alt={`Review image ${index + 1}`}
//                                       className="w-16 h-16 rounded-md object-cover"
//                                     />
//                                   ))}
//                                 </div>
//                               )}
//                               <div className="flex gap-2 mt-3">
//                                 <Button variant="outline" size="sm">
//                                   <Edit className="h-3 w-3 mr-1" /> Chỉnh sửa
//                                 </Button>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                                 >
//                                   Xóa
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const favorites = [
//   {
//     id: 1,
//     name: "Nhà Hàng Xanh",
//     image: "/placeholder.svg?height=100&width=100&text=Nhà+Hàng+Xanh",
//     rating: 9.6,
//     location: "Quận 1, TP.HCM",
//   },
//   {
//     id: 2,
//     name: "Sushi Toro",
//     image: "/placeholder.svg?height=100&width=100&text=Sushi+Toro",
//     rating: 9.2,
//     location: "Quận 3, TP.HCM",
//   },
//   {
//     id: 3,
//     name: "Phở Ngon",
//     image: "/placeholder.svg?height=100&width=100&text=Phở+Ngon",
//     rating: 9.0,
//     location: "Quận 2, TP.HCM",
//   },
// ]

// const reviews = [
//   {
//     id: 1,
//     restaurantName: "Nhà Hàng Xanh",
//     restaurantImage: "/placeholder.svg?height=100&width=100&text=Nhà+Hàng+Xanh",
//     rating: 10,
//     date: "15/03/2023",
//     comment: "Đồ ăn ngon, không gian thoáng mát, nhân viên phục vụ nhiệt tình. Sẽ quay lại lần sau!",
//     images: ["/placeholder.svg?height=100&width=100&text=Review+1"],
//   },
//   {
//     id: 2,
//     restaurantName: "Sushi Toro",
//     restaurantImage: "/placeholder.svg?height=100&width=100&text=Sushi+Toro",
//     rating: 8,
//     date: "02/04/2023",
//     comment: "Món ăn ngon, giá cả hợp lý. Tuy nhiên, thời gian phục vụ hơi lâu vào giờ cao điểm.",
//     images: [],
//   },
// ]

"use client"

import { useEffect, useState } from "react"
import { User, Mail, Phone, MapPin, Edit, Heart, Star, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/AuthContext"

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<any>(null)
  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.ok) {
          const data = await res.json()
          setUserInfo(data)
        } else {
          logout()
          router.push("/login")
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err)
        logout()
        router.push("/login")
      }
    }

    fetchUserInfo()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96&text=AVT" alt="Avatar" />
                    <AvatarFallback>
                      {userInfo?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userInfo?.full_name || userInfo?.username}</h2>
                  <p className="text-gray-500 text-sm">Vai trò: {userInfo?.role}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">12 đánh giá</span>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa hồ sơ
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Tên người dùng</p>
                    <p className="text-sm text-gray-500">{userInfo?.username}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-500">{userInfo?.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Nghề nghiệp</p>
                    <p className="text-sm text-gray-500">{userInfo?.occupation || "Chưa cập nhật"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Tuổi</p>
                    <p className="text-sm text-gray-500">{userInfo?.age || "Chưa cập nhật"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                logout()
                router.push("/login")
              }}
            >
              <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
            </Button>
          </div>

          {/* Main Tabs */}
          <div className="flex-1">
            <Tabs defaultValue="favorites" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="favorites" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  <Heart className="h-4 w-4 mr-2" /> Yêu thích
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  <Star className="h-4 w-4 mr-2" /> Đánh giá
                </TabsTrigger>
              </TabsList>

              <TabsContent value="favorites">
                {/* ... giữ nguyên phần quán ăn yêu thích */}
              </TabsContent>

              <TabsContent value="reviews">
                {/* ... giữ nguyên phần đánh giá */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
