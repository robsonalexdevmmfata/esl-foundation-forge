import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { queryDb } from "./db";

const SESSION_DURATION_SECONDS = 60 * 60 * 8;
const credentialsSchema = z.object({
  username: z.string().max(128),
  password: z.string().max(1024),
});

interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  role: string;
  active: boolean;
}

interface SessionData {
  authenticated: boolean;
  userId?: string;
  username?: string;
  role?: string;
}

function getSessionConfig() {
  const password = process.env["ADMIN_SESSION_SECRET"];
  if (!password || password.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }

  return {
    name: "esl-admin",
    password,
    maxAge: SESSION_DURATION_SECONDS,
    cookie: {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    },
  };
}

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => credentialsSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      // Query database for user
      const result = await queryDb<AdminUser>(
        `SELECT id, username, password_hash, role, active 
         FROM public.admin_users 
         WHERE username = $1 
         LIMIT 1`,
        [data.username],
      );

      // Check if user exists
      if (result.rows.length === 0) {
        return { authenticated: false };
      }

      const user = result.rows[0];

      // Check if user is active
      if (!user || !user.active) {
        return { authenticated: false };
      }

      // Check if user has admin role
      if (user.role !== "admin") {
        return { authenticated: false };
      }

      // Verify password using bcrypt
      const passwordMatches = await bcrypt.compare(data.password, user.password_hash);

      if (!passwordMatches) {
        return { authenticated: false };
      }

      // Create session
      const session = await useSession<SessionData>(getSessionConfig());
      await session.update({
        authenticated: true,
        userId: user.id,
        username: user.username,
        role: user.role,
      });

      return { authenticated: true };
    } catch (error) {
      console.error("Login error:", error instanceof Error ? error.message : "Unknown error");
      return { authenticated: false };
    }
  });

export const checkAdminSession = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const session = await useSession<SessionData>(getSessionConfig());
    return { authenticated: session.data.authenticated === true };
  } catch (error) {
    console.error("Session check error:", error instanceof Error ? error.message : "Unknown error");
    return { authenticated: false };
  }
});

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const session = await useSession<SessionData>(getSessionConfig());
    await session.clear();
    return { authenticated: false };
  } catch (error) {
    console.error("Logout error:", error instanceof Error ? error.message : "Unknown error");
    return { authenticated: false };
  }
});
