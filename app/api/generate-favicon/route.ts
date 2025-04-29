import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Check if favicon.ico already exists
    const faviconPath = path.join(process.cwd(), "public", "favicon.ico")
    if (fs.existsSync(faviconPath)) {
      return NextResponse.json({
        success: true,
        message: "favicon.ico already exists",
      })
    }

    // Load the PNG image
    const pngPath = path.join(process.cwd(), "public", "favicon.png")
    if (!fs.existsSync(pngPath)) {
      return NextResponse.json(
        {
          success: false,
          message: "favicon.png not found",
        },
        { status: 404 },
      )
    }

    // This is just a placeholder - in a real implementation, we would
    // convert the PNG to ICO format, but that requires additional libraries
    // For now, we'll just copy the PNG as is
    fs.copyFileSync(pngPath, faviconPath)

    return NextResponse.json({
      success: true,
      message: "favicon.ico created",
    })
  } catch (error) {
    console.error("Error generating favicon:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate favicon",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
