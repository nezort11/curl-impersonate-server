export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV_FILE_LOADED: "true" | undefined;

      NODE_ENV: "development" | "production";
      DEBUG: "*";
      DEBUG_ENV: "true" | undefined;
    }
  }
}
