import pg from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("❌ DATABASE_URL not set in environment");
    console.error("Please set DATABASE_URL in your .env file");
    console.error("Example: DATABASE_URL=postgresql://els:password@127.0.0.1:5432/esl");
    process.exit(1);
  }

  console.log("🔌 Connecting to database...");

  const pool = new Pool({
    connectionString,
    ssl: false,
  });

  try {
    // Test connection
    const client = await pool.connect();
    console.log("✅ Database connection successful");
    client.release();

    // Read migration file
    const migrationPath = join(
      __dirname,
      "..",
      "supabase",
      "migrations",
      "20261020000001_create_admin_users.sql",
    );
    const migrationSQL = readFileSync(migrationPath, "utf-8");

    console.log("📄 Running migration: 20261020000001_create_admin_users.sql");

    // Execute migration
    await pool.query(migrationSQL);

    console.log("✅ Migration completed successfully");
    console.log("");
    console.log("Admin user created:");
    console.log("  Username: gestaoesl");
    console.log("  Password: Serras123@");
    console.log("  Role: admin");
    console.log("  Active: true");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
