"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Calendar,
  BookOpen,
  Clock,
  FileText,
  Award,
  Bell,
  DollarSign,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Home,
  BookMarked,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Navigation items for each role
const studentNavItems = [
  { title: "Dashboard", href: "/dashboard/student", icon: Home },
  { title: "Time Table", href: "/dashboard/student/timetable", icon: Clock },
  { title: "Library", href: "/dashboard/student/library", icon: BookOpen },
  { title: "Attendance", href: "/dashboard/student/attendance", icon: Users },
  { title: "Assignments", href: "/dashboard/student/assignments", icon: FileText },
  { title: "Grades", href: "/dashboard/student/grades", icon: Award },
  { title: "Notices", href: "/dashboard/student/notices", icon: Bell },
  { title: "Calendar", href: "/dashboard/student/calendar", icon: Calendar },
  { title: "Fee Portal", href: "/dashboard/student/fees", icon: DollarSign },
]

const facultyNavItems = [
  { title: "Dashboard", href: "/dashboard/faculty", icon: Home },
  { title: "Calendar", href: "/dashboard/faculty/calendar", icon: Calendar },
  { title: "Assignments", href: "/dashboard/faculty/assignments", icon: FileText },
  { title: "Tests", href: "/dashboard/faculty/tests", icon: Award },
  { title: "Time Table", href: "/dashboard/faculty/timetable", icon: Clock },
  { title: "Create Assignment", href: "/dashboard/faculty/create-assignment", icon: BookMarked },
]

const adminNavItems = [
  { title: "Dashboard", href: "/dashboard/admin", icon: Home },
  { title: "Exam Rooms", href: "/dashboard/admin/exam-rooms", icon: BookOpen },
  { title: "Time Table", href: "/dashboard/admin/timetable", icon: Clock },
  { title: "User Management", href: "/dashboard/admin/users", icon: Users },
  { title: "Calendar", href: "/dashboard/admin/calendar", icon: Calendar },
  { title: "Events", href: "/dashboard/admin/events", icon: Bell },
  { title: "Feedback", href: "/dashboard/admin/feedback", icon: FileText },
  { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
]

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [navItems, setNavItems] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user")
    if (!userStr) {
      router.push("/")
      return
    }

    const userData = JSON.parse(userStr)
    setUser(userData)

    // Set navigation items based on role
    switch (userData.role) {
      case "student":
        setNavItems(studentNavItems)
        break
      case "faculty":
        setNavItems(facultyNavItems)
        break
      case "admin":
        setNavItems(adminNavItems)
        break
      default:
        setNavItems([])
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center px-4 sticky top-0 z-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Campus Portal</div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="text-xl font-bold ml-2 md:ml-0">Campus Portal</div>
          </div>

          <div className="flex items-center gap-4">
            {user.department && (
              <div className="hidden md:block text-sm">
                <span className="text-muted-foreground">Department:</span> {user.department}
                {user.semester && (
                  <span className="ml-2">
                    <span className="text-muted-foreground">Semester:</span> {user.semester}
                  </span>
                )}
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.username}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                    {user.department && <span className="text-xs text-muted-foreground">{user.department}</span>}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${user.role}/profile`}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${user.role}/settings`}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                      pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

