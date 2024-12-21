import express from "express";
import { Curl } from "curl-wrap";
import { PORT } from "./env";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res) => {
  var ip = req.headers["x-forwarded-for"];
  console.log(`Request from ${ip}`);

  if (req.originalUrl.length === 1) {
    return res.send(
      "Welcome to the curl-impersonate proxy! Put any URL you want to proxy with Chrome SSL certifications in path"
    );
  }

  const targetUrl = req.originalUrl.slice(1);
  console.log("target url", targetUrl);

  const curl = new Curl();
  const response = await curl
    .impersonate("chrome")
    .method(req.method)
    // .header("Accept", "application/json")
    // TODO: some how map req.headers into curl.header(...)
    .followRedirect(true)
    .maxRedirects(5)
    .timeout(30)
    .url(targetUrl);

  // TODO: map curl response headers to express response headers
  return res.status(response.statusCode).send(response.body);
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
