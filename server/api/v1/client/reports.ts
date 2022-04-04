import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";
import { usePaginate } from "~/helpers/api";
import { useQuery } from "h3";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // define custom db query
  let where = {
    device: {
      // @ts-ignore
      ownerId: req.user.id,
    },
  };

  // validate pagination cursor
  const { skip, take } = await usePaginate(req);

  // validate status and level query
  const param = await useQuery(req);
  // @ts-ignore
  if (param && param.level) where.level = String(param.level).toUpperCase();
  // @ts-ignore
  if (param && param.status) where.status = String(param.status).toUpperCase();

  // return data
  return await prisma.report.findMany({
    skip,
    take,
    where,
    orderBy: [{ id: "desc" }],
    include: {
      device: {
        include: {
          owner: {
            select: {
              password: false,
            },
          },
        },
      },
    },
  });
}

export default withHTTPMethod({ onGET });
