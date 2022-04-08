import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { useQuery, useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError, usePaginate, useIdentifier } from "~/helpers/api";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  // define custom db query
  let where = {};

  // verify pagination cursor
  const { skip, take } = await usePaginate(event);

  // verify identifier
  const id = await useIdentifier(event);

  // verify status and level query
  const param = await useQuery(event);
  (where as any).level = "GUARD";
  if (
    param &&
    param.status &&
    (String(param.status).toUpperCase() === "OPEN" ||
      String(param.status).toUpperCase() === "ACCEPTED" ||
      String(param.status).toUpperCase() === "CLOSED")
  )
    (where as any).status = String(param.status).toUpperCase();

  // return singular data
  if (id > 0) {
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
    return report;
  }

  // return collection data
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
  if (body.status !== "DONE" && body.status !== "CLOSED") {
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

  // verify report level
  if (report.level === "CLIENT") {
    event.res.statusCode = 400;
    return event.res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Unsupported report level.",
      })
    );
  }

  // verify report status
  if (report.status !== "ACCEPTED") {
    event.res.statusCode = 400;
    return event.res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "The requested report status has not been accepted before.",
      })
    );
  }

  // update data
  const updatedReport = await prisma.report.update({
    where: {
      id,
    },
    data: {
      status: body.status.toUpperCase(),
      message: body.message,
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
