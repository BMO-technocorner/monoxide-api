import type { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
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
