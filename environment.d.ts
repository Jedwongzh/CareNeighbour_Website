declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Google Analytics
      GA4_ID: string;
      
      // Google Sheets API
      GOOGLE_PRIVATE_KEY: string;
      GOOGLE_CLIENT_EMAIL: string;
      GOOGLE_SHEET_ID: string;
      
      // Next.js Configuration
      NEXT_PUBLIC_SITE_URL: string;
      VERCEL_URL?: string;
      
      // Environment
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};