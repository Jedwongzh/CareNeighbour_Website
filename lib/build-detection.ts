// Helper to detect if we're in a build environment
export function isBuildTime(): boolean {
  // Check various build-time indicators
  return (
    process.env.NODE_ENV === 'production' && 
    (
      process.env.NEXT_PHASE === 'phase-production-build' ||
      process.env.BUILD_ID !== undefined ||
      process.env.npm_lifecycle_event === 'build' ||
      !process.env.VERCEL_URL // Not in runtime environment
    )
  );
}

// Helper to check if Google Sheets should be available
export function shouldSkipGoogleSheets(): boolean {
  const missingCredentials = !process.env.GOOGLE_CLIENT_EMAIL || 
                           !process.env.GOOGLE_PRIVATE_KEY || 
                           !process.env.GOOGLE_SHEET_ID;
  
  return isBuildTime() || missingCredentials;
}
