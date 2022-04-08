import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError } from "~/helpers/api";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  return (event.req as any).user;
}

async function onPUT(event: CompatibilityEvent, prisma: PrismaClient) {
  // verify request body
  const body = await useBody(event);
  const validation = useValidator({
    body,
    rules: {
      email: "email|normalize|max:255",
      name: "string|min:2|max:255",
      address: "string",
    },
  });
  if (validation !== true) return handleValidation(event, validation);

  // verify email is unique
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (existingUser && existingUser.id !== (event.req as any).user.id) {
    event.res.statusCode = 400;
    return event.res.end(
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
      id: (event.req as any).user.id,
    },
    data: {
      email: body.email,
      name: body.name,
      address: body.address,
    },
  });

  // return data
  if (updatedUser) {
    event.res.statusCode = 200;
    return event.res.end(
      JSON.stringify({
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        address: updatedUser.address,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      })
    );
  }

  // handle error
  return handleServerError(event);
}

export default withHTTPMethod({ onGET, onPUT });
