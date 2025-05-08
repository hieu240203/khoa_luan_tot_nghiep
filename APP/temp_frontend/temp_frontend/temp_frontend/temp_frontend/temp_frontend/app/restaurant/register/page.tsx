"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Phone, Globe, Upload, Plus } from "lucide-react"

export default function RegisterRestaurantPage() {
  const [activeTab, setActiveTab] = useState("basic")

  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("menu")
    else if (activeTab === "menu") setActiveTab("photos")
  }

  const prevTab = () => {
    if (activeTab === "photos") setActiveTab("menu")
    else if (activeTab === "menu") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("basic")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Đăng ký quán ăn</h1>
          <p className="text-gray-500 mt-2">Điền thông tin quán ăn của bạn để bắt đầu</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="basic" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Thông tin cơ bản
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Chi tiết
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Thực đơn
            </TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Hình ảnh
            </TabsTrigger>
          </TabsList>

          <Card>
            <TabsContent value="basic" className="mt-0">
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>Nhập thông tin cơ bản về quán ăn của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên quán ăn</Label>
                  <Input id="name" placeholder="Nhập tên quán ăn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả ngắn về quán ăn của bạn" className="min-h-[100px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Loại hình</Label>
                    <Input id="category" placeholder="Ví dụ: Nhà hàng, Quán ăn, Cafe..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Ẩm thực</Label>
                    <Input id="cuisine" placeholder="Ví dụ: Việt Nam, Nhật Bản, Ý..." />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div></div>
                <Button onClick={nextTab} className="bg-green-600 hover:bg-green-700">
                  Tiếp theo
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              <CardHeader>
                <CardTitle>Chi tiết quán ăn</CardTitle>
                <CardDescription>Nhập thông tin chi tiết về địa chỉ và liên hệ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <Input id="address" placeholder="Địa chỉ đầy đủ của quán ăn" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <Input id="phone" placeholder="Số điện thoại liên hệ" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (nếu có)</Label>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-400 mr-2" />
                      <Input id="website" placeholder="Địa chỉ website" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Giờ mở cửa</Label>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <Input id="hours" placeholder="Ví dụ: 08:00 - 22:00" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Quay lại
                </Button>
                <Button onClick={nextTab} className="bg-green-600 hover:bg-green-700">
                  Tiếp theo
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="menu" className="mt-0">
              <CardHeader>
                <CardTitle>Thực đơn</CardTitle>
                <CardDescription>Thêm các món ăn vào thực đơn của quán</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Khai vị</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Thêm món
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Input placeholder="Tên món ăn" defaultValue="Gỏi cuốn tôm thịt" />
                        <Input placeholder="Giá" defaultValue="85.000đ" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Input placeholder="Tên món ăn" defaultValue="Chả giò hải sản" />
                        <Input placeholder="Giá" defaultValue="95.000đ" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Món chính</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Thêm món
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Input placeholder="Tên món ăn" defaultValue="Cơm chiên hải sản" />
                        <Input placeholder="Giá" defaultValue="150.000đ" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-dashed">
                  <Plus className="h-5 w-5 mr-2" /> Thêm danh mục món ăn
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Quay lại
                </Button>
                <Button onClick={nextTab} className="bg-green-600 hover:bg-green-700">
                  Tiếp theo
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="photos" className="mt-0">
              <CardHeader>
                <CardTitle>Hình ảnh</CardTitle>
                <CardDescription>Tải lên hình ảnh của quán ăn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Ảnh bìa</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center mb-2">Kéo thả ảnh vào đây hoặc nhấp để tải lên</p>
                    <p className="text-xs text-gray-400 text-center">PNG, JPG hoặc JPEG (tối đa 5MB)</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Chọn ảnh
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ảnh không gian quán</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400 text-center">Tải ảnh lên</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400 text-center">Tải ảnh lên</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400 text-center">Tải ảnh lên</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ảnh món ăn</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400 text-center">Tải ảnh lên</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400 text-center">Tải ảnh lên</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400 text-center">Tải ảnh lên</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Quay lại
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">Đăng ký quán ăn</Button>
              </CardFooter>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}

