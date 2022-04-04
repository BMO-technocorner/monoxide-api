import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { useQuery, useBody } from "h3";
import { withHTTPMethod } from "~/helpers/http";
import { useValidator, handleValidation } from "~/helpers/validator";
import { handleServerError, usePaginate, useIdentifier } from "~/helpers/api";

async function onGET(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // define custom db query
  let where = {};

  // verify pagination cursor
  const { skip, take } = await usePaginate(req);

  // verify status and level query
  const param = await useQuery(req);
  (where as any).level = "GUARD";
  if (
    param &&
    param.status &&
    (String(param.status).toUpperCase() === "OPEN" ||
      String(param.status).toUpperCase() === "ACCEPTED" ||
      String(param.status).toUpperCase() === "CLOSED")
  )
    (where as any).status = String(param.status).toUpperCase();

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

async function onPUT(
  req: IncomingMessage,
  res: ServerResponse,
  prisma: PrismaClient
) {
  // verify request body
  const body = await useBody(req);
  const validation = useValidator({
    body,
    rules: {
      status: "string|min:4|max:255",
      message: "string|optional",
    },
  });
  if (validation !== true) return handleValidation(res, validation);

  // verify status variant
  if (body.status !== "DONE" && body.status !== "CLOSED") {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Unsupported status variant.",
      })
    );
  }

  // get request param identifier
  const id = await useIdentifier(req);

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
    res.statusCode = 404;
    return res.end(
      JSON.stringify({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "There is no report with this identifier.",
      })
    );
  }

  // verify report level
  if (report.level === "CLIENT") {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Unsupported report level.",
      })
    );
  }

  // verify report status
  if (report.status !== "ACCEPTED") {
    res.statusCode = 400;
    return res.end(
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
    res.statusCode = 200;
    return res.end(
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
  return handleServerError(res);
}

export default withHTTPMethod({ onGET, onPUT });
