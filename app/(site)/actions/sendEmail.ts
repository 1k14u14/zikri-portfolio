'use server';

import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // 1. Strict Validation: Check for empty fields
  if (!name || !email || !message) {
    return { error: 'Please fill out all fields.' };
  }

  // 2. Strict Validation: Check if it is a valid email format using Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  try {
    await resend.emails.send({
      // Update this 'from' address once you verify a domain in Resend!
      from: 'Portfolio Contact <onboarding@resend.dev>', 
      to: '1k14u14@gmail.com',
      replyTo: email, // THE FIX: Now when you hit "Reply" in Gmail, it goes to the client!
      subject: `New Portfolio Message from ${name}`,
      text: `Sender Email: ${email}\n\nMessage:\n${message}`,
    });

    return { success: 'Your message was sent successfully!' };
  } catch (error) {
    return { error: 'Failed to send the message. Please try again later.' };
  }
}