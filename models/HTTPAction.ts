import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";
import { isMethod, createError } from "h3";

export default class HTTPAction {
  event: CompatibilityEvent;
  prisma: PrismaClient;

  constructor(event: CompatibilityEvent, prisma: PrismaClient) {
    this.event = event;
    this.prisma = prisma;
  }

  onGET:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  onHEAD:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  onPOST:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  onPUT:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  onDELETE:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  onCONNECT:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  onOPTIONS:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  onTRACE:
    | null
    | ((event: CompatibilityEvent, prisma: PrismaClient) => Promise<any>) =
    null;

  async perform() {
    if (this.onGET && isMethod(this.event, "GET"))
      return await this.onGET(this.event, this.prisma);
    if (this.onHEAD && isMethod(this.event, "HEAD"))
      return await this.onHEAD(this.event, this.prisma);
    if (this.onPOST && isMethod(this.event, "POST"))
      return await this.onPOST(this.event, this.prisma);
    if (this.onPUT && isMethod(this.event, "PUT"))
      return await this.onPUT(this.event, this.prisma);
    if (this.onDELETE && isMethod(this.event, "DELETE"))
      return await this.onDELETE(this.event, this.prisma);
    if (this.onCONNECT && isMethod(this.event, "CONNECT"))
      return await this.onCONNECT(this.event, this.prisma);
    if (this.onOPTIONS && isMethod(this.event, "OPTIONS"))
      return await this.onOPTIONS(this.event, this.prisma);
    if (this.onTRACE && isMethod(this.event, "TRACE"))
      return await this.onTRACE(this.event, this.prisma);
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }
}
