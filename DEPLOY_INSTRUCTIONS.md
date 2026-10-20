# Instruções de Deploy - Autenticação Administrativa

## ✅ Alterações Realizadas

### Arquivos Criados

1. **src/lib/db.ts** - Módulo de conexão PostgreSQL com pool de conexões
2. **supabase/migrations/20261020000001_create_admin_users.sql** - Migração da tabela admin_users
3. **scripts/run-migration.mjs** - Script para executar migração no banco
4. **scripts/manage-admin-user.mjs** - Script para gerenciar usuários administrativos
5. **scripts/generate-password-hash.mjs** - Script para gerar hash de senhas
6. **ADMIN_AUTH_SETUP.md** - Documentação completa do sistema de autenticação
7. **DEPLOY_INSTRUCTIONS.md** - Este arquivo

### Arquivos Modificados

1. **src/lib/admin-auth.functions.ts** - Refatorado para usar PostgreSQL e bcrypt
2. **.env.example** - Atualizado com novas variáveis de ambiente
3. **package.json** - Adicionados scripts `db:migrate` e `admin:manage`

### Dependências Instaladas

- `bcrypt` (6.0.0) - Para hash seguro de senhas
- `pg` - Cliente PostgreSQL para Node.js

## 🔧 Configuração no Servidor (VPS)

### Passo 1: Atualizar variáveis de ambiente

No servidor, edite o arquivo `.env` e adicione:

```bash
# Conexão com PostgreSQL
DATABASE_URL=postgresql://els:sua_senha_postgresql@127.0.0.1:5432/esl

# Segredo da sessão (mínimo 32 caracteres)
# Gere um novo: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ADMIN_SESSION_SECRET=seu_segredo_de_sessao_aqui_minimo_32_caracteres
```

⚠️ **IMPORTANTE:** 
- Substitua `sua_senha_postgresql` pela senha real do usuário `els` no PostgreSQL
- Gere um novo `ADMIN_SESSION_SECRET` usando o comando fornecido
- Não use as variáveis antigas `ADMIN_USERNAME` e `ADMIN_PASSWORD`

### Passo 2: Executar migração do banco de dados

Na VPS, execute:

```bash
cd /caminho/para/esl-foundation-forge
npm run db:migrate
```

Este comando irá:
- Criar a tabela `public.admin_users`
- Inserir o usuário administrativo padrão:
  - **Usuário:** gestaoesl
  - **Senha:** Serras123@

### Passo 3: Fazer upload do build

Faça upload dos seguintes diretórios para a VPS:

```
dist/
node_modules/
scripts/
supabase/
package.json
package-lock.json
.env (com as novas variáveis configuradas)
```

Ou, alternativamente, faça build diretamente na VPS:

```bash
cd /caminho/para/esl-foundation-forge
npm install
npm run build
```

### Passo 4: Reiniciar o serviço com PM2

```bash
# Opção 1: Restart simples
pm2 restart esl-foundation-forge

# Opção 2: Com arquivo de configuração
pm2 restart ecosystem.config.js

# Opção 3: Parar e iniciar novamente
pm2 stop esl-foundation-forge
pm2 start dist/server/index.mjs --name esl-foundation-forge

# Verificar status
pm2 status

# Ver logs em tempo real
pm2 logs esl-foundation-forge
```

## 🔍 Verificação

### 1. Verificar se a tabela foi criada

```bash
# Conectar ao PostgreSQL
psql -h 127.0.0.1 -U els -d esl

# Listar usuários administrativos
SELECT username, role, active, created_at FROM public.admin_users;

# Sair
\q
```

### 2. Testar login

Acesse: `https://seu-dominio.com/admin/login`

- **Usuário:** gestaoesl
- **Senha:** Serras123@

Se o login funcionar, você verá o dashboard administrativo.

### 3. Verificar logs

```bash
pm2 logs esl-foundation-forge --lines 50
```

Procure por:
- ✅ Sem erros de "DATABASE_URL is not configured"
- ✅ Sem erros de "ADMIN_SESSION_SECRET must contain at least 32 characters"
- ✅ Sem erros de conexão ao banco de dados

## 🛠️ Troubleshooting

### Erro: "DATABASE_URL is not configured"

**Solução:** Configure DATABASE_URL no arquivo .env:
```bash
DATABASE_URL=postgresql://els:password@127.0.0.1:5432/esl
```

### Erro: "ADMIN_SESSION_SECRET must contain at least 32 characters"

**Solução:** Gere e configure um segredo válido:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Adicione o resultado ao .env como ADMIN_SESSION_SECRET.

### Erro: "relation 'admin_users' does not exist"

**Solução:** Execute a migração:
```bash
npm run db:migrate
```

### Erro: "password authentication failed for user 'els'"

**Solução:** Verifique a senha do PostgreSQL no DATABASE_URL.

### Login não funciona com gestaoesl / Serras123@

**Solução:** Verifique se a migração foi executada e se o usuário foi criado:
```bash
npm run admin:manage
# Selecione opção 3 para listar usuários
```

Se necessário, recrie o usuário:
```bash
npm run admin:manage
# Selecione opção 1 para criar novo usuário
# Username: gestaoesl
# Password: Serras123@
# Role: admin
```

## 📋 Gerenciamento de Usuários

Para criar, atualizar ou gerenciar usuários administrativos:

```bash
npm run admin:manage
```

Opções disponíveis:
1. Create new admin user
2. Update admin password
3. List all admin users
4. Deactivate admin user
5. Activate admin user

## 🔐 Segurança

✅ **O que foi implementado:**
- Senhas armazenadas com bcrypt (10 rounds)
- Sessões HTTP-only com cookies seguros
- Validação completa no login (usuário, senha, ativo, role)
- Sem senhas em texto puro no código ou logs
- Comparação de senha usando bcrypt.compare()
- Pool de conexões PostgreSQL com configuração segura

❌ **O que NÃO é mais usado:**
- ADMIN_USERNAME e ADMIN_PASSWORD (variáveis de ambiente)
- SHA256 hash comparison
- Credenciais hardcoded no código

## 📊 Resumo da Implementação

### Tabela admin_users

```sql
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Fluxo de Autenticação

1. Usuário envia username e password
2. Sistema busca usuário no banco de dados por username
3. Valida se usuário existe
4. Valida se usuário está ativo (active = true)
5. Valida se usuário tem role 'admin'
6. Compara senha usando bcrypt.compare()
7. Se tudo válido, cria sessão
8. Redireciona para dashboard

Qualquer falha retorna apenas "Credenciais inválidas" (sem revelar qual validação falhou).

## 🚀 Build de Produção

O build já foi gerado e está em `dist/`. Não é necessário gerar novamente, apenas:

1. Fazer upload do conteúdo
2. Configurar .env
3. Executar migração
4. Reiniciar PM2

---

## ✨ Comandos Rápidos

```bash
# Configurar variáveis de ambiente
nano .env

# Executar migração
npm run db:migrate

# Gerenciar usuários
npm run admin:manage

# Reiniciar aplicação
pm2 restart esl-foundation-forge

# Ver logs
pm2 logs esl-foundation-forge

# Ver status
pm2 status
```

---

**Desenvolvido em:** 20/10/2026  
**Sistema:** Node.js + TanStack Start + PostgreSQL + bcrypt
