import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError } from "~/helpers/api";
import { useHash } from "~/helpers/hash";

async function onPUT(event: CompatibilityEvent, prisma: PrismaClient) {
  // verify request body
  const body = await useBody(event);
  const validation = useValidator({
    body,
    rules: {
      password: "string|min:8|max:255",
      confirmPassword: { type: "equal", field: "password" },
    },
  });
  if (validation !== true) return handleValidation(event, validation);

  // hash password
  const hashedPassword = await useHash(body.password);

  // update user
  const updatedUser = await prisma.user.update({
    where: {
      id: (event.req as any).user.id,
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
    event.res.statusCode = 200;
    return event.res.end(
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
  return handleServerError(event);
}

export default withHTTPMethod({ onPUT });
