import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/schemas/contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Dados de entrada inválidos.",
        errors: result.error.flatten()
      }, { status: 400 });
    }

    const { name, email, message } = result.data;

    // TODO: Implementar a lógica real de contato aqui (ex: enviar email, salvar em CRM, webhook).
    // Para a landing page, podemos simular o envio ou integrar com um serviço de e-mail como SendGrid/Resend.
    console.log(`Novo contato recebido: Nome - ${name}, Email - ${email}, Mensagem - ${message || 'N/A'}`);

    // Simular uma operação bem-sucedida
    // await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      message: "Sua mensagem foi enviada com sucesso! Em breve entraremos em contato."
    }, { status: 200 });

  } catch (error) {
    console.error("Erro ao processar a requisição de contato:", error);
    return NextResponse.json({
      message: "Ocorreu um erro interno ao processar sua solicitação."
    }, { status: 500 });
  }
}
