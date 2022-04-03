import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";
import { PAGINATION_AMOUNT } from "~/config/prisma";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      devices: true,
      rooms: true,
      reports: true,
    },
    take: PAGINATION_AMOUNT,
  });
}

export default withHTTPMethod({ onGET });
