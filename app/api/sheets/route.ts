import { NextResponse } from "next/server"
import { google } from "googleapis"

// Get environment variables
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || ""
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || ""
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || ""

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

async function getAuthSheets() {
  try {
    // Log environment variable status (without exposing sensitive data)
    console.log("Google Sheets API credentials status:", {
      hasPrivateKey: !!GOOGLE_PRIVATE_KEY && GOOGLE_PRIVATE_KEY.length > 0,
      hasClientEmail: !!GOOGLE_CLIENT_EMAIL && GOOGLE_CLIENT_EMAIL.length > 0,
      hasSheetId: !!GOOGLE_SHEET_ID && GOOGLE_SHEET_ID.length > 0,
      privateKeyLength: GOOGLE_PRIVATE_KEY.length,
    })

    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_SHEET_ID) {
      throw new Error("Missing required Google Sheets credentials")
    }

    // Format the private key properly
    const formattedPrivateKey = formatPrivateKey(GOOGLE_PRIVATE_KEY)

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

    return { sheets }
  } catch (error) {
    console.error("Error authenticating with Google Sheets:", error)
    throw error
  }
}

// Function to ensure the required sheets exist
async function ensureSheets(sheets: any) {
  try {
    // Get spreadsheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEET_ID,
    })

    console.log("Successfully connected to spreadsheet:", spreadsheet.data.properties?.title)

    // Get existing sheet names
    const existingSheets = spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title || "") || []

    console.log("Existing sheets:", existingSheets)

    // Check if our required sheets exist
    const requiredSheets = ["Waitlist", "Feedback"]
    const sheetsToCreate = requiredSheets.filter((sheet) => !existingSheets.includes(sheet))

    // Create any missing sheets
    if (sheetsToCreate.length > 0) {
      console.log("Creating missing sheets:", sheetsToCreate)

      const requests = sheetsToCreate.map((title) => ({
        addSheet: {
          properties: { title },
        },
      }))

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEET_ID,
        requestBody: {
          requests,
        },
      })

      console.log("Created missing sheets successfully")

      // Add headers to the new sheets
      for (const sheet of sheetsToCreate) {
        const headerValues = sheet === "Waitlist" ? [["Email", "Timestamp"]] : [["Email", "Feedback", "Timestamp"]]

        await sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: `${sheet}!A1:C1`,
          valueInputOption: "RAW",
          requestBody: {
            values: headerValues,
          },
        })

        console.log(`Added headers to ${sheet} sheet`)
      }
    }

    return true
  } catch (error) {
    console.error("Error ensuring sheets exist:", error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, email, feedback = "" } = body

    console.log(`Processing ${type} submission for ${email}`)

    if (!type || !email) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    try {
      const { sheets } = await getAuthSheets()

      // Ensure required sheets exist
      await ensureSheets(sheets)

      const timestamp = new Date().toISOString()

      // Determine which sheet to use based on the type
      const sheetName = type === "waitlist" ? "Waitlist" : "Feedback"

      // Prepare the values to append
      const values = type === "waitlist" ? [[email, timestamp]] : [[email, feedback, timestamp]]

      console.log(`Appending data to ${sheetName}:`, values)

      // Append the data to the Google Sheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${sheetName}!A:C`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      })

      console.log("Google Sheets API response:", {
        status: response.status,
        statusText: response.statusText,
        updatedRange: response.data.updates?.updatedRange,
        updatedCells: response.data.updates?.updatedCells,
      })

      return NextResponse.json({
        success: true,
        message: `Data saved to ${sheetName} sheet`,
        details: {
          status: response.status,
          updatedRange: response.data.updates?.updatedRange,
          updatedCells: response.data.updates?.updatedCells,
        },
      })
    } catch (error) {
      console.error("Error in Google Sheets API call:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save data to Google Sheets",
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
