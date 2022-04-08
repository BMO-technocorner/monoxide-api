import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";
import { usePaginate } from "~/helpers/api";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  // verify pagination cursor
  const { skip, take } = await usePaginate(event);

  // return data
  return await prisma.user.findMany({
    skip,
    take,
    where: {
      role: "CLIENT",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      address: true,
      updatedAt: true,
      createdAt: true,
      devices: {
        orderBy: [{ name: "asc" }],
      },
      rooms: {
        orderBy: [{ name: "asc" }],
      },
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
    },
  });
}

export default withHTTPMethod({ onGET });
