# FIX RÁPIDO - Login Administrativo

## Problema Atual
❌ Senha do PostgreSQL incorreta no .env

## Solução Rápida

### Opção 1: Atualizar senha no .env

Se você sabe a senha do usuário `els` no PostgreSQL, edite o arquivo `.env`:

```bash
DATABASE_URL=postgresql://els:SUA_SENHA_AQUI@127.0.0.1:5432/esl
```

### Opção 2: Redefinir senha do PostgreSQL

Se não lembra a senha, redefina:

```bash
# Conectar como postgres (usuário admin)
psql -U postgres

# Redefinir senha do usuário els
ALTER USER els WITH PASSWORD 'nova_senha_aqui';

# Sair
\q
```

Depois atualize o .env:
```bash
DATABASE_URL=postgresql://els:nova_senha_aqui@127.0.0.1:5432/esl
```

### Opção 3: Criar novo usuário PostgreSQL

```bash
# Conectar como postgres
psql -U postgres

# Criar usuário
CREATE USER els WITH PASSWORD 'Esl@2026';

# Dar permissões
GRANT ALL PRIVILEGES ON DATABASE esl TO els;
GRANT ALL PRIVILEGES ON SCHEMA public TO els;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO els;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO els;

# Sair
\q
```

Depois atualize o .env:
```bash
DATABASE_URL=postgresql://els:Esl@2026@127.0.0.1:5432/esl
```

## Passo a Passo Completo

### 1. Corrigir DATABASE_URL no .env

Edite o arquivo `.env` e coloque a senha correta:

```env
DATABASE_URL=postgresql://els:SENHA_CORRETA@127.0.0.1:5432/esl
ADMIN_SESSION_SECRET=8a1334e6a759ba5e739d3fcccc3a809b554fb21dc8c53ded1d5cc135e714cbce
```

### 2. Testar conexão

```bash
npm run db:test
```

Deve mostrar:
```
✅ Database connection successful!
```

### 3. Executar migração

```bash
npm run db:migrate
```

Deve criar a tabela e o usuário admin.

### 4. Reiniciar aplicação

No terminal onde está rodando o servidor (PM2 ou npm):

```bash
# Se usando npm dev
Ctrl+C
npm run dev

# Se usando PM2
pm2 restart esl-foundation-forge

# Se usando npm start
Ctrl+C
npm start
```

### 5. Testar login

Acesse: http://localhost:3000/admin/login

- **Usuário:** gestaoesl
- **Senha:** Serras123@

## Troubleshooting Rápido

### Erro: "password authentication failed"
→ Senha incorreta no DATABASE_URL

### Erro: "database esl does not exist"
```bash
psql -U els -h 127.0.0.1 -c "CREATE DATABASE esl;"
```

### Erro: "relation admin_users does not exist"
```bash
npm run db:migrate
```

### Erro: "ADMIN_SESSION_SECRET must contain at least 32 characters"
→ Já está configurado no .env, só reiniciar o servidor

### Login retorna "Usuário ou senha inválidos"
```bash
# Verificar se usuário existe
npm run db:test

# Se não existe, executar migração
npm run db:migrate

# Ou criar manualmente
npm run admin:manage
# Opção 1: Create new admin user
# Username: gestaoesl
# Password: Serras123@
# Role: admin
```

## Comandos em Ordem

```bash
# 1. Atualizar .env com senha correta
nano .env

# 2. Testar conexão
npm run db:test

# 3. Executar migração
npm run db:migrate

# 4. Reiniciar servidor
# (depende de como está rodando)

# 5. Testar login no navegador
```

## Status Atual do Sistema

✅ Código implementado corretamente
✅ Build de produção gerado
✅ Scripts de migração prontos
✅ ADMIN_SESSION_SECRET configurado
❌ DATABASE_URL precisa da senha correta
❌ Migração precisa ser executada
❌ Servidor precisa ser reiniciado

## Próximo Passo

**AGORA:** Me informe a senha do usuário `els` no PostgreSQL ou escolha uma opção acima para redefinir.
