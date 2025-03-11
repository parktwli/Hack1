import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { getTimetable, DAYS, HOURS_PER_DAY } from "@/utils/timetable-generator"

export default function StudentTimetable() {
  // In a real application, you'd fetch the user's department and semester from the server
  const department = "Computer Engineering"
  const semester = 1

  const timetable = getTimetable(department, semester)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Timetable</h1>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {DAYS.map((day) => (
                <div key={day} className="space-y-2">
                  <h3 className="font-semibold text-center">{day}</h3>
                  {Array.from({ length: HOURS_PER_DAY }).map((_, hour) => (
                    <div key={hour} className="border p-2 text-center text-sm">
                      {timetable[day][hour] || "Free"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

