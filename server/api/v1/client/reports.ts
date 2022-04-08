import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { useQuery, useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError, usePaginate, useIdentifier } from "~/helpers/api";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  // define custom db query
  let where = {
    device: {
      ownerId: (event.req as any).user.id,
    },
  };

  // verify pagination cursor
  const { skip, take } = await usePaginate(event);

  // verify status and level query
  const param = await useQuery(event);
  if (
    param &&
    param.status &&
    (String(param.status).toUpperCase() === "OPEN" ||
      String(param.status).toUpperCase() === "ACCEPTED" ||
      String(param.status).toUpperCase() === "CLOSED")
  )
    (where as any).status = String(param.status).toUpperCase();
  if (
    param &&
    param.level &&
    (String(param.level).toUpperCase() === "CLIENT" ||
      String(param.level).toUpperCase() === "GUARD")
  )
    (where as any).level = String(param.level).toUpperCase();

  // return data
  return await prisma.report.findMany({
    skip,
    take,
    where,
    orderBy: [{ id: "desc" }],
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
}

async function onPUT(event: CompatibilityEvent, prisma: PrismaClient) {
  // verify request body
  const body = await useBody(event);
  const validation = useValidator({
    body,
    rules: {
      status: "string|min:4|max:255",
      message: "string|optional",
    },
  });
  if (validation !== true) return handleValidation(event, validation);

  // verify status variant
  if (body.status !== "ACCEPTED" && body.status !== "CLOSED") {
    event.res.statusCode = 400;
    return event.res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Unsupported status variant.",
      })
    );
  }

  // get request param identifier
  const id = await useIdentifier(event);

  // verify report id
  const report = await prisma.report.findUnique({
    where: {
      belongsTo: {
        ownerId: (event.req as any).user.id,
        id,
      },
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
  if (!report) {
    event.res.statusCode = 404;
    return event.res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "There is no report with this identifier.",
      })
    );
  }

  // verify report status
  if (report.status !== "OPEN") {
    event.res.statusCode = 400;
    return event.res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "The requested report status has been updated before.",
      })
    );
  }

  // update data
  const updatedReport = await prisma.report.update({
    where: {
      belongsTo: {
        ownerId: (event.req as any).user.id,
        id,
      },
    },
    data: {
      status: body.status.toUpperCase(),
      message: body.message,
      level: body.status.toUpperCase() === "ACCEPTED" ? "GUARD" : "CLIENT",
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
  if (updatedReport) {
    event.res.statusCode = 200;
    return event.res.end(
      JSON.stringify({
        id: updatedReport.id,
        message: updatedReport.message,
        status: updatedReport.status,
        level: updatedReport.level,
        createdAt: updatedReport.createdAt,
        updatedAt: updatedReport.updatedAt,
        owner: updatedReport.owner,
        device: updatedReport.device,
      })
    );
  }

  // handle error
  return handleServerError(event);
}

export default withHTTPMethod({ onGET, onPUT });
