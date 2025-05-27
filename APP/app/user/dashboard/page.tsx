"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserDashboard() {
  const [message, setMessage] = useState("")
  const [alert, setAlert] = useState({ message: "", type: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setAlert({
        message: "Bạn cần đăng nhập để sử dụng chức năng này",
        type: "error",
      })
      setTimeout(() => router.push("/login"), 2000)
    }
  }, [router])

  const handleRequestOwner = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setAlert({ message: "Bạn chưa đăng nhập", type: "error" })
      return
    }

    if (!message.trim()) {
      setAlert({ message: "Vui lòng nhập nội dung yêu cầu", type: "error" })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/api/owner/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()

      if (res.ok) {
        setAlert({ message: "Yêu cầu đã gửi thành công!", type: "success" })
        setMessage("")
      } else {
        setAlert({ message: data.detail || "Gửi yêu cầu thất bại", type: "error" })
      }
    } catch (error) {
      console.error(error)
      setAlert({ message: "Không thể kết nối đến máy chủ", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Yêu cầu trở thành chủ quán (Owner)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alert.message && (
            <Alert
              className={`${
                alert.type === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              <AlertTitle>{alert.type === "success" ? "Thành công" : "Lỗi"}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Lý do bạn muốn trở thành Owner</Label>
            <Textarea
              id="message"
              placeholder="Nhập lời nhắn tới quản trị viên..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleRequestOwner} disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi yêu cầu"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
