#!/bin/bash
set -e
cd "$(dirname "$0")/site"

if [ ! -d "node_modules" ]; then
  if command -v pnpm >/dev/null 2>&1; then
    pnpm install
  else
    npm install --legacy-peer-deps
  fi
fi

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local 2>/dev/null || true
  echo "Site: http://127.0.0.1:3001"
echo "Crie site/.env.local com NEXT_PUBLIC_CHAMADOS_URL=http://127.0.0.1:8000"
fi

# Porta 3000 costuma estar ocupada por outros projetos; site AIK usa 3001
export PORT=3001

if command -v pnpm >/dev/null 2>&1; then
  pnpm dev --port "$PORT"
else
  npx next dev --port "$PORT"
fi
