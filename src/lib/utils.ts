import type { CookieOptions } from "express";
import jwt from "jsonwebtoken";

export function createJwtToken({
  accountId,
  role,
  issuerName,
}: {
  accountId: string;
  role: string;
  issuerName?: string;
}) {
  return jwt.sign(
    {
      userId: accountId,
      role: role,
      ...(issuerName ? { issuer: issuerName } : undefined),
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );
}

export function createAuthCookie(
  res: any,
  key?: string,
  value?: string,
  options?: CookieOptions,
) {
  const cookieName = key ?? process.env.JWT_COOKIE_NAME!;

  return res.cookie(cookieName, value, {
    httpOnly: true,
    sameSite: "none",
    ...(process.env.LOCAL_HTTPS_ENABLED === "true" && {
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: false,
      // domain: "localhost",
    }),
    ...options,
  });
}
