import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useCompare } from "~/helpers/hash";
import { useToken, useTokenExpiry } from "~/helpers/jwt";

async function onPOST(event: CompatibilityEvent, prisma: PrismaClient) {
  // check if user exist
  const body = await useBody(event);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  // verify account registered
  if (!user) {
    event.res.statusCode = 400;
    return event.res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "This account is not registered.",
      })
    );
  }

  // verify password
  if (!(await useCompare(body.password, user.password))) {
    event.res.statusCode = 400;
    return event.res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "The given credential is invalid, please check again.",
      })
    );
  }

  // return user data and token
  event.res.statusCode = 200;
  return event.res.end(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      token: useToken(user.id),
      tokenExpiredIn: useTokenExpiry(),
    })
  );
}

export default withHTTPMethod({ onPOST });
