import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { useHash } from "~/helpers/hash";

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
      email: "email|normalize|max:255",
      password: "string|min:8|max:255",
      name: "string|min:2|max:255",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // check if email exist
  const emailExist = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (emailExist) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "The requested email is already registered.",
      })
    );
  }

  // hash password
  const hashesPassword = await useHash(body.password);

  // save new user
  const user = await prisma.user.create({
    data: {
      name: String(body.name),
      email: String(body.email).toLowerCase(),
      password: String(hashesPassword),
    },
  });
  if (user) {
    res.statusCode = 201;
    return res.end(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      })
    );
  }
  res.statusCode = 500;
  return res.end(
    JSON.stringify({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Unknown error happened. Please try again later.",
    })
  );
}

export default withHTTPMethod({ onPOST });
