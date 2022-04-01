import type { IncomingMessage, ServerResponse } from "http";
import { useTokenPayloadID } from "~/helpers/jwt";
import { usePrisma } from "~/helpers/prisma";

export const privateApiPath = ["devices", "profile", "reports", "users"];

export const matchPrivateApiPath = (target: string): boolean => {
  for (let pattern of privateApiPath) if (target.includes(pattern)) return true;
  return false;
};

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (!matchPrivateApiPath(String(req.url))) return;
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
        // @ts-ignore
        req.user = {
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
