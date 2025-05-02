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

export async function GET() {
  try {
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
    const sheets = google.sheets({ version: "v4", auth: client as any })

    // Get spreadsheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEET_ID,
    })

    // Get existing sheet names
    const existingSheets = spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title || "") || []

    // Check if our required sheets exist
    const requiredSheets = ["Waitlist", "Feedback"]
    const sheetsToCreate = requiredSheets.filter((sheet) => !existingSheets.includes(sheet))

    // Create any missing sheets
    if (sheetsToCreate.length > 0) {
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
      }
    }

    // Now look for any data in Sheet1 or other sheets that needs to be organized
    const results: { waitlistMoved: number; feedbackMoved: number; errors: string[] } = {
      waitlistMoved: 0,
      feedbackMoved: 0,
      errors: [],
    }

    // Process each existing sheet except Waitlist and Feedback
    for (const sheetName of existingSheets) {
      if (sheetName === "Waitlist" || sheetName === "Feedback") continue

      try {
        // Get all data from this sheet
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: `${sheetName}!A:D`,
        })

        const rows = response.data.values || []
        if (rows.length <= 1) continue // Skip if only headers or empty

        // Process each row (skip header row)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i]

          // Check if this is a test row
          const isTestRow = row[0] === "TEST" || row[0] === "DIRECT-TEST"
          if (isTestRow) continue

          try {
            // Determine if this is a waitlist or feedback entry
            const hasTypeColumn = row.length >= 2 && (row[1] === "waitlist" || row[1] === "feedback")
            const type = hasTypeColumn ? row[1] : row.length >= 3 ? "feedback" : "waitlist"

            if (type === "waitlist") {
              // Format: [email, timestamp] or [email, "waitlist", timestamp]
              const email = row[0]
              const timestamp = hasTypeColumn ? row[2] : row[1]

              // Append to Waitlist sheet
              await sheets.spreadsheets.values.append({
                spreadsheetId: GOOGLE_SHEET_ID,
                range: "Waitlist!A:B",
                valueInputOption: "USER_ENTERED",
                requestBody: {
                  values: [[email, timestamp]],
                },
              })

              results.waitlistMoved++
            } else {
              // Format: [email, feedback, timestamp] or [email, "feedback", feedback, timestamp]
              const email = row[0]
              const feedback = hasTypeColumn ? row[2] : row[1]
              const timestamp = hasTypeColumn ? row[3] : row[2]

              // Append to Feedback sheet
              await sheets.spreadsheets.values.append({
                spreadsheetId: GOOGLE_SHEET_ID,
                range: "Feedback!A:C",
                valueInputOption: "USER_ENTERED",
                requestBody: {
                  values: [[email, feedback, timestamp]],
                },
              })

              results.feedbackMoved++
            }
          } catch (rowError) {
            const errorMessage = rowError instanceof Error ? rowError.message : String(rowError)
            results.errors.push(`Error processing row ${i} in sheet ${sheetName}: ${errorMessage}`)
          }
        }
      } catch (sheetError) {
        const errorMessage = sheetError instanceof Error ? sheetError.message : String(sheetError)
        results.errors.push(`Error processing sheet ${sheetName}: ${errorMessage}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Sheets organized successfully",
      results,
    })
  } catch (error) {
    console.error("Error organizing sheets:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to organize sheets",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
