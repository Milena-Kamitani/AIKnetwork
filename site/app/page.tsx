import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  Server,
  Shield,
  Network,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import ContactForm from "@/components/contact-form";
import { getChamadosUrls } from "@/lib/chamados";
import { CONTACT } from "@/lib/contact";

export default function Home() {
  const chamados = getChamadosUrls();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center bg-white">
            <Image
              src="/logo-aik.png"
              alt="AIK Network"
              width={140}
              height={48}
              className="h-10 w-auto bg-transparent"
              priority
            />
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              asChild
              size="sm"
              className="bg-blue-700 hover:bg-blue-800"
            >
              <Link
                href={chamados.openTicket}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir chamado
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link
                href={chamados.technicianLogin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Técnicos
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="#contato">Orçamento</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Soluções de Infraestrutura de TI e Telefonia VoIP
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Modernize sua infraestrutura de TI e reduza custos com as
                  soluções completas da AIK Network.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row flex-wrap">
                <Button asChild size="lg">
                  <Link href="#servicos">
                    Nossos Serviços
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#contato">Fale Conosco</Link>
                </Button>
              </div>
            </div>
            <img
              src="/aik.svg?height=400&width=600"
              alt="Infraestrutura de TI moderna"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              width={600}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Nossos Serviços
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Soluções completas para modernizar sua infraestrutura de TI e
                comunicação
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Infraestrutura de TI</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Instalação e organização de cabeamento estruturado, servidores e
                equipamentos de rede.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Network className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Gerenciamento de Rede</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Configuração e manutenção de switches, roteadores e toda a
                infraestrutura de rede.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Segurança de Rede</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Proteção contra invasões e monitoramento constante para garantir
                a segurança dos seus dados.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <PhoneCall className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Telefonia VoIP</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Substituição de sistemas telefônicos tradicionais por soluções
                VoIP modernas e econômicas.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Redução de Custos</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Análise e implementação de soluções que reduzem custos
                operacionais de TI e comunicação.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M2 9.5V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5.5" />
                  <path d="M2 14.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Consultoria Especializada</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Avaliação e planejamento de infraestrutura para prefeituras e
                empresas de todos os portes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="beneficios"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Benefícios das Nossas Soluções
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Por que escolher a AIK Network para sua infraestrutura de TI e
                comunicação
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="flex flex-col space-y-2 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Redução de Custos</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Nossas soluções VoIP podem reduzir em até 70% os custos com
                telefonia em comparação com sistemas tradicionais.
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Infraestrutura Moderna</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Implementamos tecnologias atualizadas que garantem melhor
                desempenho e preparação para o futuro.
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Segurança Avançada</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Proteção contra ameaças cibernéticas com monitoramento constante
                e soluções preventivas.
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Suporte Especializado</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Equipe técnica qualificada para resolver problemas rapidamente e
                minimizar tempo de inatividade.
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Soluções Personalizadas</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Projetos desenvolvidos de acordo com as necessidades específicas
                de cada cliente.
              </p>
            </div>
            <div className="flex flex-col space-y-2 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Experiência Comprovada</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Anos de experiência atendendo prefeituras e empresas com
                soluções eficientes e confiáveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Sobre Nós
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                AIK Network
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                A AIK Network é especializada em fornecer soluções completas de
                infraestrutura de TI e comunicação para prefeituras e empresas
                de todos os portes.
              </p>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Nossa missão é modernizar a infraestrutura tecnológica de nossos
                clientes, garantindo maior eficiência, segurança e redução de
                custos através de tecnologias avançadas e serviços de alta
                qualidade.
              </p>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Com anos de experiência no mercado, nossa equipe altamente
                qualificada está preparada para enfrentar os desafios
                tecnológicos mais complexos e entregar soluções personalizadas
                que atendam às necessidades específicas de cada cliente.
              </p>
            </div>
            <Image
              src="/a.jpeg"
              alt="AIK Network"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contato"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Entre em Contato
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Solicite um orçamento ou tire suas dúvidas sobre nossos serviços
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
            <div className="flex flex-col space-y-4">
              <div className="rounded-lg border p-6 bg-background">
                <h3 className="text-xl font-bold mb-4">
                  Informações de Contato
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary mt-0.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {CONTACT.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary mt-0.5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {CONTACT.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary mt-0.5"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {CONTACT.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold mb-4">Formulário de Contato</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo-aik.png"
                  alt="AIK Network"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Soluções completas em infraestrutura de TI e comunicação para
                prefeituras e empresas.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Suporte
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={chamados.openTicket}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Abrir chamado
                  </Link>
                </li>
                <li>
                  <Link
                    href={chamados.technicianLogin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Área dos técnicos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Serviços
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#servicos"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Infraestrutura de TI
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Gerenciamento de Rede
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Segurança de Rede
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Telefonia VoIP
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Empresa
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#sobre"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contato"
                    className="text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} AIK Network. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
