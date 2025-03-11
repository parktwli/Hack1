import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { Calendar, FileText, Award, Clock, Users } from "lucide-react"

export default function FacultyDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your teaching activities.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4 Classes</div>
              <p className="text-xs text-muted-foreground">Next: Physics at 11:30 AM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">To be graded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">In the next 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">Across 5 courses</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Physics 101</p>
                    <p className="text-xs text-muted-foreground">11:30 AM - 1:00 PM • Room 302</p>
                  </div>
                  <div className="text-xs text-muted-foreground">32 students</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Advanced Physics Lab</p>
                    <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM • Lab 201</p>
                  </div>
                  <div className="text-xs text-muted-foreground">18 students</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Physics for Engineers</p>
                    <p className="text-xs text-muted-foreground">4:30 PM - 6:00 PM • Room 405</p>
                  </div>
                  <div className="text-xs text-muted-foreground">45 students</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Assignments to Grade</CardTitle>
              <CardDescription>Recently submitted assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Physics Lab Report</p>
                    <p className="text-xs text-muted-foreground">Physics 101 • 28 submissions</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Due yesterday</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Quantum Mechanics Essay</p>
                    <p className="text-xs text-muted-foreground">Advanced Physics • 15 submissions</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Due 3 days ago</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Thermodynamics Problem Set</p>
                    <p className="text-xs text-muted-foreground">Physics for Engineers • 42 submissions</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Due today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>College events in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Faculty Meeting</p>
                  <p className="text-sm text-muted-foreground">
                    Discussion on the upcoming semester curriculum and teaching methodologies.
                  </p>
                  <p className="text-xs text-muted-foreground">October 10, 2023 • 2:00 PM • Conference Room</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Science Exhibition</p>
                  <p className="text-sm text-muted-foreground">
                    Annual science exhibition showcasing student projects. Faculty members are required to supervise.
                  </p>
                  <p className="text-xs text-muted-foreground">October 20-22, 2023 • Main Hall</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

