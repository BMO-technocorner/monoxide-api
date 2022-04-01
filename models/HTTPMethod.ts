import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";

export default class HTTPMethod {
  onGET:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;

  onHEAD:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;

  onPOST:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;

  onPUT:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;

  onDELETE:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;

  onCONNECT:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;

  onOPTIONS:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;

  onTRACE:
    | null
    | ((
        req: IncomingMessage,
        res: ServerResponse,
        prisma: PrismaClient
      ) => Promise<any>) = null;
}
