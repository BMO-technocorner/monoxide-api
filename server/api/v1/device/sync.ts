import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";
import { handleServerError } from "~/helpers/api";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // verify device key
  const uid = String(req.headers["device-key"]);
  if (uid !== process.env.DEVICE_KEY) {
    res.statusCode = 401;
    return res.end(
      JSON.stringify({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Invalid device key.",
      })
    );
  }

  // save sync
  const sync = await prisma.deviceSync.upsert({
    where: {
      uid,
    },
    create: { uid },
    update: { uid },
  });

  // return data
  if (sync) {
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        message: "Device has been successfully synchronized.",
        sync: sync,
      })
    );
  }

  // handle error
  return handleServerError(res);
}

export default withHTTPMethod({ onGET });
