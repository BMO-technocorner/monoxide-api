import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { useHash } from "~/helpers/hash";
import { handleServerError } from "~/helpers/api";

async function onPOST(event: CompatibilityEvent, prisma: PrismaClient) {
  // verify request body
  const body = await useBody(event);
  const validation = useValidator({
    body,
    rules: {
      email: "email|normalize|max:255",
      password: "string|min:8|max:255",
      name: "string|min:2|max:255",
      address: "string",
    },
  });
  if (validation !== true) return handleValidation(event, validation);

  // check if email exist
  const emailExist = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (emailExist) {
    event.res.statusCode = 400;
    return event.res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "The requested email is already registered.",
      })
    );
  }

  // hash password
  const hashedPassword = await useHash(body.password);

  // save new user
  const user = await prisma.user.create({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      address: true,
      updatedAt: true,
      createdAt: true,
    },
    data: {
      email: String(body.email).toLowerCase(),
      password: String(hashedPassword),
      name: String(body.name),
      address: String(body.address),
    },
  });

  // return data
  if (user) {
    event.res.statusCode = 201;
    return event.res.end(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      })
    );
  }

  // handle error
  return handleServerError(event);
}

export default withHTTPMethod({ onPOST });
