"use server";

import { google } from "googleapis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Helper function to get the base URL
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    // Vercel system environment variable
    return `https://${process.env.VERCEL_URL}`;
  }
  // Check for a custom environment variable
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Default to localhost for development
  return "http://localhost:3000";
}


// --- Google Sheets Setup (Keep your existing setup) ---
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || "";
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || "";
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || "";

function formatPrivateKey(key: string): string {
  let formattedKey = key.trim();
  if ((formattedKey.startsWith('"') && formattedKey.endsWith('"')) || (formattedKey.startsWith("'") && formattedKey.endsWith("'"))) {
    formattedKey = formattedKey.substring(1, formattedKey.length - 1);
  }
  formattedKey = formattedKey.replace(/\\n/g, "\n");
  return formattedKey;
}

async function getGoogleSheetsClient() {
  const formattedPrivateKey = formatPrivateKey(GOOGLE_PRIVATE_KEY);
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: formattedPrivateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client as any });
}
// --- End Google Sheets Setup ---


// Define Zod schemas for validation
const WaitlistSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const FeedbackSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  feedback: z.string().min(10, { message: "Feedback must be at least 10 characters." }),
});


export async function joinWaitlist(formData: FormData) {
  const validatedFields = WaitlistSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please enter a valid email.",
      error: validatedFields.error.flatten().fieldErrors.email?.[0] || "Invalid input.",
    };
  }

  const { email } = validatedFields.data;
  const timestamp = new Date().toISOString();

  try {
    const sheets = await getGoogleSheetsClient();

    // Ensure sheets are organized (optional, could be done separately)
    // If you call your organize endpoint from here, use the absolute URL
    // const organizeUrl = `${getBaseUrl()}/api/organize-sheets`;
    // await fetch(organizeUrl); // Example call

    // Append directly to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Waitlist!A:B", // Target specific sheet
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, timestamp]],
      },
    });

    console.log("Successfully added to Waitlist sheet:", email);
    revalidatePath("/"); // Revalidate the page if needed
    // Redirect on success
    return { success: true, message: "Successfully joined waitlist!", redirectUrl: "/thank-you/waitlist" };

  } catch (error) {
    console.error("Error in Google Sheets submission (Waitlist):", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Check if the error is the URL parsing error specifically
    if (errorMessage.includes("Failed to parse URL")) {
       return {
         success: false,
         message: "Configuration error: Could not determine API endpoint URL.",
         error: errorMessage,
       };
    }
    return {
      success: false,
      message: "Failed to add email to waitlist.",
      error: errorMessage,
    };
  }
}

export async function submitFeedback(formData: FormData) {
   const validatedFields = FeedbackSchema.safeParse({
     email: formData.get("email"),
     feedback: formData.get("feedback"),
   });

   if (!validatedFields.success) {
     const errors = validatedFields.error.flatten().fieldErrors;
     return {
       success: false,
       message: "Please enter a valid email.",
       error: errors.email?.[0] || errors.feedback?.[0] || "Invalid input.",
     };
   }

   const { email, feedback } = validatedFields.data;
   const timestamp = new Date().toISOString();

   try {
     const sheets = await getGoogleSheetsClient();

     // Ensure sheets are organized (optional)
     // const organizeUrl = `${getBaseUrl()}/api/organize-sheets`;
     // await fetch(organizeUrl); // Example call

     // Append directly to the sheet
     await sheets.spreadsheets.values.append({
       spreadsheetId: GOOGLE_SHEET_ID,
       range: "Feedback!A:C", // Target specific sheet
       valueInputOption: "USER_ENTERED",
       requestBody: {
         values: [[email, feedback, timestamp]],
       },
     });

     console.log("Successfully added to Feedback sheet:", email);
     revalidatePath("/"); // Revalidate the page if needed
     // Redirect on success
     return { success: true, message: "Feedback submitted successfully!", redirectUrl: "/thank-you/feedback" };

   } catch (error) {
     console.error("Error in Google Sheets submission (Feedback):", error);
     const errorMessage = error instanceof Error ? error.message : String(error);
      // Check if the error is the URL parsing error specifically
     if (errorMessage.includes("Failed to parse URL")) {
        return {
          success: false,
          message: "Configuration error: Could not determine API endpoint URL.",
          error: errorMessage,
        };
     }
     return {
       success: false,
       message: "Failed to submit feedback.",
       error: errorMessage,
     };
   }
}
