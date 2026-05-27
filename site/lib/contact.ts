export const CONTACT = {
  phoneDisplay: "(44) 99948-0317",
  phoneTel: "+5544999480317",
  whatsappNumber: "5544999480317",
  email: "andre@aiknetwork.com.br",
  city: "Nova Esperança - PR",
} as const;

export function whatsappUrl(text: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildContactWhatsAppMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const subjectLabels: Record<string, string> = {
    orcamento: "Solicitar Orçamento",
    duvida: "Dúvidas sobre Serviços",
    outro: "Outro",
  };
  const assunto = subjectLabels[data.subject] || data.subject || "Contato pelo site";

  return [
    "Olá André, mensagem pelo site AIK Network:",
    "",
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Telefone: ${data.phone || "—"}`,
    `Assunto: ${assunto}`,
    "",
    data.message,
  ].join("\n");
}
