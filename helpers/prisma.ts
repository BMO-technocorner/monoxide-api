import Prisma from "@prisma/client";

export type PrismaClient = Prisma.PrismaClient;

export const usePrisma = (): PrismaClient => new Prisma.PrismaClient();
