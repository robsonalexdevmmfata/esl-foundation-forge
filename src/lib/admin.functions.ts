import { createServerFn } from "@tanstack/react-start";

/**
 * Cria (uma única vez) o usuário administrador padrão do painel.
 * Só executa enquanto NÃO existir nenhum admin cadastrado — depois disso
 * a chamada é um no-op, então não é um endpoint privilegiado aberto.
 */
export const ensureDefaultAdmin = createServerFn({ method: "POST" }).handler(
  async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if ((count ?? 0) > 0) return { created: false as const };

    const email = "admin@eslfacility.com.br";
    const password = "123456";

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome: "Administrador ESL" },
    });

    let userId = created?.user?.id;

    if (error || !userId) {
      const { data: list } = await supabaseAdmin.auth.admin.listUsers();
      userId = list?.users.find((u) => u.email === email)?.id;
      if (userId) {
        await supabaseAdmin.auth.admin.updateUserById(userId, {
          password,
          email_confirm: true,
        });
      }
    }

    if (!userId) return { created: false as const };

    await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    return { created: true as const };
  },
);
