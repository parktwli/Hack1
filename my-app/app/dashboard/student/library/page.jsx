import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"

export default function StudentLibrary() {
  const suggestedBooks = [
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
    { title: "Computer Networks", author: "Andrew S. Tanenbaum" },
    { title: "Database System Concepts", author: "Abraham Silberschatz" },
  ]

  const issuedBooks = [
    { title: "Design Patterns", author: "Erich Gamma", dueDate: "2023-10-15" },
    { title: "Clean Code", author: "Robert C. Martin", dueDate: "2023-10-20" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Library</h1>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Reference Books</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {suggestedBooks.map((book, index) => (
                <li key={index}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issued Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issuedBooks.map((book, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <p className="text-sm">Due: {book.dueDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

