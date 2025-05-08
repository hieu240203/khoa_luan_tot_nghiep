// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Khám Phá Quán Ăn",
//   description: "Hệ thống quản lý và khám phá quán ăn",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="vi">
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             <main className="flex-1">{children}</main>
//             <Footer />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Khám Phá Quán Ăn",
  description: "Hệ thống quản lý và khám phá quán ăn",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
