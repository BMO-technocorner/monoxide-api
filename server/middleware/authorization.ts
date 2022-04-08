import type { CompatibilityEvent } from "h3";

export default async (event: CompatibilityEvent) => {
  // allow authorization on api endpoints
  if (
    event.req.url &&
    !event.req.url.includes("/api/") &&
    !event.req.url.includes("/v1/")
  )
    return;

  if (event.req.headers["api-key"] === process.env.API_KEY) return;
  event.res.statusCode = 401;
  return event.res.end(
    JSON.stringify({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid API Key.",
    })
  );
};
