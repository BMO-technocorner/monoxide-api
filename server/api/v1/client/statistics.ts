import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { Status, Level } from "~/helpers/prisma";
import { DateTime } from "luxon";
import { withHTTPMethod } from "~/helpers/http";

async function onGET(event: CompatibilityEvent, prisma: PrismaClient) {
  const acceptedReportTotal = await prisma.report.count({
    where: {
      ownerId: (event.req as any).user.id,
      status: Status.ACCEPTED,
    },
  });
  const reportTotal = await prisma.report.count({
    where: {
      ownerId: (event.req as any).user.id,
    },
  });
  event.res.statusCode = 200;
  return event.res.end(
    JSON.stringify({
      room: {
        total: await prisma.room.count({
          where: {
            ownerId: (event.req as any).user.id,
          },
        }),
      },
      device: {
        total: await prisma.device.count({
          where: {
            ownerId: (event.req as any).user.id,
          },
        }),
        onlineCount: await prisma.device.count({
          where: {
            ownerId: (event.req as any).user.id,
            deviceSync: {
              updatedAt: {
                gte: DateTime.now()
                  .setZone("Asia/Jakarta")
                  .minus({
                    minutes: 5,
                  })
                  .toJSDate(),
              },
            },
          },
        }),
      },
      report: {
        currentMonthTotal: await prisma.report.count({
          where: {
            ownerId: (event.req as any).user.id,
            createdAt: {
              gte: DateTime.now().startOf("month").toJSDate(),
            },
          },
        }),
        lastMonthTotal: await prisma.report.count({
          where: {
            ownerId: (event.req as any).user.id,
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
              ownerId: (event.req as any).user.id,
              status: Status.OPEN,
              level: Level.CLIENT,
            },
          }),
          acceptedTotal: acceptedReportTotal,
          closedTotal: await prisma.report.count({
            where: {
              ownerId: (event.req as any).user.id,
              status: Status.CLOSED,
              level: Level.CLIENT,
            },
          }),
          percentage: `${(acceptedReportTotal / reportTotal || 0) * 100}%`,
        },
      },
    })
  );
}

export default withHTTPMethod({ onGET });
