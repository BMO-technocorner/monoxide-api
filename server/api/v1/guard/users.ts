import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { Role } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";
import { usePaginate, useIdentifier } from "~/helpers/api";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  // verify pagination cursor
  const { skip, take } = await usePaginate(event);

  // verifier identifier
  const id = await useIdentifier(event);

  // return singular data
  if (id > 0) {
    const user = await prisma.user.findUnique({
      where: {
        belongsToRole: {
          role: Role.CLIENT,
          id,
        },
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
    if (!user) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({
          statusCode: 404,
          statusMessage: "Not Found",
          message: "There is no user with this identifier.",
        })
      );
    }
    return user;
  }

  // return collection data
  return await prisma.user.findMany({
    skip,
    take,
    where: {
      role: Role.CLIENT,
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
