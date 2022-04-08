import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError, useIdentifier } from "~/helpers/api";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  // get request param identifier
  const id = await useIdentifier(event);

  // verify report id
  const report = await prisma.report.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
      device: true,
    },
  });

  // return data
  if (report) {
    event.res.statusCode = 200;
    return event.res.end(
      JSON.stringify({
        id: report.id,
        message: report.message,
        status: report.status,
        level: report.level,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        owner: report.owner,
        device: report.device,
      })
    );
  }

  // handle error
  event.res.statusCode = 404;
  return event.res.end(
    JSON.stringify({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "There is no report with this identifier.",
    })
  );
}

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

  // verify request body
  const body = await useBody(event);
  const validation = useValidator({
    body,
    rules: {
      detectionLevel: "number|min:1|max:2",
    },
  });
  if (validation !== true) return handleValidation(event, validation);

  // verify device
  const sync = await prisma.deviceSync.findUnique({
    where: {
      uid,
    },
    include: {
      device: {
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              address: true,
              updatedAt: true,
              createdAt: true,
            },
          },
        },
      },
    },
  });
  if (!sync || !sync.device || !sync.device.owner || (sync && !sync.device)) {
    event.res.statusCode = 404;
    return event.res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "The device is not registered.",
      })
    );
  }

  // define custom data
  const data = {
    ownerId: sync.device.owner.id,
    deviceId: sync.device.id,
  };

  // verify detection level
  switch (body.detectionLevel) {
    case 2:
      (data as any).detectionLevel = "HIGH";
      break;
    default:
      (data as any).detectionLevel = "LOW";
      break;
  }

  // save report
  const report = await prisma.report.create({
    data,
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
          updatedAt: true,
          createdAt: true,
        },
      },
      device: true,
    },
  });

  // return data
  if (report) {
    event.res.statusCode = 200;
    return event.res.end(
      JSON.stringify({
        id: report.id,
        message: report.message,
        status: report.status,
        level: report.level,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        owner: report.owner,
        device: report.device,
      })
    );
  }

  // handle error
  return handleServerError(event);
}

export default withHTTPMethod({ onGET, onPOST });
