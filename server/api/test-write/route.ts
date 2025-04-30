import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Test if we can create the data directory
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Test if we can write to a file
    const testFile = path.join(dataDir, "test-write.txt")
    fs.writeFileSync(testFile, "Test write at " + new Date().toISOString())

    // Read the file back to confirm
    const content = fs.readFileSync(testFile, "utf8")

    return NextResponse.json({
      success: true,
      message: "Write test successful",
      content,
      dataDir,
    })
  } catch (error) {
    console.error("Error in test-write:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Write test failed",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
