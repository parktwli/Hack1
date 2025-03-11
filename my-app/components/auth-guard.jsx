"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user")

    if (!userStr) {
      // If not logged in and not already on login page, redirect to login
      if (pathname !== "/") {
        router.push("/")
      }
      setIsLoading(false)
      return
    }

    // Parse user data
    const user = JSON.parse(userStr)

    // Check if user is accessing the correct dashboard
    if (pathname.startsWith("/dashboard/")) {
      const role = pathname.split("/")[2]

      if (role !== user.role) {
        // Redirect to the correct dashboard
        router.push(`/dashboard/${user.role}`)
      }
    }

    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}

