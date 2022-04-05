import type { IncomingMessage, ServerResponse } from "http";
import { useTokenPayloadID } from "~/helpers/jwt";
import { usePrisma } from "~/helpers/prisma";
import { matchPath } from "~/helpers/api";

export const privateClientApiPath = ["client"];

export const privateGuardApiPath = ["guard"];

export const isClient = (user: any): boolean => {
  return user && user.role === "CLIENT";
};

export const isGuard = (user: any): boolean => {
  return user && user.role === "GUARD";
};

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (
    !matchPath(
      privateClientApiPath.concat(privateGuardApiPath),
      String(req.url)
    )
  ) {
    return;
  }
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
