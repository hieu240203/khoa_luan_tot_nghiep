// File: app/owner/dashboard/page.tsx
"use client"

import { Store, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function OwnerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển Chủ quán</h1>
          <p className="text-gray-500">Quản lý quán ăn của bạn</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Thêm quán ăn</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Store className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Số quán ăn đã đăng ký</p>
              <h3 className="text-2xl font-bold">3</h3>
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
              <p className="text-sm text-gray-500">Đánh giá trung bình</p>
              <h3 className="text-2xl font-bold">8.4</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}