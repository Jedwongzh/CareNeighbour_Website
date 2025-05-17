"use server"

import fs from "fs"
import path from "path"
import { revalidatePath } from "next/cache"

type WaitlistEntry = {
  email: string
  timestamp: string
}

type FeedbackEntry = {
  email: string
  feedback: string
  timestamp: string
}

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
function readDataFile<T>(filename: string): T[] {
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
function writeDataFile<T>(filename: string, data: T[]) {
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

// Helper function to send data to Google Sheets
async function sendToGoogleSheets(type: string, data: any) {
  try {
    // Get the base URL - important for server actions to know where to send the request
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""
    console.log(`Sending data to Google Sheets at ${baseUrl}/api/sheets`)

    // Make the request to our API route
    const response = await fetch(`${baseUrl}/api/sheets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, ...data }),
    })

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Google Sheets API error (${response.status}): ${errorText}`)
      return { success: false, error: `${response.status}: ${errorText}` }
    }

    // Parse and return the response
    const result = await response.json()
    console.log("Google Sheets API result:", result)
    return result
  } catch (error) {
    console.error("Error sending data to Google Sheets:", error)
    // Don't throw here, as we want to continue with local storage even if Google Sheets fails
    return { success: false, error: error.message }
  }
}

export async function joinWaitlist(formData: FormData) {
  try {
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
      return { success: false, message: "Please provide a valid email address." }
    }

    // First try to save locally
    try {
      const waitlistEntries = readDataFile<WaitlistEntry>("waitlist.json")

      // Check if email already exists
      if (waitlistEntries.some((entry) => entry.email === email)) {
        return { success: false, message: "This email is already on our waitlist." }
      }

      // Add new entry
      const newEntry: WaitlistEntry = {
        email,
        timestamp: new Date().toISOString(),
      }

      // Save to local JSON file
      waitlistEntries.push(newEntry)
      writeDataFile("waitlist.json", waitlistEntries)
      console.log("Successfully saved waitlist entry to local file")
    } catch (localError) {
      console.error("Error saving to local file:", localError)
      // Continue to Google Sheets even if local save fails
    }

    // Then try Google Sheets - use a direct API call to our sheets endpoint
    try {
      // Try to determine the base URL if not set in environment
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      if (!baseUrl) {
        // Fallback to a relative URL which should work in most cases
        baseUrl = ""
        console.log("NEXT_PUBLIC_BASE_URL not set, using relative URL")
      }

      const apiUrl = `${baseUrl}/api/sheets`
      console.log(`Sending waitlist data to: ${apiUrl}`)

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "waitlist",
          email,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Google Sheets API error (${response.status}): ${errorText}`)
      } else {
        const result = await response.json()
        console.log("Google Sheets API result:", result)
      }
    } catch (sheetsError) {
      console.error("Error in Google Sheets submission:", sheetsError)
      // If Google Sheets fails but we saved locally, still consider it a success
    }

    revalidatePath("/")
    return { success: true, redirectUrl: "/thank-you/waitlist" }
  } catch (error) {
    console.error("Error in joinWaitlist:", error)
    return {
      success: false,
      message: "An error occurred. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export async function submitFeedback(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const feedback = formData.get("feedback") as string

    if (!email || !email.includes("@")) {
      return { success: false, message: "Please provide a valid email address." }
    }

    if (!feedback || feedback.trim().length < 5) {
      return { success: false, message: "Please provide some feedback." }
    }

    // First try to save locally
    try {
      const feedbackEntries = readDataFile<FeedbackEntry>("feedback.json")

      // Add new entry
      const newEntry: FeedbackEntry = {
        email,
        feedback,
        timestamp: new Date().toISOString(),
      }

      // Save to local JSON file
      feedbackEntries.push(newEntry)
      writeDataFile("feedback.json", feedbackEntries)
      console.log("Successfully saved feedback entry to local file")
    } catch (localError) {
      console.error("Error saving to local file:", localError)
      // Continue to Google Sheets even if local save fails
    }

    // Then try Google Sheets - use a direct API call to our sheets endpoint
    try {
      // Try to determine the base URL if not set in environment
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      if (!baseUrl) {
        // Fallback to a relative URL which should work in most cases
        baseUrl = ""
        console.log("NEXT_PUBLIC_BASE_URL not set, using relative URL")
      }

      const apiUrl = `${baseUrl}/api/sheets`
      console.log(`Sending feedback data to: ${apiUrl}`)

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "feedback",
          email,
          feedback,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Google Sheets API error (${response.status}): ${errorText}`)
      } else {
        const result = await response.json()
        console.log("Google Sheets API result:", result)
      }
    } catch (sheetsError) {
      console.error("Error in Google Sheets submission:", sheetsError)
      // If Google Sheets fails but we saved locally, still consider it a success
    }

    revalidatePath("/")
    return { success: true, redirectUrl: "/thank-you/feedback" }
  } catch (error) {
    console.error("Error in submitFeedback:", error)
    return {
      success: false,
      message: "An error occurred. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
