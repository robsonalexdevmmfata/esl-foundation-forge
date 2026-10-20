# Configuração de Autenticação Administrativa

Este documento descreve como configurar e usar o sistema de autenticação administrativa baseado em PostgreSQL.

## Pré-requisitos

- PostgreSQL instalado e rodando
- Node.js 18+ instalado
- Banco de dados `esl` criado no PostgreSQL

## Configuração Inicial

### 1. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure:

```env
# Conexão com banco de dados PostgreSQL
DATABASE_URL=postgresql://els:sua_senha@127.0.0.1:5432/esl

# Segredo da sessão (mínimo 32 caracteres)
# Gere um novo com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ADMIN_SESSION_SECRET=seu_segredo_aqui_com_minimo_32_caracteres
```

### 2. Executar migração do banco de dados

Execute o script de migração para criar a tabela `admin_users`:

```bash
npm run db:migrate
```

Este comando irá:

- Conectar ao banco de dados usando DATABASE_URL
- Criar a tabela `public.admin_users`
- Inserir o usuário administrativo padrão:
  - **Usuário:** gestaoesl
  - **Senha:** Serras123@
  - **Role:** admin
  - **Status:** ativo

### 3. Verificar a instalação

Você pode listar os usuários administrativos com:

```bash
npm run admin:manage
# Selecione opção 3 (List all admin users)
```

## Credenciais de Login

Para acessar o painel administrativo em `/admin/login`:

- **Usuário:** gestaoesl
- **Senha:** Serras123@

## Gerenciamento de Usuários Administrativos

Use o script `admin:manage` para gerenciar usuários:

```bash
npm run admin:manage
```

Opções disponíveis:

1. **Create new admin user** - Criar novo usuário administrativo
2. **Update admin password** - Atualizar senha de usuário existente
3. **List all admin users** - Listar todos os usuários
4. **Deactivate admin user** - Desativar usuário (não pode fazer login)
5. **Activate admin user** - Reativar usuário

## Segurança

### Senhas

- As senhas são armazenadas usando bcrypt com 10 rounds
- Nunca são armazenadas em texto puro
- A comparação é feita de forma segura usando bcrypt.compare()

### Sessões

- As sessões são armazenadas em cookies HTTP-only
- Duração: 8 horas
- Secure flag ativado em produção
- SameSite: lax

### Validações de Login

O sistema valida:

1. Usuário existe no banco de dados
2. Senha corresponde ao hash armazenado
3. Usuário está ativo (`active = true`)
4. Usuário tem role 'admin'

Qualquer falha retorna apenas "Credenciais inválidas" (sem revelar qual validação falhou).

## Troubleshooting

### Erro: "DATABASE_URL is not configured"

Configure a variável DATABASE_URL no arquivo .env:

```env
DATABASE_URL=postgresql://els:password@127.0.0.1:5432/esl
```

### Erro: "ADMIN_SESSION_SECRET must contain at least 32 characters"

Gere um segredo válido:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

E adicione ao .env:

```env
ADMIN_SESSION_SECRET=valor_gerado_acima
```

### Não consegue fazer login

1. Verifique se a migração foi executada: `npm run db:migrate`
2. Liste os usuários: `npm run admin:manage` (opção 3)
3. Verifique se o usuário está ativo
4. Verifique os logs do servidor para erros

### Resetar senha do usuário padrão

```bash
npm run admin:manage
# Selecione opção 2 (Update admin password)
# Username: gestaoesl
# New password: Serras123@
```

## Estrutura do Banco de Dados

### Tabela: public.admin_users

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

## Build e Deploy

### Build de produção

```bash
npm run build
```

### Iniciar servidor

```bash
npm start
```

### Restart com PM2

Se estiver usando PM2:

```bash
pm2 restart esl-foundation-forge
```

Ou com arquivo de configuração:

```bash
pm2 restart ecosystem.config.js
```

## Notas Importantes

- **Não use Supabase Auth** para autenticação administrativa
- **Não use a tabela `clientes`** para autenticação
- **Não armazene senhas em variáveis de ambiente**
- **Não exiba senhas ou tokens nos logs**
- As credenciais administrativas são separadas dos usuários do sistema operacional e do PostgreSQL
