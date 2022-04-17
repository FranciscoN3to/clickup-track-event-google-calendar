declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      PROJECT_ID: string;
      AUTH_URI: string;
      TOKEN_URI: string;
      AUTH_PROVIDER_X509_CERT_URL: string;
      CLIENT_SECRET: string;
      REFRESH_TOKEN: string;
      GOOGLE_API_URL: string;
      CALENDAR_ID: string;
      CLICKUP_API_URL: string;
      CLICKUP_TOKEN: string;
      CLICKUP_TEAM_Id: string;
      CLICKUP_USER_ID: string;
    }
  }
}

export {}
