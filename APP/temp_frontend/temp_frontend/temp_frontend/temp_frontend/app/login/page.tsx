  // "use client"

  // import { useState } from "react"
  // import Link from "next/link"
  // import { Eye, EyeOff } from "lucide-react"
  // import { Button } from "@/components/ui/button"
  // import { Input } from "@/components/ui/input"
  // import { Label } from "@/components/ui/label"
  // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  // import { useRouter } from "next/navigation"
  // import { loginUser } from "@/lib/auth"

  // export default function LoginPage() {
  //   const [showPassword, setShowPassword] = useState(false)
  //   const [email, setEmail] = useState("")
  //   const [password, setPassword] = useState("")
  //   const [error, setError] = useState("")
  //   const router = useRouter()
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault()
  //     setError("")
  //     try {
  //       await loginUser(email, password)
  //       router.push("/dashboard") // Chuyển đến trang dashboard hoặc trang chính
  //     } catch (err: any) {
  //       setError("Email hoặc mật khẩu không đúng")
  //     }
  //   }

  //   return (
  //     <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] py-12">
  //       <Card className="w-full max-w-md">
  //         <CardHeader className="space-y-1">
  //           <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
  //           <CardDescription className="text-center">Nhập thông tin đăng nhập của bạn để tiếp tục</CardDescription>
  //         </CardHeader>
  //         <CardContent className="space-y-4">
  //           <div className="space-y-2">
  //             <Label htmlFor="email">Email</Label>
  //             <Input id="email" type="email" placeholder="example@example.com" value={email}
  //               onChange={(e) => setEmail(e.target.value)} />
  //           </div>
  //           <div className="space-y-2">
  //             <div className="flex items-center justify-between">
  //               <Label htmlFor="password">Mật khẩu</Label>
  //               <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
  //                 Quên mật khẩu?
  //               </Link>
  //             </div>
  //             <div className="relative">
  //               <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
  //               <Button
  //                 type="button"
  //                 variant="ghost"
  //                 size="icon"
  //                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
  //                 onClick={() => setShowPassword(!showPassword)}
  //               >
  //                 {showPassword ? (
  //                   <EyeOff className="h-4 w-4 text-gray-500" />
  //                 ) : (
  //                   <Eye className="h-4 w-4 text-gray-500" />
  //                 )}
  //                 <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
  //               </Button>
  //             </div>
  //           </div>
  //         </CardContent>
  //         <CardFooter className="flex flex-col">
  //           <Button className="w-full bg-green-600 hover:bg-green-700">Đăng nhập</Button>
  //           <div className="mt-4 text-center text-sm">
  //             Chưa có tài khoản?{" "}
  //             <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
  //               Đăng ký
  //             </Link>
  //           </div>
  //         </CardFooter>
  //       </Card>
  //     </div>
  //   )
  // }

"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/auth"
import { useAuth } from "@/lib/context/AuthContext" // ✅ Thêm dòng này

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const { login } = useAuth() // ✅ Gọi hàm login từ context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const result = await loginUser(email, password)

      // ✅ Cập nhật AuthContext ngay sau đăng nhập
      login(result.user, result.token)

      // 👉 Lưu token (tùy chọn nếu muốn dùng cho fetch khác)
      localStorage.setItem("token", result.token)

      // ✅ Điều hướng theo vai trò người dùng
      const userRole = result.user?.role || "user"

      if (userRole === "admin") {
        router.push("/admin/dashboard")
      } else if (userRole === "owner") {
        router.push("/owner/dashboard")
      } else {
        router.push("/user/dashboard")
      }
    } catch (err: any) {
      setError("Email hoặc mật khẩu không đúng")
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">
            Nhập thông tin đăng nhập của bạn để tiếp tục
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  </span>
                </Button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Đăng nhập
            </Button>
            <div className="mt-4 text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
                Đăng ký
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

