export const DEBUG_ENV = process.env.DEBUG_ENV;
console.log("DEBUG_ENV", DEBUG_ENV);
export const NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV", NODE_ENV);
export const IS_PRODUCTION = process.env.NODE_ENV !== "development";

// otherwise loaded directly by docker env/env_file
if (DEBUG_ENV) {
  const dotenv = await import("dotenv/lib/main");
  dotenv.config({ path: "./.env" }); // mutates process.env from .env
}

export const PORT = process.env.PORT;
