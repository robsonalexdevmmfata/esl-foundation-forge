import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

const SESSION_DURATION_SECONDS = 60 * 60 * 8;
const credentialsSchema = z.object({
  username: z.string().max(128),
  password: z.string().max(1024),
});

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

async function matchesSecret(provided: string, expected: string): Promise<boolean> {
  const { createHash, timingSafeEqual } = await import("node:crypto");
  const providedHash = createHash("sha256").update(provided, "utf8").digest();
  const expectedHash = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(providedHash, expectedHash);
}

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => credentialsSchema.parse(data))
  .handler(async ({ data }) => {
    const expectedUsername = process.env["ADMIN_USERNAME"];
    const expectedPassword = process.env["ADMIN_PASSWORD"];
    if (!expectedUsername || !expectedPassword) {
      throw new Error("Configure ADMIN_USERNAME and ADMIN_PASSWORD on the server.");
    }

    const usernameMatches = await matchesSecret(data.username, expectedUsername);
    const passwordMatches = await matchesSecret(data.password, expectedPassword);
    const authenticated = usernameMatches && passwordMatches;

    if (!authenticated) return { authenticated: false };

    const session = await useSession<{ authenticated: boolean }>(getSessionConfig());
    await session.update({ authenticated: true });
    return { authenticated: true };
  });

export const checkAdminSession = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<{ authenticated: boolean }>(getSessionConfig());
  return { authenticated: session.data.authenticated === true };
});

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<{ authenticated: boolean }>(getSessionConfig());
  await session.clear();
  return { authenticated: false };
});
