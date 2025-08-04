#!/usr/bin/env node

/**
 * Google Sheets Integration Test Script
 * 
 * This script helps you test your Google Sheets API setup before running the application.
 * 
 * Prerequisites:
 * 1. Create a .env.local file with your Google Sheets credentials
 * 2. Install dependencies: npm install
 * 3. Run this script: node test-sheets.js
 */

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

// Helper function to properly format the private key
function formatPrivateKey(key) {
  let formattedKey = key.trim();
  if (
    (formattedKey.startsWith('"') && formattedKey.endsWith('"')) ||
    (formattedKey.startsWith("'") && formattedKey.endsWith("'"))
  ) {
    formattedKey = formattedKey.substring(1, formattedKey.length - 1);
  }
  formattedKey = formattedKey.replace(/\\n/g, "\n");
  return formattedKey;
}

async function testGoogleSheetsConnection() {
  try {
    console.log('🔧 Testing Google Sheets API connection...\n');

    // Check environment variables
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_SHEET_ID) {
      console.error('❌ Missing required environment variables:');
      if (!GOOGLE_PRIVATE_KEY) console.error('   - GOOGLE_PRIVATE_KEY');
      if (!GOOGLE_CLIENT_EMAIL) console.error('   - GOOGLE_CLIENT_EMAIL');
      if (!GOOGLE_SHEET_ID) console.error('   - GOOGLE_SHEET_ID');
      console.error('\n💡 Make sure you have a .env.local file with the correct values.');
      process.exit(1);
    }

    console.log('✅ Environment variables found');

    // Format the private key
    const formattedPrivateKey = formatPrivateKey(GOOGLE_PRIVATE_KEY);

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: formattedPrivateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    console.log('✅ Google Auth client created');

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    console.log('✅ Google Sheets client initialized');

    // Test spreadsheet access
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEET_ID,
    });

    console.log('✅ Successfully connected to Google Sheet:');
    console.log(`   Title: ${spreadsheet.data.properties?.title}`);
    console.log(`   Sheet ID: ${GOOGLE_SHEET_ID}`);

    // List existing sheets
    const existingSheets = spreadsheet.data.sheets?.map(sheet => sheet.properties?.title) || [];
    console.log(`   Existing sheets: ${existingSheets.join(', ')}`);

    // Test creating/checking the Onboarding sheet
    if (!existingSheets.includes('Onboarding')) {
      console.log('\n📝 Creating "Onboarding" sheet...');
      
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Onboarding',
                },
              },
            },
          ],
        },
      });

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Onboarding!A1:E1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            ['First Name', 'Last Name', 'Email', 'Phone Number', 'Timestamp'],
          ],
        },
      });

      console.log('✅ "Onboarding" sheet created with headers');
    } else {
      console.log('✅ "Onboarding" sheet already exists');
    }

    // Test adding a sample row
    console.log('\n📝 Adding test data...');
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Onboarding!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            'Test',
            'User',
            'test@example.com',
            '+1234567890',
            new Date().toISOString(),
          ],
        ],
      },
    });

    console.log('✅ Test data added successfully');
    console.log('\n🎉 Google Sheets integration test completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - ✅ Environment variables configured');
    console.log('   - ✅ Google Sheets API connection working');
    console.log('   - ✅ Spreadsheet accessible');
    console.log('   - ✅ "Onboarding" sheet ready');
    console.log('   - ✅ Data insertion working');
    console.log('\n🚀 Your onboarding form is ready to use!');

  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('404')) {
      console.error('\n💡 Possible solutions:');
      console.error('   - Check that the GOOGLE_SHEET_ID is correct');
      console.error('   - Make sure the service account has access to the sheet');
      console.error('   - Share the sheet with the service account email');
    }
    
    if (error.message.includes('403')) {
      console.error('\n💡 Possible solutions:');
      console.error('   - Enable Google Sheets API in Google Cloud Console');
      console.error('   - Check service account permissions');
      console.error('   - Make sure the sheet is shared with the service account');
    }

    process.exit(1);
  }
}

// Run the test
testGoogleSheetsConnection();
