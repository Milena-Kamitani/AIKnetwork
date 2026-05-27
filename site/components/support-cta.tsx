import Link from "next/link";
import { Headset, LogIn, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getChamadosUrls } from "@/lib/chamados";

type SupportCtaProps = {
  variant?: "bar" | "hero" | "compact";
};

export default function SupportCta({ variant = "bar" }: SupportCtaProps) {
  const urls = getChamadosUrls();

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800">
          <Link href={urls.openTicket} target="_blank" rel="noopener noreferrer">
            <Ticket className="mr-1.5 h-4 w-4" />
            Abrir chamado
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link
            href={urls.technicianLogin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LogIn className="mr-1.5 h-4 w-4" />
            Técnicos
          </Link>
        </Button>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-sm dark:border-blue-900 dark:bg-gray-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <Headset className="h-6 w-6 text-blue-700 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold sm:text-xl">
                Precisa de suporte técnico?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                Abra um chamado com WhatsApp e print do problema. Nossa equipe
                acompanha pelo sistema interno.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
            <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800">
              <Link
                href={urls.openTicket}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Ticket className="mr-2 h-5 w-5" />
                Abrir chamado
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href={urls.technicianLogin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Área dos técnicos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-blue-700 text-white">
      <div className="container flex flex-col items-center justify-between gap-3 py-3 sm:flex-row">
        <p className="text-center text-sm font-medium sm:text-left">
          <Headset className="mr-2 inline h-4 w-4" />
          Suporte AIK: abra um chamado e fale com nossa equipe pelo WhatsApp
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="bg-white text-blue-800 hover:bg-blue-50"
          >
            <Link
              href={urls.openTicket}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir chamado
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-white/80 bg-transparent text-white hover:bg-white/10"
          >
            <Link
              href={urls.technicianLogin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Login técnicos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
