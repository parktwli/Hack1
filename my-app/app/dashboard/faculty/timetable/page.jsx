import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { getFacultyTimetable, DAYS, HOURS_PER_DAY } from "@/utils/timetable-generator"

export default function FacultyTimetable() {
  // In a real application, you'd fetch the faculty name from the server
  const facultyName = "Prof. Smith"

  const timetable = getFacultyTimetable(facultyName)

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
                      {timetable[day][hour] ? (
                        <>
                          <p>{timetable[day][hour].subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {timetable[day][hour].department} (Sem {timetable[day][hour].semester})
                          </p>
                        </>
                      ) : (
                        "Free"
                      )}
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

