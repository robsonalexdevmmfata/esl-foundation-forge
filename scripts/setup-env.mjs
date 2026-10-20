import { createInterface } from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setupEnv() {
  console.log('🔧 Configuração do .env para Login Administrativo\n');

  const dbUser = await question('Usuário do PostgreSQL [els]: ') || 'els';
  const dbPassword = await question('Senha do PostgreSQL: ');
  const dbHost = await question('Host do PostgreSQL [127.0.0.1]: ') || '127.0.0.1';
  const dbPort = await question('Porta do PostgreSQL [5432]: ') || '5432';
  const dbName = await question('Nome do banco [esl]: ') || 'esl';

  const databaseUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

  console.log('\n🔐 Gerando ADMIN_SESSION_SECRET...');
  const { randomBytes } = await import('node:crypto');
  const sessionSecret = randomBytes(32).toString('hex');

  const envPath = join(__dirname, '..', '.env');
  let envContent = '';

  try {
    envContent = readFileSync(envPath, 'utf-8');
  } catch (error) {
    console.log('⚠️  Arquivo .env não encontrado, criando novo...');
  }

  // Update or add DATABASE_URL
  if (envContent.includes('DATABASE_URL=')) {
    envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${databaseUrl}`);
  } else {
    envContent += `\nDATABASE_URL=${databaseUrl}\n`;
  }

  // Update or add ADMIN_SESSION_SECRET
  if (envContent.includes('ADMIN_SESSION_SECRET=')) {
    envContent = envContent.replace(/ADMIN_SESSION_SECRET=.*/g, `ADMIN_SESSION_SECRET=${sessionSecret}`);
  } else {
    envContent += `ADMIN_SESSION_SECRET=${sessionSecret}\n`;
  }

  writeFileSync(envPath, envContent);

  console.log('\n✅ Arquivo .env atualizado!\n');
  console.log('Configurações:');
  console.log(`  DATABASE_URL: postgresql://${dbUser}:****@${dbHost}:${dbPort}/${dbName}`);
  console.log(`  ADMIN_SESSION_SECRET: ${sessionSecret.substring(0, 16)}...`);
  console.log('\nPróximos passos:');
  console.log('  1. npm run db:test    # Testar conexão');
  console.log('  2. npm run db:migrate # Criar tabela e usuário admin');
  console.log('  3. Reiniciar o servidor');
  console.log('  4. Acessar /admin/login com:');
  console.log('     Usuário: gestaoesl');
  console.log('     Senha: Serras123@');

  rl.close();
}

setupEnv();
