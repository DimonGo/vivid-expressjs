import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { AccountCreateSchema, LoginSchema } from "../../types";
import { db } from "../prisma";

export async function signup(account: AccountCreateSchema) {
  try {
    const newAccount = await db.account.create({
      data: account,
    });
    const newUser = await db.user.create({
      data: {
        accountId: newAccount.accountId,
        email: account.email,
        name: account.name,
      },
    });

    if (newAccount instanceof PrismaClientKnownRequestError) {
      throw new Error(JSON.stringify(newAccount));
    }

    return {
      accountInfo: newUser,
      success: true,
      message: `Created new account for ${account.email}`,
    };
  } catch (error) {
    console.error(error);
    return {
      accountInfo: {},
      success: false,
      message: `Failed to create a new account for ${account.email}. Error: ${JSON.stringify(error)}`,
    };
  }
}

export async function signin(account: LoginSchema) {
  if (!account.email && !account.password) {
    throw new Error("Credentials should not be empty");
  }
  try {
    const user = db.account.findFirst({
      where: {
        email: account.email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getAccountById(accountId: string) {
  return accountId;
}

export async function getCurrentUser(accountId: string) {
  try {
    const [currentAccount, currentUser] = await Promise.all([
      db.account.findFirst({
        where: {
          accountId,
        },
      }),
      db.user.findFirst({
        where: {
          accountId,
        },
        include: {
          PurchasedProjects: {
            select: {
              id: true,
            },
          },
        },
      }),
    ]);

    if (!currentUser) {
      throw new Error("User not found");
    }
    return {
      accountInfo: { ...currentUser, ...currentAccount, password: undefined },
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "User not found")
      return {
        user: null,
        success: false,
        status: 404,
      };

    return {
      user: null,
      success: false,
      status: 500,
    };
  }
}

export async function getUserByEmail({ email }: { email: string }) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return !!user;
}
