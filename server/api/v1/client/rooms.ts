import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError, usePaginate, useIdentifier } from "~/helpers/api";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // verify pagination cursor
  const { skip, take } = await usePaginate(req);

  // return data
  return await prisma.room.findMany({
    skip,
    take,
    where: {
      ownerId: (req as any).user.id,
    },
    orderBy: [{ name: "asc" }],
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });
}

async function onPOST(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // verify request body
  const body = await useBody(req);
  const validation = useValidator({
    body,
    rules: {
      name: "string|min:2|max:255",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // save room
  const room = await prisma.room.create({
    data: {
      ownerId: (req as any).user.id,
      name: body.name,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });

  // return data
  if (room) {
    res.statusCode = 201;
    return res.end(
      JSON.stringify({
        id: room.id,
        name: room.name,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
        owner: room.owner,
      })
    );
  }

  // handle error
  return handleServerError(res);
}

async function onPUT(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // verify request body
  const body = await useBody(req);
  const validation = useValidator({
    body,
    rules: {
      name: "string|min:2|max:255",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // get request param identifier
  const id = await useIdentifier(req);

  // verify room id
  const room = await prisma.room.findUnique({
    where: {
      belongsTo: {
        ownerId: (req as any).user.id,
        id,
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });
  if (!room) {
    res.statusCode = 404;
    return res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "There is no room with this identifier.",
      })
    );
  }

  // update data
  const updatedRoom = await prisma.room.update({
    where: {
      belongsTo: {
        ownerId: (req as any).user.id,
        id,
      },
    },
    data: {
      name: body.name,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });

  // return data
  if (updatedRoom) {
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        id: updatedRoom.id,
        name: updatedRoom.name,
        createdAt: updatedRoom.createdAt,
        updatedAt: updatedRoom.updatedAt,
        owner: updatedRoom.owner,
      })
    );
  }

  // handle error
  return handleServerError(res);
}

async function onDELETE(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // get request param identifier
  const id = await useIdentifier(req);

  // verify room id
  const room = await prisma.room.findUnique({
    where: {
      belongsTo: {
        ownerId: (req as any).user.id,
        id,
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });
  if (!room) {
    res.statusCode = 404;
    return res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "There is no room with this identifier.",
      })
    );
  }

  // delete room
  const deletedRoom = await prisma.room.delete({
    where: {
      belongsTo: {
        ownerId: (req as any).user.id,
        id,
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });

  // return data
  if (deletedRoom) {
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        message: `${deletedRoom.name} has been successfully deleted.`,
        data: {
          id: deletedRoom.id,
          name: deletedRoom.name,
          createdAt: deletedRoom.createdAt,
          updatedAt: deletedRoom.updatedAt,
          owner: deletedRoom.owner,
        },
      })
    );
  }

  // handle error
  return handleServerError(res);
}

export default withHTTPMethod({ onGET, onPOST, onPUT, onDELETE });
