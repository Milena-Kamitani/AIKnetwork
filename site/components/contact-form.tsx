"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  buildContactWhatsAppMessage,
  whatsappUrl,
} from "@/lib/contact";

export default function ContactForm() {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormErrors({});

    const formData = new FormData(event.currentTarget);
    const data = {
      name: (formData.get("name") as string)?.trim(),
      email: (formData.get("email") as string)?.trim(),
      phone: (formData.get("phone") as string)?.trim(),
      subject: formData.get("subject") as string,
      message: (formData.get("message") as string)?.trim(),
    };

    const errors: Record<string, string> = {};
    if (!data.name) errors.name = "Informe seu nome";
    if (!data.email) errors.email = "Informe seu email";
    if (!data.message) errors.message = "Digite sua mensagem";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const url = whatsappUrl(buildContactWhatsAppMessage(data));
    window.open(url, "_blank", "noopener,noreferrer");

    toast({
      title: "Abrindo WhatsApp",
      description: "Você será direcionado para conversar com o André.",
    });

    event.currentTarget.reset();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Nome
          </label>
          <input
            id="name"
            name="name"
            required
            className={`flex h-10 w-full rounded-md border ${formErrors.name ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm`}
            placeholder="Seu nome"
          />
          {formErrors.name && (
            <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={`flex h-10 w-full rounded-md border ${formErrors.email ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm`}
            placeholder="Seu email"
          />
          {formErrors.email && (
            <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium leading-none">
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="(xx) xxxxx-xxxx"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium leading-none">
          Assunto
        </label>
        <select
          id="subject"
          name="subject"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Selecione um assunto</option>
          <option value="orcamento">Solicitar Orçamento</option>
          <option value="duvida">Dúvidas sobre Serviços</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium leading-none">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          className={`flex min-h-[120px] w-full rounded-md border ${formErrors.message ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm`}
          placeholder="Digite sua mensagem"
        />
        {formErrors.message && (
          <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>
        )}
      </div>
      <Button className="w-full bg-green-700 hover:bg-green-800" type="submit">
        Enviar mensagem no WhatsApp
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Ao enviar, o WhatsApp abre com o André para você concluir o contato.
      </p>
    </form>
  );
}
