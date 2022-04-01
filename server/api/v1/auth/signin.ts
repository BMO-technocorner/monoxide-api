import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useCompare } from "~/helpers/hash";
import { useToken, useTokenExpiry } from "~/helpers/jwt";

async function onPOST(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // check if user exist
  const body = await useBody(req);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "This account is not registered.",
      })
    );
  }

  // verify password
  if (!(await useCompare(body.password, user.password))) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "The given credential is invalid, please check again.",
      })
    );
  }

  // return user data and token
  res.statusCode = 200;
  return res.end(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      token: useToken(user.id),
      tokenExpiredIn: useTokenExpiry(),
    })
  );
}

export default withHTTPMethod({ onPOST });
