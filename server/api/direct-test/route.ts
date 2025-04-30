import { NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET() {
  try {
    // Get environment variables
    const privateKey = process.env.GOOGLE_PRIVATE_KEY || ""
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || ""
    const sheetId = process.env.GOOGLE_SHEET_ID || ""

    // Simple validation
    if (!privateKey || !clientEmail || !sheetId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required environment variables",
        },
        { status: 400 },
      )
    }

    // Format private key - remove quotes and replace escaped newlines
    let formattedKey = privateKey.trim()
    if (
      (formattedKey.startsWith('"') && formattedKey.endsWith('"')) ||
      (formattedKey.startsWith("'") && formattedKey.endsWith("'"))
    ) {
      formattedKey = formattedKey.substring(1, formattedKey.length - 1)
    }
    formattedKey = formattedKey.replace(/\\n/g, "\n")

    // Create JWT client
    const jwtClient = new google.auth.JWT(clientEmail, null, formattedKey, [
      "https://www.googleapis.com/auth/spreadsheets",
    ])

    // Authorize the client
    await jwtClient.authorize()

    // Create Google Sheets instance
    const sheets = google.sheets({ version: "v4", auth: jwtClient })

    // Get spreadsheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    })

    // Get first sheet name
    const firstSheet = spreadsheet.data.sheets?.[0]?.properties?.title || "Sheet1"

    // Write test data
    const testData = [["DIRECT-TEST", new Date().toISOString()]]
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${firstSheet}!A:B`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: testData },
    })

    return NextResponse.json({
      success: true,
      message: "Direct test successful",
      spreadsheetTitle: spreadsheet.data.properties?.title,
      firstSheet,
      appendResponse: {
        updatedRange: appendResponse.data.updates?.updatedRange,
        updatedCells: appendResponse.data.updates?.updatedCells,
      },
    })
  } catch (error) {
    console.error("Direct test error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Direct test failed",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
