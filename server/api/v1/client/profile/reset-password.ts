import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError } from "~/helpers/api";
import { useHash } from "~/helpers/hash";

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
      password: "string|min:8|max:255",
      confirmPassword: { type: "equal", field: "password" },
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // hash password
  const hashedPassword = await useHash(body.password);

  // update user
  const updatedUser = await prisma.user.update({
    where: {
      id: (req as any).user.id,
    },
    data: {
      password: hashedPassword,
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

export default withHTTPMethod({ onPUT });
