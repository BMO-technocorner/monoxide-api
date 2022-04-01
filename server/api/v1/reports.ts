import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  return await prisma.device.findMany({
    take: 20,
  });
}

export default withHTTPMethod({ onGET });
