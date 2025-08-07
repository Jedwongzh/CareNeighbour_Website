declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GA4_ID: string;
    }
  }
}

export {};