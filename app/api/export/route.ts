import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type")

  if (!type || (type !== "waitlist" && type !== "feedback")) {
    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
  }

  try {
    const dataPath = path.join(process.cwd(), "data", `${type}.json`)

    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ error: "No data found" }, { status: 404 })
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"))

    // Convert to CSV
    let csv = ""

    if (type === "waitlist") {
      csv = "Email,Timestamp\n"
      data.forEach((entry) => {
        csv += `"${entry.email}","${entry.timestamp}"\n`
      })
    } else {
      csv = "Email,Feedback,Timestamp\n"
      data.forEach((entry) => {
        csv += `"${entry.email}","${entry.feedback.replace(/"/g, '""')}","${entry.timestamp}"\n`
      })
    }

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=${type}-data.csv`,
      },
    })
  } catch (error) {
    console.error("Error exporting data:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
