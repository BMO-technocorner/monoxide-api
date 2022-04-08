import type { CompatibilityEvent } from "h3";
import { useTokenPayloadID } from "~/helpers/jwt";
import { usePrisma } from "~/helpers/prisma";
import { matchPath } from "~/helpers/api";

export const privateClientApiPath = ["client/"];

export const privateGuardApiPath = ["guard/"];

export const privateDeviceApiPath = ["device/"];

export const isClient = (user: any): boolean => {
  return user && user.role === "CLIENT";
};

export const isGuard = (user: any): boolean => {
  return user && user.role === "GUARD";
};

export default async (event: CompatibilityEvent) => {
  // allow authentication on api endpoints
  if (
    event.req.url &&
    !event.req.url.includes("/api/") &&
    !event.req.url.includes("/v1/")
  )
    return;

  // match private api only
  if (
    !matchPath(
      privateClientApiPath
        .concat(privateGuardApiPath)
        .concat(privateDeviceApiPath),
      String(event.req.url)
    )
  ) {
    return;
  }

  // verify device key (device endpoint)
  if (matchPath(privateDeviceApiPath, String(event.req.url))) {
    if (
      !event.req.headers["device-key"] ||
      event.req.headers["device-key"] === ""
    ) {
      event.res.statusCode = 401;
      return event.res.end(
        JSON.stringify({
          statusCode: 401,
          statusMessage: "Unauthorized",
          message: "Invalid device key.",
        })
      );
    }
    return;
  }

  // verify bearer token (client / guard endpoint)
  if (
    event.req.headers["authorization"] &&
    event.req.headers["authorization"].startsWith("Bearer")
  ) {
    try {
      const token = event.req.headers["authorization"].split(" ")[1];
      const id = parseInt(useTokenPayloadID(token));
      const prisma = usePrisma();
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (user) {
        // verify role authorization
        if (
          (matchPath(privateClientApiPath, String(event.req.url)) &&
            !isClient(user)) ||
          (matchPath(privateGuardApiPath, String(event.req.url)) &&
            !isGuard(user))
        ) {
          event.res.statusCode = 401;
          return event.res.end(
            JSON.stringify({
              statusCode: 401,
              statusMessage: "Unauthorized",
              message: "Insufficient role authorization.",
            })
          );
        }

        // save user data in request object
        (event.req as any).user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        };
      }
      return;
    } catch (e) {}
  }
  event.res.statusCode = 401;
  return event.res.end(
    JSON.stringify({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid authentication token.",
    })
  );
};
