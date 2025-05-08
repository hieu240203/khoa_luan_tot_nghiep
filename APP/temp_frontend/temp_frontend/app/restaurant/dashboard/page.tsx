import { BarChart, Users, Star, Edit, MessageSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function RestaurantDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý quán ăn</h1>
          <p className="text-gray-500">Nhà Hàng Xanh</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline">Xem trang quán</Button>
          <Button className="bg-green-600 hover:bg-green-700">Cập nhật thông tin</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Lượt xem</p>
              <h3 className="text-2xl font-bold">1,248</h3>
              <p className="text-sm text-green-600 mt-1">+12% so với tuần trước</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Đánh giá</p>
              <h3 className="text-2xl font-bold">9.6</h3>
              <p className="text-sm text-green-600 mt-1">+0.4 so với tháng trước</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Bình luận mới</p>
              <h3 className="text-2xl font-bold">28</h3>
              <p className="text-sm text-green-600 mt-1">+8 so với tuần trước</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Lượt yêu thích</p>
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-sm text-green-600 mt-1">+24 so với tháng trước</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent px-4 py-2"
          >
            Đánh giá
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent px-4 py-2"
          >
            Thực đơn
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent px-4 py-2"
          >
            Thông tin quán
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent px-4 py-2"
          >
            Cài đặt
          </TabsTrigger>
        </TabsList>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý đánh giá</CardTitle>
              <CardDescription>Xem và phản hồi đánh giá từ khách hàng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{review.user}</h3>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="font-medium">{review.rating}/10</span>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                        {review.images.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Review image ${index + 1}`}
                                className="w-20 h-20 rounded-md object-cover"
                              />
                            ))}
                          </div>
                        )}
                        {review.reply ? (
                          <div className="mt-3 bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center">
                              <span className="font-medium">Phản hồi của bạn</span>
                              <span className="text-sm text-gray-500 ml-2">{review.replyDate}</span>
                            </div>
                            <p className="mt-1 text-gray-700">{review.reply}</p>
                          </div>
                        ) : (
                          <div className="mt-3">
                            <Button variant="outline" size="sm">
                              Phản hồi
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menu Tab */}
        <TabsContent value="menu" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Quản lý thực đơn</CardTitle>
                <CardDescription>Thêm, sửa, xóa các món ăn trong thực đơn</CardDescription>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" /> Thêm món mới
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Món ăn</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === "Có sẵn"
                              ? "bg-green-100 text-green-600 hover:bg-green-100"
                              : "bg-red-100 text-red-600 hover:bg-red-100"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Info Tab */}
        <TabsContent value="info" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin quán ăn</CardTitle>
              <CardDescription>Cập nhật thông tin cơ bản về quán ăn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Thông tin cơ bản</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Tên quán</label>
                      <div className="flex items-center justify-between mt-1">
                        <span>Nhà Hàng Xanh</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Địa chỉ</label>
                      <div className="flex items-center justify-between mt-1">
                        <span>123 Đường Lê Lợi, Quận 1, TP.HCM</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Số điện thoại</label>
                      <div className="flex items-center justify-between mt-1">
                        <span>028 1234 5678</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Website</label>
                      <div className="flex items-center justify-between mt-1">
                        <span>www.nhahangxanh.com</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Giờ mở cửa</label>
                      <div className="flex items-center justify-between mt-1">
                        <span>08:00 - 22:00</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Hình ảnh quán</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative group">
                      <img
                        src="/placeholder.svg?height=200&width=200&text=Nhà+Hàng+Xanh+1"
                        alt="Restaurant image 1"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
                        <Button variant="ghost" size="icon" className="text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative group">
                      <img
                        src="/placeholder.svg?height=200&width=200&text=Nhà+Hàng+Xanh+2"
                        alt="Restaurant image 2"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
                        <Button variant="ghost" size="icon" className="text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative group">
                      <img
                        src="/placeholder.svg?height=200&width=200&text=Nhà+Hàng+Xanh+3"
                        alt="Restaurant image 3"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
                        <Button variant="ghost" size="icon" className="text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center h-32">
                      <Button variant="ghost" className="text-gray-500">
                        <Plus className="h-5 w-5 mr-2" /> Thêm ảnh
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const reviews = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=50&width=50&text=NVA",
    rating: 10,
    date: "15/03/2023",
    comment: "Đồ ăn ngon, không gian thoáng mát, nhân viên phục vụ nhiệt tình. Sẽ quay lại lần sau!",
    images: ["/placeholder.svg?height=200&width=200&text=Review+1"],
    reply:
      "Cảm ơn bạn đã đánh giá tích cực về nhà hàng. Chúng tôi rất vui khi bạn hài lòng và mong được phục vụ bạn trong thời gian tới!",
    replyDate: "16/03/2023",
  },
  {
    id: 2,
    user: "Trần Thị B",
    avatar: "/placeholder.svg?height=50&width=50&text=TTB",
    rating: 8,
    date: "02/04/2023",
    comment: "Món ăn ngon, giá cả hợp lý. Tuy nhiên, thời gian phục vụ hơi lâu vào giờ cao điểm.",
    images: [],
    reply: null,
    replyDate: null,
  },
  {
    id: 3,
    user: "Lê Văn C",
    avatar: "/placeholder.svg?height=50&width=50&text=LVC",
    rating: 6,
    date: "10/04/2023",
    comment: "Món ăn khá ngon nhưng giá hơi cao so với mặt bằng chung. Không gian đẹp, nhân viên thân thiện.",
    images: [
      "/placeholder.svg?height=200&width=200&text=Review+2",
      "/placeholder.svg?height=200&width=200&text=Review+3",
    ],
    reply:
      "Cảm ơn bạn đã góp ý. Chúng tôi sẽ xem xét lại giá cả để phù hợp hơn với khách hàng. Mong được đón tiếp bạn lần sau!",
    replyDate: "11/04/2023",
  },
]

const menuItems = [
  {
    id: 1,
    name: "Gỏi cuốn tôm thịt",
    category: "Khai vị",
    price: "85.000đ",
    status: "Có sẵn",
    image: "/placeholder.svg?height=100&width=100&text=Gỏi+cuốn",
  },
  {
    id: 2,
    name: "Chả giò hải sản",
    category: "Khai vị",
    price: "95.000đ",
    status: "Có sẵn",
    image: "/placeholder.svg?height=100&width=100&text=Chả+giò",
  },
  {
    id: 3,
    name: "Cơm chiên hải sản",
    category: "Món chính",
    price: "150.000đ",
    status: "Có sẵn",
    image: "/placeholder.svg?height=100&width=100&text=Cơm+chiên",
  },
  {
    id: 4,
    name: "Bún chả Hà Nội",
    category: "Món chính",
    price: "120.000đ",
    status: "Hết hàng",
    image: "/placeholder.svg?height=100&width=100&text=Bún+chả",
  },
  {
    id: 5,
    name: "Chè hạt sen",
    category: "Tráng miệng",
    price: "45.000đ",
    status: "Có sẵn",
    image: "/placeholder.svg?height=100&width=100&text=Chè",
  },
]

