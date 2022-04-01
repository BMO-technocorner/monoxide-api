import type { IncomingMessage, ServerResponse } from "http";
import type { PrismaClient } from "~/helpers/prisma";
import { isMethod, createError } from "h3";

export default class HTTPAction {
  req: IncomingMessage;
  res: ServerResponse;
  prisma: PrismaClient;

  constructor(req: IncomingMessage, res: ServerResponse, prisma: PrismaClient) {
    this.req = req;
    this.res = res;
    this.prisma = prisma;
  }

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

  async perform() {
    if (this.onGET && isMethod(this.req, "GET"))
      return await this.onGET(this.req, this.res, this.prisma);
    if (this.onHEAD && isMethod(this.req, "HEAD"))
      return await this.onHEAD(this.req, this.res, this.prisma);
    if (this.onPOST && isMethod(this.req, "POST"))
      return await this.onPOST(this.req, this.res, this.prisma);
    if (this.onPUT && isMethod(this.req, "PUT"))
      return await this.onPUT(this.req, this.res, this.prisma);
    if (this.onDELETE && isMethod(this.req, "DELETE"))
      return await this.onDELETE(this.req, this.res, this.prisma);
    if (this.onCONNECT && isMethod(this.req, "CONNECT"))
      return await this.onCONNECT(this.req, this.res, this.prisma);
    if (this.onOPTIONS && isMethod(this.req, "OPTIONS"))
      return await this.onOPTIONS(this.req, this.res, this.prisma);
    if (this.onTRACE && isMethod(this.req, "TRACE"))
      return await this.onTRACE(this.req, this.res, this.prisma);
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }
}
