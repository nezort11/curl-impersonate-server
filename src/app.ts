import express from "express";
import { PORT } from "./env";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/hello", (req, res) => {
  var ip = req.headers["x-forwarded-for"];
  console.log(`Request from ${ip}`);
  return res.send("Hello!");
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
