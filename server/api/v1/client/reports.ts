import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";
import { PAGINATION_AMOUNT } from "~/config/prisma";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  return await prisma.report.findMany({
    take: PAGINATION_AMOUNT,
  });
}

export default withHTTPMethod({ onGET });
