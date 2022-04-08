import Prisma from "@prisma/client";

export type PrismaClient = Prisma.PrismaClient;

export const Status = Prisma.Status;

export const Level = Prisma.Level;

export const Role = Prisma.Role;

let prisma: PrismaClient;

export const usePrisma = (): PrismaClient => {
  if (!prisma) prisma = new Prisma.PrismaClient();
  return prisma;
};
