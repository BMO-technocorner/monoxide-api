import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { withHTTPMethod } from "~/helpers/http";
import { handleServerError } from "~/helpers/api";

async function onPOST(event: CompatibilityEvent, prisma: PrismaClient) {
  // verify device key
  const uid = String(event.req.headers["device-key"]);
  if (uid !== process.env.DEVICE_KEY) {
    event.res.statusCode = 401;
    return event.res.end(
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
    event.res.statusCode = 200;
    return event.res.end(
      JSON.stringify({
        message: "Device has been successfully synchronized.",
        sync: sync,
      })
    );
  }

  // handle error
  return handleServerError(event);
}

export default withHTTPMethod({ onPOST });
