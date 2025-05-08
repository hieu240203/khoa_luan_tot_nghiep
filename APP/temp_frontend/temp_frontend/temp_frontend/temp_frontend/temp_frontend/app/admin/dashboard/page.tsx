import { BarChart, Users, Store, Star, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
          <p className="text-gray-500">Xem tổng quan và quản lý hệ thống</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline">Xuất báo cáo</Button>
          <Button className="bg-green-600 hover:bg-green-700">Thêm quán ăn mới</Button>
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
              <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Tổng số quán ăn</p>
              <h3 className="text-2xl font-bold">1,248</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 8%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Người dùng mới</p>
              <h3 className="text-2xl font-bold">3,427</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 5%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Đánh giá mới</p>
              <h3 className="text-2xl font-bold">8,642</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-red-600" />
              </div>
              <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
                <ArrowDownRight className="h-3 w-3 mr-1" /> 3%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Lượt truy cập</p>
              <h3 className="text-2xl font-bold">24,389</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restaurant Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quản lý quán ăn</CardTitle>
          <CardDescription>Danh sách quán ăn và trạng thái hoạt động</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên quán</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Chủ quán</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell className="font-medium">{restaurant.name}</TableCell>
                  <TableCell>{restaurant.address}</TableCell>
                  <TableCell>{restaurant.owner}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        restaurant.status === "Đang hoạt động"
                          ? "bg-green-100 text-green-600 hover:bg-green-100"
                          : restaurant.status === "Chờ duyệt"
                            ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
                            : "bg-red-100 text-red-600 hover:bg-red-100"
                      }
                    >
                      {restaurant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{restaurant.rating}/10</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Vô hiệu hóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
          <CardDescription>Các hoạt động mới nhất trên hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "new_restaurant"
                      ? "bg-green-100"
                      : activity.type === "new_review"
                        ? "bg-orange-100"
                        : activity.type === "new_user"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                  }`}
                >
                  {activity.type === "new_restaurant" && <Store className="h-5 w-5 text-green-600" />}
                  {activity.type === "new_review" && <Star className="h-5 w-5 text-orange-600" />}
                  {activity.type === "new_user" && <Users className="h-5 w-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.title}</p>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const restaurants = [
  {
    id: 1,
    name: "Nhà Hàng Xanh",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    owner: "Nguyễn Văn A",
    status: "Đang hoạt động",
    rating: 9.6,
  },
  {
    id: 2,
    name: "Sushi Toro",
    address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    owner: "Trần Thị B",
    status: "Đang hoạt động",
    rating: 9.2,
  },
  {
    id: 3,
    name: "Phở Ngon",
    address: "789 Đường Võ Văn Tần, Quận 2, TP.HCM",
    owner: "Lê Văn C",
    status: "Chờ duyệt",
    rating: 0,
  },
  {
    id: 4,
    name: "Quán Cà Phê Sân Vườn",
    address: "101 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
    owner: "Phạm Thị D",
    status: "Bị khóa",
    rating: 6.4,
  },
  {
    id: 5,
    name: "Bánh Mì Thịt Nguội",
    address: "202 Đường Lý Tự Trọng, Quận 1, TP.HCM",
    owner: "Hoàng Văn E",
    status: "Đang hoạt động",
    rating: 8.6,
  },
]

const activities = [
  {
    type: "new_restaurant",
    title: "Quán ăn mới đăng ký",
    description: "Quán 'Bánh Xèo Miền Tây' vừa đăng ký và đang chờ duyệt",
    time: "5 phút trước",
  },
  {
    type: "new_review",
    title: "Đánh giá mới",
    description: "Người dùng 'Nguyễn Văn A' vừa đánh giá 'Nhà Hàng Xanh'",
    time: "15 phút trước",
  },
  {
    type: "new_user",
    title: "Người dùng mới đăng ký",
    description: "Người dùng 'Trần Thị B' vừa tạo tài khoản",
    time: "30 phút trước",
  },
  {
    type: "new_restaurant",
    title: "Quán ăn được duyệt",
    description: "Quán 'Sushi Toro' đã được duyệt và đang hoạt động",
    time: "1 giờ trước",
  },
]

