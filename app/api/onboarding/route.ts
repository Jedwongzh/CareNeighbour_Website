import { NextResponse } from "next/server";
import { google } from "googleapis";

// Get environment variables
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || "";
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || "";
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || "";

// Helper function to properly format the private key
function formatPrivateKey(key: string): string {
  // Remove any surrounding quotes if present
  let formattedKey = key.trim();
  if (
    (formattedKey.startsWith('"') && formattedKey.endsWith('"')) ||
    (formattedKey.startsWith("'") && formattedKey.endsWith("'"))
  ) {
    formattedKey = formattedKey.substring(1, formattedKey.length - 1);
  }

  // Replace escaped newlines with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, "\n");

  return formattedKey;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      abn, 
      address, 
      experience, 
      qualifications, 
      availability 
    } = body;

    // Format the private key properly
    const formattedPrivateKey = formatPrivateKey(GOOGLE_PRIVATE_KEY);

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: formattedPrivateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client as any });

    const sheetName = "Onboarding";
    const range = `${sheetName}!A:J`;

    // Check if the sheet exists
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEET_ID,
    });
    const existingSheets =
      spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title || "") ||
      [];

    if (!existingSheets.includes(sheetName)) {
      // Create the sheet if it doesn't exist
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            },
          ],
        },
      });

      // Add headers to the new sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${sheetName}!A1:J1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              "First Name",
              "Last Name",
              "Email",
              "Phone Number",
              "ABN",
              "Address",
              "Experience",
              "Qualifications",
              "Availability",
              "Timestamp",
            ],
          ],
        },
      });
    }

    // Append the new user data
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            firstName,
            lastName,
            email,
            phone,
            abn,
            address,
            experience || '',
            qualifications || '',
            availability,
            new Date().toISOString(),
          ],
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: "User data added to the sheet successfully",
    });
  } catch (error) {
    console.error("Error adding user to sheet:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add user to the sheet",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
