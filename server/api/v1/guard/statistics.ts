import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { Status, Level, Role } from "~/helpers/prisma";
import { DateTime } from "luxon";
import { withHTTPMethod } from "~/helpers/http";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  const doneReportTotal = await prisma.report.count({
    where: {
      level: Level.GUARD,
      status: Status.DONE,
    },
  });
  const reportTotal = await prisma.report.count({
    where: {
      level: Level.GUARD,
    },
  });
  event.res.statusCode = 200;
  return event.res.end(
    JSON.stringify({
      user: {
        guard: {
          total: await prisma.user.count({
            where: {
              role: Role.GUARD,
            },
          }),
        },
        client: {
          total: await prisma.user.count({
            where: {
              role: Role.CLIENT,
            },
          }),
        },
      },
      report: {
        currentMonthTotal: await prisma.report.count({
          where: {
            level: Level.GUARD,
            createdAt: {
              gte: DateTime.now().startOf("month").toJSDate(),
            },
          },
        }),
        lastMonthTotal: await prisma.report.count({
          where: {
            level: Level.GUARD,
            createdAt: {
              gte: DateTime.now()
                .setZone("Asia/Jakarta")
                .minus({
                  month: 1,
                })
                .toJSDate(),
              lt: DateTime.now().startOf("month").toJSDate(),
            },
          },
        }),
        performance: {
          total: reportTotal,
          openTotal: await prisma.report.count({
            where: {
              status: Status.OPEN,
              level: Level.GUARD,
            },
          }),
          doneTotal: doneReportTotal,
          closedTotal: await prisma.report.count({
            where: {
              status: Status.CLOSED,
              level: Level.GUARD,
            },
          }),
          percentage: `${(doneReportTotal / reportTotal || 0) * 100}%`,
        },
      },
    })
  );
}

export default withHTTPMethod({ onGET });
