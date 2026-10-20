# ✅ PRONTO PARA SUBIR NA VPS

## O QUE FOI FEITO

✅ **Supabase/Lovable REMOVIDO** - Não vai mais dar erro de variável faltando
✅ **Autenticação usando PostgreSQL LOCAL** da VPS
✅ **Senha com bcrypt** (segura)
✅ **Build de produção gerado** em `dist/`
✅ **Migração pronta** para criar tabela admin_users

## ARQUIVOS PARA UPLOAD NO FILEZILLA

```
📁 Faça upload de:
├── .env (configurado com DATABASE_URL e ADMIN_SESSION_SECRET)
├── dist/ (TODO O DIRETÓRIO)
├── src/
│   ├── lib/db.ts
│   ├── lib/admin-auth.functions.ts
│   └── integrations/supabase/ (arquivos modificados)
├── scripts/
│   ├── run-migration.mjs
│   └── manage-admin-user.mjs
├── supabase/migrations/20261020000001_create_admin_users.sql
├── package.json
└── package-lock.json
```

## COMANDOS NA VPS (COPIE E COLE)

```bash
# 1. Ir para o diretório
cd /var/www/esl-foundation-forge

# 2. Instalar dependências (bcrypt e pg)
npm install

# 3. Executar migração (criar tabela e usuário admin)
npm run db:migrate

# 4. Reiniciar PM2
pm2 restart esl-foundation-forge

# 5. Ver logs
pm2 logs esl-foundation-forge
```

## CREDENCIAIS

**PostgreSQL (já configurado no .env):**
- Usuário: esl
- Senha: 320809
- Banco: esl

**Login Admin:**
- URL: https://eslveccia.com.br/admin/login
- Usuário: gestaoesl
- Senha: Serras123@

## ARQUIVO .ENV (já está configurado)

```env
# Database connection for admin authentication (PRINCIPAL)
DATABASE_URL=postgresql://esl:320809@127.0.0.1:5432/esl

# Admin session secret (minimum 32 characters)
ADMIN_SESSION_SECRET=8e5f7ca0f06fcb2bce4b4373b264d29b4340b13f79dc98ab051831f88d2d101b

# Supabase (OPCIONAL - não usado para auth admin)
SUPABASE_PROJECT_ID="hefhvklumsnrymtowvkq"
SUPABASE_PUBLISHABLE_KEY="sb_publishable_ZC9e_3AXKYZUu9lF_NXVzA_vKAY86i_"
SUPABASE_URL="https://hefhvklumsnrymtowvkq.supabase.co"
VITE_SUPABASE_PROJECT_ID="hefhvklumsnrymtowvkq"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_ZC9e_3AXKYZUu9lF_NXVzA_vKAY86i_"
VITE_SUPABASE_URL="https://hefhvklumsnrymtowvkq.supabase.co"
```

## O QUE VAI ACONTECER

1. **npm install** - Instala bcrypt e pg
2. **npm run db:migrate** - Cria tabela `admin_users` e insere usuário `gestaoesl`
3. **pm2 restart** - Reinicia a aplicação com novo código
4. **Login funciona** com gestaoesl / Serras123@

## SE DER ERRO

### ❌ "password authentication failed"
→ A senha 320809 está errada no PostgreSQL
→ Solução: Redefinir senha ou corrigir DATABASE_URL no .env

### ❌ "relation admin_users does not exist"
→ Migração não foi executada
→ Solução: `npm run db:migrate`

### ❌ "Usuário ou senha inválidos" no login
→ Usuário não foi criado no banco
→ Solução: Verificar com `npm run admin:manage` (opção 3)

## CHECKLIST

- [ ] Upload dos arquivos pelo FileZilla
- [ ] Conectar via SSH
- [ ] cd /var/www/esl-foundation-forge
- [ ] npm install
- [ ] npm run db:migrate
- [ ] pm2 restart esl-foundation-forge
- [ ] Testar login em https://eslveccia.com.br/admin/login

---

**TUDO PRONTO!** Só fazer upload e executar os 4 comandos! 🚀
