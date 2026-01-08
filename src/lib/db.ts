import { PrismaClient } from "@prisma/client";

/**
 * [Prisma Client Singleton]
 * 
 * - Next.js는 개발 모드에서 파일이 변경될 때마다 모듈을 재실행합니다.
 * - 이로 인해 Prisma Client 연결이 무수히 많이 생성되는 것을 방지하기 위해 global 객체에 인스턴스를 저장합니다.
 * - 프로덕션 환경에서는 일반적인 방식으로 인스턴스를 생성합니다.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
