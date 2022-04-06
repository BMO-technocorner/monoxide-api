import type { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
  // allow authorization on api endpoints
  if (req.url && !req.url.includes("/api/") && !req.url.includes("/v1/"))
    return;

  if (req.headers["api-key"] === process.env.API_KEY) return;
  res.statusCode = 401;
  return res.end(
    JSON.stringify({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid API Key.",
    })
  );
};
