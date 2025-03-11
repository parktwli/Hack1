import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { Users, Calendar, Settings, FileText, BookOpen, Bell } from "lucide-react"

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of the campus system.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-muted-foreground">Current semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Operational</div>
              <p className="text-xs text-muted-foreground">All systems normal</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Recent user activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New Faculty Accounts</p>
                    <p className="text-xs text-muted-foreground">5 accounts created this week</p>
                  </div>
                  <div className="text-xs text-muted-foreground">View all</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Password Reset Requests</p>
                    <p className="text-xs text-muted-foreground">12 pending requests</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Process</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Student Registrations</p>
                    <p className="text-xs text-muted-foreground">28 new registrations</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Review</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Exam Room Allocation</CardTitle>
              <CardDescription>Upcoming exam schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mid-term Examinations</p>
                    <p className="text-xs text-muted-foreground">October 15-25, 2023</p>
                  </div>
                  <div className="text-xs text-muted-foreground">15 rooms allocated</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Physics Department Test</p>
                    <p className="text-xs text-muted-foreground">October 12, 2023</p>
                  </div>
                  <div className="text-xs text-muted-foreground">5 rooms allocated</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Engineering Finals</p>
                    <p className="text-xs text-muted-foreground">December 5-15, 2023</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Pending allocation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Important system updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Scheduled Maintenance</p>
                  <p className="text-sm text-muted-foreground">
                    The system will be undergoing maintenance on Sunday, October 8th from 2:00 AM to 5:00 AM. Some
                    services may be unavailable during this time.
                  </p>
                  <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Timetable Generation Complete</p>
                  <p className="text-sm text-muted-foreground">
                    The timetable for the upcoming semester has been generated. Please review and approve before
                    publishing to faculty and students.
                  </p>
                  <p className="text-xs text-muted-foreground">Posted 1 week ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Feedback Summary</p>
                  <p className="text-sm text-muted-foreground">
                    The latest student feedback survey has been compiled. Overall satisfaction rate is 87%, up 3% from
                    last semester.
                  </p>
                  <p className="text-xs text-muted-foreground">Posted 2 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

