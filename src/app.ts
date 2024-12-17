import express from "express";
// @ts-expect-error no types
import { Curl } from "curl-wrap";
import { PORT } from "./env";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/hello", async (req, res) => {
  var ip = req.headers["x-forwarded-for"];
  console.log(`Request from ${ip}`);

  const curl = new Curl();
  const response = await curl
    .impersonate("chrome")
    .url("https://www.euroricambigroup.com/en");
  console.log(response.statusCode);
  return res.send(`Hello2! - ${response.statusCode}`);
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
