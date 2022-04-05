import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError } from "~/helpers/api";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  return (req as any).user;
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
      email: "email|normalize|max:255",
      name: "string|min:2|max:255",
      address: "string",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // verify email is unique
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (existingUser && existingUser.id !== (req as any).user.id) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "The requested email is already registered.",
      })
    );
  }

  // update user
  const updatedUser = await prisma.user.update({
    where: {
      id: (req as any).user.id,
    },
    data: {
      email: body.email,
      name: body.name,
      address: body.address,
    },
    include: {
      devices: true,
      rooms: true,
      reports: {
        take: 5,
        orderBy: [{ id: "desc" }],
      },
    },
  });

  // return data
  if (updatedUser) {
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        address: updatedUser.address,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        devices: updatedUser.devices,
        rooms: updatedUser.rooms,
        reports: updatedUser.reports,
      })
    );
  }

  // handle error
  return handleServerError(res);
}

export default withHTTPMethod({ onGET, onPUT });
