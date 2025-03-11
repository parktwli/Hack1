"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Form validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

// Mock user data - in a real app, this would come from a database
const users = [
  { username: "student", password: "password", role: "student", department: "Computer Engineering", semester: 1 },
  {
    username: "faculty",
    password: "password",
    role: "faculty",
    department: "Computer Engineering",
    subjects: ["A", "B"],
  },
  { username: "admin", password: "password", role: "admin" },
]

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    // Reset error state
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user
      const user = users.find((u) => u.username === data.username && u.password === data.password)

      if (!user) {
        setError("Invalid username or password")
        return
      }

      // Store user info in localStorage (in a real app, use a more secure method)
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user.username,
          role: user.role,
          department: user.department || null,
          semester: user.semester || null,
          subjects: user.subjects || null,
        }),
      )

      // Redirect based on role
      switch (user.role) {
        case "student":
          router.push("/dashboard/student")
          break
        case "faculty":
          router.push("/dashboard/faculty")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
        default:
          router.push("/")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" {...register("username")} />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

