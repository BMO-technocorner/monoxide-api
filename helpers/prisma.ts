import Prisma from "@prisma/client";

let prisma;

export type PrismaClient = Prisma.PrismaClient;

export const usePrisma = (): PrismaClient => {
  if (!prisma) prisma = new Prisma.PrismaClient();
  return prisma;
};
