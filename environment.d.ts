declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Google Analytics
      NEXT_PUBLIC_GA4_ID: string;
      
      // Google Sheets API
      GOOGLE_PRIVATE_KEY: string;
      GOOGLE_CLIENT_EMAIL: string;
      GOOGLE_SHEET_ID: string;

      // GEMINI API
      GEMINI_API_KEY: string;
      
      // Next.js Configuration
      NEXT_PUBLIC_SITE_URL: string;
      VERCEL_URL?: string;
      
      // Environment
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};