# AIK Network — Site + Sistema de Chamados

Repositório único com tudo da AIK Network:

| Pasta | O quê | Onde publica |
|-------|--------|----------------|
| **`site/`** | Site institucional (Next.js) — [ai-knetwork.vercel.app](https://ai-knetwork.vercel.app/) | **Vercel** |
| **`chamados/`** | Sistema de chamados (Python) — abrir ticket, técnicos, dashboard | **VM** (servidor) |
| **`deploy/`** | Nginx + systemd para a VM | — |

**GitHub:** https://github.com/Milena-Kamitani/AIKnetwork

---

## Rodar local (teste)

Abra **dois terminais**:

### 1. Sistema de chamados (porta 8000)

```bash
cd ~/Downloads/aik\ sistema
chmod +x run-chamados.sh
./run-chamados.sh
```

- Abrir chamado: http://127.0.0.1:8000/
- Login técnicos: http://127.0.0.1:8000/tecnicos/login

### 2. Site institucional (porta 3000)

```bash
cd ~/Downloads/aik\ sistema
chmod +x run-site.sh
./run-site.sh
```

- Site: http://127.0.0.1:3001/ (porta **3001** — a 3000 costuma estar ocupada por outro app)

No arquivo `site/.env.local`:

```env
NEXT_PUBLIC_CHAMADOS_URL=http://127.0.0.1:8000
```

Os botões **Abrir chamado** e **Login técnicos** do site apontam para essa URL.

---

## Publicar no GitHub (tudo junto)

```bash
cd ~/Downloads/aik\ sistema

git add -A
git commit -m "AIK Network: site institucional + sistema de chamados"
git remote add origin https://github.com/Milena-Kamitani/AIKnetwork.git
# se já existir: git remote set-url origin https://github.com/Milena-Kamitani/AIKnetwork.git
git branch -M main
git push -u origin main --force
```

Use `--force` só se quiser **substituir** o que está no GitHub pelo projeto novo.

---

## Vercel (site)

1. Conecte o repositório **AIKnetwork** na Vercel
2. **Settings → General → Root Directory** → **`site`** (obrigatório — é onde está o `package.json` do Next.js)
3. **Não** use comandos de build customizados na raiz do repo; o `package.json` fica dentro de `site/`
4. **Settings → Environment Variables:**
   - `NEXT_PUBLIC_CHAMADOS_URL` = URL do sistema de chamados na VM (depois que subir)
5. **Deployments → Redeploy**

Se aparecer erro *"No Next.js version detected"*, o Root Directory não está como `site`.

---

## VM (chamados)

Guia completo: [chamados/DEPLOY.md](chamados/DEPLOY.md)

Resumo:

```bash
git clone https://github.com/Milena-Kamitani/AIKnetwork.git /opt/aik-sistema
cd /opt/aik-sistema/chamados
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
cp .env.example .env && nano .env
./run.sh   # teste; em produção use systemd (deploy/)
```

Depois configure na Vercel: `NEXT_PUBLIC_CHAMADOS_URL=https://SEU_DOMINIO_DA_VM`

---

## Fluxo para o cliente

1. Entra em **ai-knetwork.vercel.app** → vê serviços da empresa  
2. Clica **Abrir chamado** → vai para o sistema na VM  
3. Técnicos usam **Login técnicos** → dashboard e lista de chamados  

---

## Senhas iniciais (chamados)

| Usuário | Senha |
|---------|--------|
| `andre`, `milena`, `fernando` | `aik2025` |
| `admin` | ver `ADMIN_PASSWORD` no `.env` |

Altere antes de publicar na internet.
