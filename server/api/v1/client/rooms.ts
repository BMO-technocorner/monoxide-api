import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useQuery, useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError, usePaginate } from "~/helpers/api";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // validate pagination cursor
  const { skip, take } = await usePaginate(req);

  // return data
  return await prisma.room.findMany({
    skip,
    take,
    where: {
      // @ts-ignore
      ownerId: req.user.id,
    },
  });
}

async function onPOST(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // validate request body
  const body = await useBody(req);
  const validation = useValidator({
    body,
    rules: {
      name: "string|min:2|max:255",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // save new room
  const room = await prisma.room.create({
    data: {
      // @ts-ignore
      ownerId: req.user.id,
      name: body.name,
    },
    include: {
      owner: true,
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
  // validate request param
  const param = await useQuery(req);

  // validate request body
  const body = await useBody(req);
  const validation = useValidator({
    body,
    rules: {
      name: "string|min:2|max:255",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // check if room exist
  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(String(param.id) ?? 0),
    },
    include: {
      owner: true,
    },
  });

  // verify room registered
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

  // verify room owner
  // @ts-ignore
  if (room.ownerId !== req.user.id) {
    res.statusCode = 401;
    return res.end(
      JSON.stringify({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "The user is not authorized to update the requested room.",
      })
    );
  }

  // update data
  const updatedRoom = await prisma.room.update({
    where: {
      id: room.id,
    },
    data: {
      name: body.name,
    },
    include: {
      owner: true,
    },
  });

  // return data
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

async function onDELETE(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // validate request param
  const param = await useQuery(req);

  // check if room exist
  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(String(param.id) ?? 0),
    },
    include: {
      owner: true,
    },
  });

  // verify room registered
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

  // verify room owner
  // @ts-ignore
  if (room.ownerId !== req.user.id) {
    res.statusCode = 401;
    return res.end(
      JSON.stringify({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "The user is not authorized to delete the requested room.",
      })
    );
  }

  const deletedRoom = await prisma.room.delete({
    where: {
      id: room.id,
    },
    include: {
      owner: true,
    },
  });

  // return data
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

export default withHTTPMethod({ onGET, onPOST, onPUT, onDELETE });
