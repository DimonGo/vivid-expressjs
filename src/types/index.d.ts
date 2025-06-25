import { Account } from "../generated/prisma";

export type AccountCreateSchema = Omit<Account, "id" | "accountId">;
export type LoginSchema = Omit<
  Account,
  "id" | "accountId" | "name" | "isActive" | "isVerified" | "role"
>;
