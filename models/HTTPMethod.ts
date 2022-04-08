import type { CompatibilityEvent } from "h3";
import type { PrismaClient } from "~/helpers/prisma";

export default class HTTPMethod {
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
}
