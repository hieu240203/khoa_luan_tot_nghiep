// File: app/user/dashboard/page.tsx
"use client"

import { Star, Store } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Chào mừng bạn quay lại!</h1>
        <p className="text-gray-500">Dưới đây là hoạt động gần đây của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Đánh giá bạn đã viết</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Store className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Quán ăn bạn đã ghé thăm</p>
              <h3 className="text-2xl font-bold">7</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
