import fs from "fs"
import path from "path"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function AdminPage() {
  // Read waitlist data
  const waitlistPath = path.join(process.cwd(), "data", "waitlist.json")
  const waitlistData = fs.existsSync(waitlistPath) ? JSON.parse(fs.readFileSync(waitlistPath, "utf8")) : []

  // Read feedback data
  const feedbackPath = path.join(process.cwd(), "data", "feedback.json")
  const feedbackData = fs.existsSync(feedbackPath) ? JSON.parse(fs.readFileSync(feedbackPath, "utf8")) : []

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="waitlist">
        <TabsList className="mb-4">
          <TabsTrigger value="waitlist">Waitlist ({waitlistData.length})</TabsTrigger>
          <TabsTrigger value="feedback">Feedback ({feedbackData.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="waitlist">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Waitlist Submissions</CardTitle>
              <a href="/api/export?type=waitlist" download>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </a>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlistData.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="p-4 text-center text-gray-500">
                          No submissions yet
                        </td>
                      </tr>
                    ) : (
                      waitlistData.map((entry, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{entry.email}</td>
                          <td className="p-2">{new Date(entry.timestamp).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Feedback Submissions</CardTitle>
              <a href="/api/export?type=feedback" download>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </a>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.length === 0 ? (
                  <p className="text-center text-gray-500">No submissions yet</p>
                ) : (
                  feedbackData.map((entry, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{entry.email}</span>
                        <span className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{entry.feedback}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <a href="/" className="text-primary hover:underline">
          &larr; Back to Home
        </a>
      </div>
    </div>
  )
}
