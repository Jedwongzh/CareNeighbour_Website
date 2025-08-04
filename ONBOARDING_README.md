# Onboarding Form - Setup and Usage

## Overview

The onboarding form has been optimized for better user experience with the following improvements:

### ✨ Key Features

1. **Simplified Form**: Only collects essential information (First Name, Last Name, Email, Phone)
2. **Consistent Design**: Matches the main page aesthetics with gradient backgrounds and modern styling
3. **Google Sheets Integration**: Automatically saves form submissions to Google Sheets
4. **Multilingual Support**: Full English and Chinese language support
5. **Responsive Design**: Works perfectly on desktop and mobile devices
6. **Thank You Page**: Dedicated success page with next steps information

### 🔧 Setup Instructions

#### 1. Google Sheets Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Sheets API**:
   - In the Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Sheets API" and enable it

3. **Create a Service Account**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the service account details
   - Download the JSON key file

4. **Create a Google Sheet**:
   - Create a new Google Sheet
   - Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Share the sheet with your service account email (found in the JSON file)

#### 2. Environment Configuration

1. **Create `.env.local` file** in the project root:
   ```bash
   # Copy from .env.example and fill in your values
   GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your_google_sheet_id_here
   ```

2. **Extract values from your JSON key file**:
   - `GOOGLE_CLIENT_EMAIL`: The "client_email" field
   - `GOOGLE_PRIVATE_KEY`: The "private_key" field (keep the quotes and \\n line breaks)
   - `GOOGLE_SHEET_ID`: From your Google Sheet URL

#### 3. Test the Setup

Run the test script to verify your Google Sheets integration:

```bash
node test-sheets.js
```

This will:
- ✅ Verify environment variables
- ✅ Test Google Sheets API connection
- ✅ Create the "Onboarding" sheet if needed
- ✅ Add test data to confirm everything works

### 📱 Form Features

#### User Experience Improvements

1. **Clean, Modern Design**:
   - Gradient text headers matching the main page
   - Glassmorphism effects with backdrop blur
   - Smooth animations and transitions
   - Purple color scheme consistent with brand

2. **Enhanced Validation**:
   - Real-time field validation
   - Proper email format checking
   - Phone number validation
   - Minimum character requirements

3. **Loading States**:
   - Animated loading spinner during submission
   - Disabled state prevents double submissions
   - Clear success/error messaging

4. **Accessibility**:
   - Proper form labels and ARIA attributes
   - Keyboard navigation support
   - Clear error messages
   - Screen reader friendly

### 🗂️ File Structure

```
app/
├── onboarding/
│   └── page.tsx              # Main onboarding form
├── thank-you/
│   └── onboarding/
│       └── page.tsx          # Success page after form submission
└── api/
    └── onboarding/
        └── route.ts          # API endpoint for form processing

test-sheets.js                # Google Sheets integration test script
.env.example                  # Environment variables template
```

### 🔄 Form Flow

1. **User visits** `/onboarding`
2. **Fills out form** with personal information
3. **Submits form** → Data validation
4. **API processes** → Saves to Google Sheets
5. **Redirects to** `/thank-you/onboarding`
6. **Shows success page** with next steps

### 🌐 Multilingual Support

The form supports both English and Chinese:

- **English**: Default language
- **Chinese**: Full translation for all form elements
- **Dynamic switching**: Users can change language via header
- **Validation messages**: Error messages in both languages

### 📊 Google Sheets Structure

The form creates a sheet called "Onboarding" with the following columns:

| Column | Description |
|--------|-------------|
| First Name | User's first name |
| Last Name | User's last name |
| Email | User's email address |
| Phone Number | User's phone number |
| Timestamp | When the form was submitted |

### 🚀 Running the Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (see setup instructions above)

3. **Test Google Sheets connection**:
   ```bash
   node test-sheets.js
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Visit the form**:
   - Open [http://localhost:3000/onboarding](http://localhost:3000/onboarding)

### 🔧 Troubleshooting

#### Common Issues

1. **"Failed to add user to the sheet"**:
   - Check that your service account has edit access to the sheet
   - Verify the GOOGLE_SHEET_ID is correct
   - Run the test script to diagnose the issue

2. **"Missing required environment variables"**:
   - Ensure `.env.local` file exists in the project root
   - Check that all three variables are properly set
   - Verify the private key format (keep \\n line breaks)

3. **"Spreadsheet not found"**:
   - Check the GOOGLE_SHEET_ID in your environment variables
   - Make sure the sheet is shared with your service account email

#### Getting Help

If you encounter issues:

1. **Run the test script**: `node test-sheets.js`
2. **Check the browser console** for error messages
3. **Verify your Google Cloud setup** and API permissions
4. **Check that the service account has access** to your Google Sheet

### 📈 Future Enhancements

Potential improvements for the onboarding form:

- [ ] File upload for documents/certificates
- [ ] Email confirmation system
- [ ] Admin dashboard for reviewing applications
- [ ] Integration with CRM systems
- [ ] Automated background checks
- [ ] Calendar integration for interviews

---

## 🎉 Conclusion

Your onboarding form is now optimized for the best user experience with:
- ✅ Clean, modern design matching your brand
- ✅ Simplified 4-field form for better conversion
- ✅ Automatic Google Sheets integration
- ✅ Multilingual support (English/Chinese)
- ✅ Dedicated thank you page
- ✅ Mobile-responsive design
- ✅ Comprehensive error handling

The form is ready to collect carer applications and automatically organize them in your Google Sheet for easy review and follow-up!
