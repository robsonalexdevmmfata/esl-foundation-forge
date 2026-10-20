import { checkAdminSession, loginAdmin, logoutAdmin } from "@/lib/admin-auth.functions";

export async function isAuthenticated(): Promise<boolean> {
  const result = await checkAdminSession();
  return result.authenticated;
}

export async function login(username: string, password: string): Promise<boolean> {
  const result = await loginAdmin({ data: { username, password } });
  return result.authenticated;
}

export async function logout(): Promise<void> {
  await logoutAdmin();
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_authenticated");
  }
}
