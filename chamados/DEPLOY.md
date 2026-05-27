# Publicar na VM (produção)

Repositório: **https://github.com/Milena-Kamitani/AIKnetwork**

## Site institucional (Vercel)

O site [https://ai-knetwork.vercel.app/](https://ai-knetwork.vercel.app/) já tem botões **Abrir chamado** e **Login técnicos**.

Quando a VM estiver no ar, configure na Vercel a variável:

`NEXT_PUBLIC_CHAMADOS_URL=https://SEU_DOMINIO`

(ex.: `https://chamados.aiknetwork.com.br`)

---

## URLs depois de no ar

Substitua `SEU_DOMINIO` pelo domínio ou IP da VM:

| O quê | URL |
|-------|-----|
| Abrir chamado (público) | `https://SEU_DOMINIO/` |
| Login dos técnicos | `https://SEU_DOMINIO/tecnicos/login` |
| Dashboard | `https://SEU_DOMINIO/tecnicos` |
| Lista de chamados | `https://SEU_DOMINIO/tecnicos/chamados` |

**Sem domínio próprio:** use o IP público da VM (`http://203.0.113.10:8000` só em teste; em produção use Nginx na porta 80/443).

**Com domínio (recomendado):** ex. `chamados.suaempresa.com.br` → aponta o DNS (registro **A**) para o IP da VM.

---

## 1. Criar a VM

- **Ubuntu 22.04 ou 24.04**, 1 vCPU, 1 GB RAM, 10 GB disco
- Liberar no firewall da nuvem: portas **22** (SSH), **80** (HTTP), **443** (HTTPS)
- Anote o **IP público**

---

## 2. Instalar na VM

Conecte por SSH e rode:

```bash
sudo apt update && sudo apt install -y git python3 python3-venv nginx certbot python3-certbot-nginx

sudo mkdir -p /opt/aik-sistema
sudo chown $USER:$USER /opt/aik-sistema
cd /opt/aik-sistema

git clone https://github.com/Milena-Kamitani/AIKnetwork.git .

cd chamados
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt

cp .env.example .env
nano .env
```

No `chamados/.env`, defina pelo menos:

```env
SECRET_KEY=uma-chave-longa-aleatoria-aqui
ADMIN_PASSWORD=senha-forte-do-admin
```

Crie pastas de dados:

```bash
cd /opt/aik-sistema/chamados
mkdir -p data uploads
sudo chown -R www-data:www-data data uploads
```

> O site institucional (`site/`) vai na **Vercel**, não nesta VM.

---

## 3. Serviço systemd

```bash
sudo cp /opt/aik-sistema/deploy/aik-controle.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now aik-controle
sudo systemctl status aik-controle
```

---

## 4. Nginx + HTTPS

Edite `deploy/nginx-aik-controle.conf`, troque `SEU_DOMINIO`, depois:

```bash
sudo cp deploy/nginx-aik-controle.conf /etc/nginx/sites-available/aik-controle
sudo ln -sf /etc/nginx/sites-available/aik-controle /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Certificado gratuito (só com domínio apontando para a VM):

```bash
sudo certbot --nginx -d SEU_DOMINIO
```

---

## 5. Atualizar o sistema depois

```bash
cd /opt/aik-sistema
git pull
cd chamados && .venv/bin/pip install -r requirements.txt
sudo systemctl restart aik-controle
```

---

## Backup

Faça cópia periódica de:

- `/opt/aik-sistema/chamados/data/aik.db` (todos os chamados)
- `/opt/aik-sistema/chamados/uploads/` (prints)

---

## Senhas iniciais dos técnicos

Na primeira execução: `andre`, `milena`, `fernando` com senha `aik2025`.  
**Troque todas antes de divulgar a URL pública.**
