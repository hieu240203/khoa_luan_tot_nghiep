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
                  {/* <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm"></span>
                  </div> */}
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
