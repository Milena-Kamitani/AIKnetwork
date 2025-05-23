"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

// Schema de validação para o formulário
const FormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  subject: z.string().min(1, { message: "Selecione um assunto" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
})

type FormData = z.infer<typeof FormSchema>

export async function sendEmail(formData: FormData) {
  try {
    // Validar os dados do formulário
    const validatedData = FormSchema.parse(formData)

    // Configurar o transporte do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

    // Configurar o email
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@aiknetwork.com.br",
      to: process.env.EMAIL_TO || "andre@aiknetwork.com.br",
      subject: `Contato via Site: ${validatedData.subject}`,
      text: `
        Nome: ${validatedData.name}
        Email: ${validatedData.email}
        Telefone: ${validatedData.phone}
        Assunto: ${validatedData.subject}
        Mensagem: ${validatedData.message}
      `,
      html: `
        <h2>Novo contato via site</h2>
        <p><strong>Nome:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Telefone:</strong> ${validatedData.phone}</p>
        <p><strong>Assunto:</strong> ${validatedData.subject}</p>
        <p><strong>Mensagem:</strong> ${validatedData.message}</p>
      `,
    }

    // Enviar o email
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Email enviado com sucesso!" }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Dados inválidos no formulário",
        errors: error.errors.map((e) => ({ path: e.path[0], message: e.message })),
      }
    }
    return { success: false, message: "Erro ao enviar email. Tente novamente mais tarde." }
  }
}
