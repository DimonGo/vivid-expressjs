import { Account } from "../generated/prisma";

export type AccountCreateSchema = Omit<
  Account,
  "id" | "accountId" | "createdAt" | "updatedAt"
>;
export type LoginSchema = Omit<
  Account,
  | "id"
  | "accountId"
  | "name"
  | "isActive"
  | "isVerified"
  | "role"
  | "createdAt"
  | "updatedAt"
>;
