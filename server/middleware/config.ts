import type { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
  // set default response headers
  res.setHeader("Access-Control-Allow-Origin", "*");
};
