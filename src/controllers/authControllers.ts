import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getCurrentUser, signin, signup } from "../lib/prisma/queries";
import { createAuthCookie, createJwtToken } from "../lib/utils";

export const signupUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, role, email, password } = req.body;

    // TODO: probably, there is no need in this...
    switch (req.body) {
      case !name:
        throw new Error("Name is required");
      case !email:
        throw new Error("Email is required");
      case !password:
        throw new Error("Password is required");
      case !role:
        throw new Error("Role is required");
      case role:
        if (role !== "manager" || "tenant") {
          throw new Error("Role must be 'manager' or 'tenant'");
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = await signup({
      name: name,
      email: email,
      role: role,
      password: hashedPassword,
      isActive: true,
      isVerified: false,
    });

    if (!newAccount?.success) {
      res.status(400).json(newAccount?.message);
      return;
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Registration failed. ${error}` });
  }
};

export const signinUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      throw new Error("Credentials are required.");
    }

    const user = await signin({ email, password });

    // Check user
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = createJwtToken({
      accountId: user?.accountId,
      role: user?.role,
      issuerName: "app",
    });

    // Store the token in the cookie
    createAuthCookie(res, undefined, token, { maxAge: 7 * 24 * 3600000 });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to sign in" });
  }
};

export const signOutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // TODO: check out docs as well for alternative solutions https://expressjs.com/en/resources/middleware/cookie-session.html
  try {
    // Store the token in the cookie
    createAuthCookie(res, undefined, undefined, { maxAge: 0 });

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const getUserAccountData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const accountId = req?.accountInfo?.userId;

  try {
    const currentUser = await getCurrentUser(accountId!);
    if (currentUser.status !== 200) {
      res.status(401).json({ error: "Not authorized" });
    }

    res.json({ ...currentUser.accountInfo });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
