// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Menu, User, Heart, LogIn } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { cn } from "@/lib/utils"
// import { useAuth } from "@/lib/context/AuthContext"


// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const pathname = usePathname()
//   const { isLoggedIn, logout } = useAuth()

//   const routes = [
//     {
//       href: "/",
//       label: "Trang chủ",
//       active: pathname === "/",
//     },
//     {
//       href: "/search",
//       label: "Tìm kiếm",
//       active: pathname === "/search",
//     },
//     {
//       href: "/discover",
//       label: "Khám phá",
//       active: pathname === "/discover",
//     },
//   ]

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         <Link href="/" className="mr-6 flex items-center space-x-2">
//           <span className="h-6 w-6 rounded-full bg-green-600"></span>
//           <span className="font-bold text-xl">FoodFinder</span>
//         </Link>
//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
//           {routes.map((route) => (
//             <Link
//               key={route.href}
//               href={route.href}
//               className={cn(
//                 "transition-colors hover:text-foreground/80",
//                 route.active ? "text-foreground font-semibold" : "text-foreground/60",
//               )}
//             >
//               {route.label}
//             </Link>
//           ))}
//         </nav>
//         <div className="flex items-center space-x-4 ml-auto">
//           {isLoggedIn ? (
//             <>
//               <Link
//                 href="/favorites"
//                 className="hidden md:flex items-center text-sm font-medium text-foreground/60 hover:text-foreground/80"
//               >
//                 <Heart className="h-4 w-4 mr-1" />
//                 Yêu thích
//               </Link>
//               <Link href="/profile">
//                 <Button variant="ghost" size="icon" className="rounded-full">
//                   <User className="h-5 w-5" />
//                   <span className="sr-only">Hồ sơ</span>
//                 </Button>
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="hidden md:flex">
//                 <Button variant="ghost" className="text-sm font-medium">
//                   Đăng nhập
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button className="bg-green-600 hover:bg-green-700">Đăng ký</Button>
//               </Link>
//             </>
//           )}
//           <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <div className="flex flex-col space-y-4 mt-8">
//                 {routes.map((route) => (
//                   <Link
//                     key={route.href}
//                     href={route.href}
//                     onClick={() => setIsMenuOpen(false)}
//                     className={cn(
//                       "text-foreground/60 hover:text-foreground/80 transition-colors text-lg",
//                       route.active ? "text-foreground font-semibold" : "",
//                     )}
//                   >
//                     {route.label}
//                   </Link>
//                 ))}
//                 <div className="h-px bg-border my-4" />
//                 {isLoggedIn ? (
//                   <>
//                     <Link
//                       href="/favorites"
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center text-foreground/60 hover:text-foreground/80"
//                     >
//                       <Heart className="h-4 w-4 mr-2" />
//                       Yêu thích
//                     </Link>
//                     <Link
//                       href="/profile"
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center text-foreground/60 hover:text-foreground/80"
//                     >
//                       <User className="h-4 w-4 mr-2" />
//                       Hồ sơ cá nhân
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       href="/login"
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center text-foreground/60 hover:text-foreground/80"
//                     >
//                       <LogIn className="h-4 w-4 mr-2" />
//                       Đăng nhập
//                     </Link>
//                     <Link href="/register" onClick={() => setIsMenuOpen(false)}>
//                       <Button className="w-full bg-green-600 hover:bg-green-700">Đăng ký</Button>
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, User, Heart, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/context/AuthContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const routes = [
    { href: "/", label: "Trang chủ", active: pathname === "/" },
    { href: "/search", label: "Tìm kiếm", active: pathname === "/search" },
    { href: "/discover", label: "Khám phá", active: pathname === "/discover" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full bg-green-600"></span>
          <span className="font-bold text-xl">FoodFinder</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                route.active ? "text-foreground font-semibold" : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4 ml-auto">
          {isLoggedIn ? (
            <>
              <Link
                href="/favorites"
                className="hidden md:flex items-center text-sm font-medium text-foreground/60 hover:text-foreground/80"
              >
                <Heart className="h-4 w-4 mr-1" />
                Yêu thích
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/profile")}>
                <User className="h-5 w-5" />
                <span className="sr-only">Hồ sơ</span>
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:flex">
                <Button variant="ghost" className="text-sm font-medium">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700">Đăng ký</Button>
              </Link>
            </>
          )}

          {/* Menu Mobile */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-foreground/60 hover:text-foreground/80 transition-colors text-lg",
                      route.active ? "text-foreground font-semibold" : ""
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-4" />
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/favorites"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center text-foreground/60 hover:text-foreground/80"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Yêu thích
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        router.push("/profile")
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center justify-start w-full"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Thông tin cá nhân
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center justify-start w-full text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center text-foreground/60 hover:text-foreground/80"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Đăng nhập
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Đăng ký</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
