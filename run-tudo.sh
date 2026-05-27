#!/bin/bash
# Inicia chamados (8000) e site (3001) — use dois terminais se preferir: ./run-chamados.sh e ./run-site.sh
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "=== AIK — iniciar local ==="
echo "Chamados: http://127.0.0.1:8000"
echo "Site:     http://127.0.0.1:3001  (porta 3001; 3000 pode estar ocupada)"
echo ""

# Mata instâncias antigas só nestas portas (opcional)
for port in 8000; do
  pid=$(lsof -ti ":$port" 2>/dev/null || true)
  if [ -n "$pid" ]; then
    echo "Encerrando processo antigo na porta $port (PID $pid)..."
    kill "$pid" 2>/dev/null || true
    sleep 1
  fi
done

cd "$ROOT/chamados"
if [ ! -d ".venv" ]; then
  python3 -m venv .venv
  .venv/bin/pip install -r requirements.txt
fi
[ -f .env ] || cp .env.example .env

.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload &
CHAMADOS_PID=$!

cd "$ROOT/site"
[ -f .env.local ] || echo "NEXT_PUBLIC_CHAMADOS_URL=http://127.0.0.1:8000" > .env.local

export PORT=3001
if command -v pnpm >/dev/null 2>&1; then
  pnpm dev --port "$PORT"
else
  npx next dev --port "$PORT"
fi

kill $CHAMADOS_PID 2>/dev/null
