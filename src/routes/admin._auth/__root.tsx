import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";

export const Route = createFileRoute("/admin/_auth/__root")({
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
