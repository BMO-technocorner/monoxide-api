import type { IncomingMessage, ServerResponse } from "http";
import { isMethod } from "h3";

export default async (req: IncomingMessage, res: ServerResponse) => {
  // allow CORS protocol on api endpoints
  if (req.url && !req.url.includes("v1")) return;

  // set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Methods, Access-Control-Allow-Headers, X-Frame-Options, X-Requested-With, Origin, Content-Type, Accept, Api-Key, Device-Key, Authorization"
  );
  res.setHeader("X-Frame-Options", "ALLOWALL");

  // allow CORS preflight
  if (isMethod(req, "OPTIONS")) {
    res.statusCode = 200;
    return res.end();
  }
};
