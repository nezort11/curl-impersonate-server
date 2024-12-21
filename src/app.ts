import express from "express";
import { Curl } from "curl-wrap";
import { DEBUG_ENV, PORT } from "./env";

import getRawBody from "raw-body";

// https://github.com/TypeStrong/ts-node/discussions/1290
const dynamicImport = new Function("specifier", "return import(specifier)") as <
  T
>(
  module: string
) => Promise<T>;

export const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(async (req, res) => {
  try {
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

    const body = await getRawBody(req);
    const bodyStr = body.toString();

    curl
      .impersonate("chrome")
      .method(req.method)
      .body(bodyStr)
      .followRedirect(false)
      .maxRedirects(5)
      .timeout(30)
      .url(targetUrl);

    const contentType = req.headers["content-type"];
    if (contentType) {
      curl.header("content-type", contentType);
    }

    const response = await curl.fetch();
    console.log("response status code:", response.status);
    console.log("response headers:", JSON.stringify(response.headers));

    res.status(response.statusCode);

    const SKIP_HEADER_LIST = ["accept-encoding", "content-encoding", "vary"];
    Object.entries(response.headers).forEach(([key, value]) => {
      if (!SKIP_HEADER_LIST.includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    res.send(response.body);
  } catch (error) {
    console.error(error);

    const { serializeError } = await dynamicImport<
      typeof import("serialize-error")
    >("serialize-error");
    const serializedError = serializeError(error);
    // https://docs.pynt.io/documentation/api-security-testing/pynt-security-tests-coverage/stack-trace-in-response
    if (!DEBUG_ENV) {
      delete serializedError.stack;
    }
    res.status(500).json(serializedError);
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
