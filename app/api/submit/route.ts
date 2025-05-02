import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Helper function to ensure the data directory exists
function ensureDataDir() {
  try {
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    return dataDir
  } catch (error) {
    console.error("Error creating data directory:", error)
    throw new Error("Failed to create data directory")
  }
}

// Helper function to read existing data
function readDataFile(filename: string) {
  try {
    const dataDir = ensureDataDir()
    const filePath = path.join(dataDir, filename)

    if (!fs.existsSync(filePath)) {
      return []
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading data file ${filename}:`, error)
    return []
  }
}

// Helper function to write data to file
function writeDataFile(filename: string, data: any[]) {
  try {
    const dataDir = ensureDataDir()
    const filePath = path.join(dataDir, filename)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error(`Error writing to data file ${filename}:`, error)
    throw new Error(`Failed to write to ${filename}`)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, email, feedback = "" } = body

    if (!type || !email) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    if (type !== "waitlist" && type !== "feedback") {
      return NextResponse.json({ success: false, message: "Invalid type parameter" }, { status: 400 })
    }

    try {
      const timestamp = new Date().toISOString()

      if (type === "waitlist") {
        interface WaitlistEntry {
          email: string
          timestamp: string
        }

        const waitlistEntries: WaitlistEntry[] = readDataFile("waitlist.json")

        // Check if email already exists
        if (waitlistEntries.some((entry) => entry.email === email)) {
          return NextResponse.json({ success: false, message: "This email is already on our waitlist." })
        }

        // Add new entry
        waitlistEntries.push({ email, timestamp })
        writeDataFile("waitlist.json", waitlistEntries)
      } else {
        // It's feedback
        if (!feedback || feedback.trim().length < 5) {
          return NextResponse.json({ success: false, message: "Please provide some feedback." })
        }

        const feedbackEntries = readDataFile("feedback.json")
        feedbackEntries.push({ email, feedback, timestamp })
        writeDataFile("feedback.json", feedbackEntries)
      }

      return NextResponse.json({
        success: true,
        message: `${type === "waitlist" ? "Waitlist" : "Feedback"} submission successful`,
        redirectUrl: `/thank-you/${type}`,
      })
    } catch (error) {
      console.error(`Error saving ${type} data:`, error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save data",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error parsing request:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to parse request",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 400 },
    )
  }
}
