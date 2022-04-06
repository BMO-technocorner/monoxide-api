import type { IncomingMessage, ServerResponse } from "http";
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

export default async (req: IncomingMessage, res: ServerResponse) => {
  // allow authentication on api endpoints
  if (req.url && !req.url.includes("/api/") && !req.url.includes("/v1/"))
    return;

  // match private api only
  if (
    !matchPath(
      privateClientApiPath
        .concat(privateGuardApiPath)
        .concat(privateDeviceApiPath),
      String(req.url)
    )
  ) {
    return;
  }

  // verify device key (device endpoint)
  if (matchPath(privateDeviceApiPath, String(req.url))) {
    if (!req.headers["device-key"] || req.headers["device-key"] === "") {
      res.statusCode = 401;
      return res.end(
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
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const id = parseInt(useTokenPayloadID(token));
      const prisma = usePrisma();
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (user) {
        // verify role authorization
        if (
          (matchPath(privateClientApiPath, String(req.url)) &&
            !isClient(user)) ||
          (matchPath(privateGuardApiPath, String(req.url)) && !isGuard(user))
        ) {
          res.statusCode = 401;
          return res.end(
            JSON.stringify({
              statusCode: 401,
              statusMessage: "Unauthorized",
              message: "Insufficient role authorization.",
            })
          );
        }

        // save user data in request object
        (req as any).user = {
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
  res.statusCode = 401;
  return res.end(
    JSON.stringify({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid authentication token.",
    })
  );
};
