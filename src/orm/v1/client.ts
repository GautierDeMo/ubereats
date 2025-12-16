import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../../prisma/generated/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Database URL env. variable is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
