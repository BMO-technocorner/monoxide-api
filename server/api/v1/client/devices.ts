import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useQuery } from "h3";
import { withHTTPMethod } from "~/helpers/http";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // validate request param
  const param = await useQuery(req);

  // validate pagination cursor
  let skip = 0;
  let take = 15;
  if (param) {
    if (param.cursor) {
      try {
        skip = parseInt(String(param.skip));
      } catch (e) {}
    }
    if (param.take) {
      try {
        take = parseInt(String(param.take));
      } catch (e) {}
    }
  }

  // return data
  return await prisma.device.findMany({
    skip,
    take,
    where: {
      // @ts-ignore
      ownerId: req.user.id,
    },
  });
}

export default withHTTPMethod({ onGET });
