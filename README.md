# AIK Network - Website Corporativo

Este é o website corporativo da AIK Network, uma empresa especializada em soluções de infraestrutura de TI e telefonia VoIP.

## Funcionalidades

- ✅ Landing page responsiva
- ✅ Seções: Hero, Serviços, Benefícios, Sobre, Contato
- ✅ Formulário de contato funcional com envio de email
- ✅ Sistema de notificações (toast)
- ✅ Validação de formulário
- ✅ Design moderno com Tailwind CSS
- ✅ Componentes reutilizáveis com shadcn/ui

## Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Nodemailer** - Envio de emails
- **Zod** - Validação de dados
- **Lucide React** - Ícones

## Instalação

1. Clone o repositório:
\`\`\`bash
git clone <url-do-repositorio>
cd aik-network
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
Copie o arquivo `.env.local` e configure suas credenciais de email:

\`\`\`env
EMAIL_SERVER=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-senha-de-app
EMAIL_FROM=seu-email@gmail.com
EMAIL_TO=andre@aiknetwork.com.br
\`\`\`

4. Execute o projeto:
\`\`\`bash
npm run dev
\`\`\`

## Configuração do Email

Para usar o Gmail como servidor de email:

1. Ative a autenticação de dois fatores na sua conta Google
2. Gere uma senha de aplicativo em: https://myaccount.google.com/apppasswords
3. Use essa senha no campo `EMAIL_PASSWORD`

## Estrutura do Projeto

\`\`\`
aik-network/
├── app/
│   ├── actions/
│   │   └── send-email.ts      # Server Action para envio de email
│   ├── globals.css            # Estilos globais
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página inicial
├── components/
│   ├── ui/                    # Componentes UI (shadcn)
│   └── contact-form.tsx       # Formulário de contato
├── hooks/
│   └── use-toast.ts           # Hook para notificações
├── lib/
│   └── utils.ts               # Utilitários
└── public/                    # Arquivos estáticos
\`\`\`

## Deploy

Este projeto pode ser facilmente deployado na Vercel:

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push

## Licença

© 2024 AIK Network. Todos os direitos reservados.
\`\`\`

## Projeto Completo Criado! 🎉

Agora você tem um projeto Next.js completo e funcional da AIK Network com:

### ✅ **Funcionalidades Implementadas:**
- Landing page responsiva e moderna
- Formulário de contato com envio de email funcional
- Sistema de notificações toast
- Validação completa de formulário
- Design profissional com Tailwind CSS

### 📁 **Estrutura Completa:**
- Configurações do Next.js, TypeScript e Tailwind
- Componentes UI reutilizáveis
- Server Actions para envio de email
- Sistema de hooks personalizado
- Arquivos de configuração prontos

### 🚀 **Como Usar:**

1. **Baixe o código** clicando no botão "Download Code" no canto superior direito
2. **Instale as dependências:** `npm install`
3. **Configure o email** no arquivo `.env.local`
4. **Execute o projeto:** `npm run dev`

### 📧 **Configuração de Email:**
O projeto está configurado para usar Gmail. Você precisará:
- Ativar autenticação de dois fatores
- Gerar uma senha de aplicativo
- Configurar as variáveis no `.env.local`

O projeto está pronto para produção e pode ser deployado diretamente na Vercel!
