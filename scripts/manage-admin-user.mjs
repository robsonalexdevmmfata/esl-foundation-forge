import pg from "pg";
import bcrypt from "bcrypt";
import { createInterface } from "readline";

const { Pool } = pg;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function manageAdminUser() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("❌ DATABASE_URL not set in environment");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    ssl: false,
  });

  try {
    console.log("🔐 Admin User Management\n");
    console.log("1. Create new admin user");
    console.log("2. Update admin password");
    console.log("3. List all admin users");
    console.log("4. Deactivate admin user");
    console.log("5. Activate admin user");
    console.log("");

    const choice = await question("Select option (1-5): ");

    switch (choice.trim()) {
      case "1":
        await createUser(pool);
        break;
      case "2":
        await updatePassword(pool);
        break;
      case "3":
        await listUsers(pool);
        break;
      case "4":
        await deactivateUser(pool);
        break;
      case "5":
        await activateUser(pool);
        break;
      default:
        console.log("Invalid option");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await pool.end();
    rl.close();
  }
}

async function createUser(pool) {
  const username = await question("Username: ");
  const password = await question("Password: ");
  const role = (await question("Role (admin): ")) || "admin";

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO public.admin_users (username, password_hash, role, active) VALUES ($1, $2, $3, true)",
    [username, hash, role],
  );

  console.log("✅ User created successfully");
}

async function updatePassword(pool) {
  const username = await question("Username: ");
  const password = await question("New password: ");

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "UPDATE public.admin_users SET password_hash = $1, updated_at = now() WHERE username = $2",
    [hash, username],
  );

  if (result.rowCount === 0) {
    console.log("❌ User not found");
  } else {
    console.log("✅ Password updated successfully");
  }
}

async function listUsers(pool) {
  const result = await pool.query(
    "SELECT id, username, role, active, created_at FROM public.admin_users ORDER BY created_at DESC",
  );

  console.log("\n📋 Admin Users:\n");
  result.rows.forEach((row) => {
    console.log(`  ${row.username}`);
    console.log(`    ID: ${row.id}`);
    console.log(`    Role: ${row.role}`);
    console.log(`    Active: ${row.active ? "Yes" : "No"}`);
    console.log(`    Created: ${row.created_at}`);
    console.log("");
  });
}

async function deactivateUser(pool) {
  const username = await question("Username to deactivate: ");

  const result = await pool.query(
    "UPDATE public.admin_users SET active = false, updated_at = now() WHERE username = $1",
    [username],
  );

  if (result.rowCount === 0) {
    console.log("❌ User not found");
  } else {
    console.log("✅ User deactivated successfully");
  }
}

async function activateUser(pool) {
  const username = await question("Username to activate: ");

  const result = await pool.query(
    "UPDATE public.admin_users SET active = true, updated_at = now() WHERE username = $1",
    [username],
  );

  if (result.rowCount === 0) {
    console.log("❌ User not found");
  } else {
    console.log("✅ User activated successfully");
  }
}

manageAdminUser();
