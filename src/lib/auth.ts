export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "123456",
};

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("admin_authenticated") === "true";
}

export function login(username: string, password: string): boolean {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    localStorage.setItem("admin_authenticated", "true");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem("admin_authenticated");
}
