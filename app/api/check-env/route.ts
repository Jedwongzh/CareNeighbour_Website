import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check environment variables without exposing sensitive data
    const envStatus = {
      GOOGLE_CLIENT_EMAIL: {
        exists: !!process.env.GOOGLE_CLIENT_EMAIL,
        length: process.env.GOOGLE_CLIENT_EMAIL?.length || 0,
        preview: process.env.GOOGLE_CLIENT_EMAIL
          ? process.env.GOOGLE_CLIENT_EMAIL.substring(0, 5) +
            "..." +
            process.env.GOOGLE_CLIENT_EMAIL.substring(process.env.GOOGLE_CLIENT_EMAIL.indexOf("@"))
          : null,
      },
      GOOGLE_PRIVATE_KEY: {
        exists: !!process.env.GOOGLE_PRIVATE_KEY,
        length: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
        containsNewlines: process.env.GOOGLE_PRIVATE_KEY?.includes("\n") || false,
        containsEscapedNewlines: process.env.GOOGLE_PRIVATE_KEY?.includes("\\n") || false,
        startsWithHeader: process.env.GOOGLE_PRIVATE_KEY?.includes("-----BEGIN PRIVATE KEY-----") || false,
        endsWithFooter: process.env.GOOGLE_PRIVATE_KEY?.includes("-----END PRIVATE KEY-----") || false,
      },
      GOOGLE_SHEET_ID: {
        exists: !!process.env.GOOGLE_SHEET_ID,
        length: process.env.GOOGLE_SHEET_ID?.length || 0,
        preview: process.env.GOOGLE_SHEET_ID ? process.env.GOOGLE_SHEET_ID.substring(0, 5) + "..." : null,
      },
      NEXT_PUBLIC_BASE_URL: {
        exists: !!process.env.NEXT_PUBLIC_BASE_URL,
        value: process.env.NEXT_PUBLIC_BASE_URL || null,
      },
    }

    return NextResponse.json({
      success: true,
      message: "Environment variables check",
      envStatus,
    })
  } catch (error) {
    console.error("Error checking environment variables:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error checking environment variables",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
