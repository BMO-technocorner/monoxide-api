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
  // validate pagination cursor
  const { skip, take } = await usePaginate(req);

  // return data
  return await prisma.device.findMany({
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
      room: true,
      deviceSync: true,
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
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
      roomId: "number|integer|positive",
      uid: "string|min:36|max:255",
      name: "string|min:2|max:255",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // verify device uid
  const deviceSync = await prisma.deviceSync.findUnique({
    where: {
      uid: body.uid,
    },
  });
  if (!deviceSync) {
    res.statusCode = 404;
    return res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "The given device uid is not registered.",
      })
    );
  }

  // verify room id
  const room = await prisma.room.findUnique({
    where: {
      belongsTo: {
        ownerId: (req as any).user.id,
        id: parseInt(body.roomId),
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

  // save device
  const device = await prisma.device.create({
    data: {
      ownerId: (req as any).user.id,
      roomId: room.id,
      deviceSyncId: deviceSync.id,
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
      room: true,
      deviceSync: true,
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
    },
  });

  // return data
  if (device) {
    res.statusCode = 201;
    return res.end(
      JSON.stringify({
        id: device.id,
        name: device.name,
        createdAt: device.createdAt,
        updatedAt: device.updatedAt,
        deviceSync: device.deviceSync,
        owner: device.owner,
        room: device.room,
        reports: device.reports,
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
  // validate request body
  const body = await useBody(req);
  const validation = useValidator({
    body,
    rules: {
      roomId: "number|integer|positive",
      name: "string|min:2|max:255",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // validate request param identifier
  const id = await useIdentifier(req);

  // verify device id
  const device = await prisma.device.findUnique({
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
      room: true,
      deviceSync: true,
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
    },
  });
  if (!device) {
    res.statusCode = 404;
    return res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "There is no device with this identifier.",
      })
    );
  }

  // verify room id
  const room = await prisma.room.findUnique({
    where: {
      belongsTo: {
        ownerId: (req as any).user.id,
        id: parseInt(body.roomId),
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

  // update device
  const updatedDevice = await prisma.device.update({
    where: {
      belongsTo: {
        ownerId: (req as any).user.id,
        id,
      },
    },
    data: {
      roomId: room.id,
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
      room: true,
      deviceSync: true,
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
    },
  });

  // return data
  if (updatedDevice) {
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        id: updatedDevice.id,
        name: updatedDevice.name,
        createdAt: updatedDevice.createdAt,
        updatedAt: updatedDevice.updatedAt,
        owner: updatedDevice.owner,
        room: updatedDevice.room,
        reports: updatedDevice.reports,
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
  // validate request param identifier
  const id = await useIdentifier(req);

  // verify device id
  const device = await prisma.device.findUnique({
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
      room: true,
      deviceSync: true,
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
    },
  });
  if (!device) {
    res.statusCode = 404;
    return res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "There is no device with this identifier.",
      })
    );
  }

  // delete device
  const deletedDevice = await prisma.device.delete({
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
      room: true,
      deviceSync: true,
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
    },
  });

  // return data
  if (deletedDevice) {
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        message: `${deletedDevice.name} has been successfully deleted.`,
        data: {
          id: deletedDevice.id,
          name: deletedDevice.name,
          createdAt: deletedDevice.createdAt,
          updatedAt: deletedDevice.updatedAt,
          owner: deletedDevice.owner,
          room: deletedDevice.room,
          reports: deletedDevice.reports,
        },
      })
    );
  }

  // handle error
  return handleServerError(res);
}

export default withHTTPMethod({ onGET, onPOST, onPUT, onDELETE });
