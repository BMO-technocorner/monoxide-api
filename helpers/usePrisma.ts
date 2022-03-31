import PrismaClientPkg from "@prisma/client";

const PrismaClient = PrismaClientPkg.PrismaClient;

export const usePrisma = () => new PrismaClient();
