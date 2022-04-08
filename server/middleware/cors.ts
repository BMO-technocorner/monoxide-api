import type { CompatibilityEvent } from "h3";
import { isMethod } from "h3";

export default async (event: CompatibilityEvent) => {
  // allow CORS protocol on api endpoints
  if (
    event.req.url &&
    !event.req.url.includes("/api/") &&
    !event.req.url.includes("/v1/")
  )
    return;

  // set security headers
  event.res.setHeader("X-Frame-Options", "DENY");
  event.res.setHeader("X-XSS-Protection", "1; mode=block");

  // set CORS headers
  event.res.setHeader("Access-Control-Allow-Origin", "*");
  event.res.setHeader("Access-Control-Allow-Credentials", "true");
  event.res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  event.res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Methods, Access-Control-Allow-Headers, X-Frame-Options, X-XSS-Protection, X-Requested-With, Origin, Content-Type, Accept, Api-Key, Device-Key, Authorization"
  );

  // allow CORS preflight
  if (isMethod(event.req, "OPTIONS")) {
    event.res.statusCode = 200;
    return event.res.end();
  }
};
