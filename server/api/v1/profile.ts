import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // @ts-ignore
  return req.user ?? {};
}

export default withHTTPMethod({ onGET });
