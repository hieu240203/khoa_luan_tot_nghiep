"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/context/AuthContext"
import ClientOnly from "@/components/client-only"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </ClientOnly>
  )
}
