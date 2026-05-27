/** URLs do sistema de chamados (Python), hospedado na VM ou local. */
export function getChamadosUrls() {
  const base = (
    process.env.NEXT_PUBLIC_CHAMADOS_URL || "http://127.0.0.1:8000"
  ).replace(/\/$/, "");

  return {
    base,
    openTicket: `${base}/`,
    technicianLogin: `${base}/tecnicos/login`,
    technicianDashboard: `${base}/tecnicos`,
  };
}
