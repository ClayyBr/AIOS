import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/schemas/contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    // In a real application, you would integrate with an email service (e.g., SendGrid, Nodemailer)
    // or a CRM here. For this landing page context, we'll simulate success.
    console.log('Contact form submitted:', result.data);

    // Example of a minimal integration placeholder:
    // await sendEmail({ to: 'admin@example.com', subject: 'New Contact Form Submission', body: JSON.stringify(result.data) });

    return NextResponse.json({ success: true, message: 'Your message has been sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    // Check if the error is a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return NextResponse.json({ error: { message: 'Invalid JSON body.' } }, { status: 400 });
    }
    return NextResponse.json({ error: { message: 'An internal server error occurred.' } }, { status: 500 });
  }
}
