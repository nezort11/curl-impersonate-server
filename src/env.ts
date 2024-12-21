import dotenv from "dotenv";

export const NODE_ENV = process.env.NODE_ENV;
console.log("NODE_ENV", NODE_ENV);
export const IS_PRODUCTION = process.env.NODE_ENV !== "development";

// ensure env is loaded once (prevent duplicate loading)
// otherwise loaded directly by docker env/env_file or serverless environment/etc.
if (!process.env.ENV_FILE_LOADED) {
  // const dotenv = await import("dotenv/lib/main"); // this produces ERROR cuz of dotenv package.json exports field
  // const dotenv = await import("dotenv"); // required ESNext module which breaks a lot
  dotenv.config({ path: "./.env" }); // mutates process.env from .env
}

export const DEBUG_ENV = process.env.DEBUG_ENV === "true";
console.log("DEBUG_ENV", DEBUG_ENV);

export const PORT = process.env.PORT;
