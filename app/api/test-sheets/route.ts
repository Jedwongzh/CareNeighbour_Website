import { NextResponse } from "next/server"
import { google } from "googleapis"

// Helper function to properly format the private key
function formatPrivateKey(key: string): string {
  // Remove any surrounding quotes if present
  let formattedKey = key.trim()
  if (
    (formattedKey.startsWith('"') && formattedKey.endsWith('"')) ||
    (formattedKey.startsWith("'") && formattedKey.endsWith("'"))
  ) {
    formattedKey = formattedKey.substring(1, formattedKey.length - 1)
  }

  // Replace escaped newlines with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, "\n")

  return formattedKey
}

export async function GET() {
  try {
    // Get environment variables
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || ""
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || ""
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || ""

    // Check if all required variables are present
    const credentialStatus = {
      hasPrivateKey: !!GOOGLE_PRIVATE_KEY && GOOGLE_PRIVATE_KEY.length > 0,
      hasClientEmail: !!GOOGLE_CLIENT_EMAIL && GOOGLE_CLIENT_EMAIL.length > 0,
      hasSheetId: !!GOOGLE_SHEET_ID && GOOGLE_SHEET_ID.length > 0,
      privateKeyLength: GOOGLE_PRIVATE_KEY.length,
    }

    console.log("Google Sheets API credentials status:", credentialStatus)

    if (!credentialStatus.hasPrivateKey || !credentialStatus.hasClientEmail || !credentialStatus.hasSheetId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required Google Sheets credentials",
          credentialStatus,
        },
        { status: 400 },
      )
    }

    // Format the private key properly
    const formattedPrivateKey = formatPrivateKey(GOOGLE_PRIVATE_KEY)

    // Log the first and last few characters of the formatted key for debugging
    // (without exposing the entire key)
    console.log("Formatted private key preview:", {
      start: formattedPrivateKey.substring(0, 30) + "...",
      end: "..." + formattedPrivateKey.substring(formattedPrivateKey.length - 30),
      containsBeginMarker: formattedPrivateKey.includes("-----BEGIN PRIVATE KEY-----"),
      containsEndMarker: formattedPrivateKey.includes("-----END PRIVATE KEY-----"),
      length: formattedPrivateKey.length,
    })

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: formattedPrivateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const client = await auth.getClient()
    const sheets = google.sheets({ version: "v4", auth: client })

    // Get spreadsheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEET_ID,
    })

    // Get sheet names
    const sheetNames = spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title || "Unnamed Sheet") || []

    // Test writing to the spreadsheet - use the first sheet
    const firstSheetName = sheetNames[0] || "Sheet1"
    const testTimestamp = new Date().toISOString()
    const testResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${firstSheetName}!A:C`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["TEST", "API Connection Test", testTimestamp]],
      },
    })

    return NextResponse.json({
      success: true,
      message: "Google Sheets connection test successful",
      spreadsheetTitle: spreadsheet.data.properties?.title,
      sheetNames,
      testWriteResponse: {
        status: testResponse.status,
        updatedRange: testResponse.data.updates?.updatedRange,
        updatedCells: testResponse.data.updates?.updatedCells,
      },
    })
  } catch (error) {
    console.error("Error testing Google Sheets connection:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Google Sheets connection test failed",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
