"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { generateTimetable, DEPARTMENTS, TOTAL_SEMESTERS, DAYS, HOURS_PER_DAY } from "@/utils/timetable-generator"

export default function AdminTimetable() {
  const [timetables, setTimetables] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENTS[0])
  const [selectedSemester, setSelectedSemester] = useState(1)

  const handleGenerateTimetables = () => {
    const newTimetables = generateTimetable()
    setTimetables(newTimetables)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Timetable Management</h1>

        <div className="flex space-x-4">
          <Button onClick={handleGenerateTimetables}>Generate Timetables</Button>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: TOTAL_SEMESTERS }, (_, i) => i + 1).map((semester) => (
                <SelectItem key={semester} value={semester}>
                  Semester {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {timetables && (
          <Card>
            <CardHeader>
              <CardTitle>
                Timetable for {selectedDepartment} - Semester {selectedSemester}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {DAYS.map((day) => (
                  <div key={day} className="space-y-2">
                    <h3 className="font-semibold text-center">{day}</h3>
                    {Array.from({ length: HOURS_PER_DAY }).map((_, hour) => (
                      <div key={hour} className="border p-2 text-center text-sm">
                        {timetables[selectedDepartment][selectedSemester][day][hour] || "Free"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

