import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';
import { siteConfig } from '../../../lib/site';

// NOTE: Using Resend for email. Alternatively use Nodemailer with Gmail SMTP.
// If RESEND_API_KEY is set, it uses Resend. Otherwise falls back to a logged notification.
// For production, set RESEND_API_KEY in your .env file.

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

// Resilient Email Retry Utility
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`⚠️  Email attempt ${i + 1} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw lastError;
}

// SaaS-Grade In-Memory Rate Limiter (Prevent Spam)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3; 

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  
  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(ip, userData);
    return false;
  }
  
  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  userData.count += 1;
  rateLimitMap.set(ip, userData);
  return false;
}

function buildAdminEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; margin: 0; padding: 0; background-color: #f9f7f4; color: #1a1a1a; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e8e0d0; overflow: hidden; }
    .header { background: #1a1a1a; color: #c9a84c; padding: 40px 48px; text-align: left; }
    .brand { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; }
    .badge { font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8; }
    .body { padding: 48px; }
    .meta { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 32px; border-bottom: 1px solid #f0ebe0; padding-bottom: 16px; }
    .field { margin-bottom: 24px; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #888; margin-bottom: 6px; }
    .value { font-size: 15px; color: #1a1a1a; line-height: 1.5; }
    .message-box { background: #f9f7f4; border-left: 3px solid #c9a84c; padding: 24px; margin-top: 32px; font-size: 16px; line-height: 1.7; color: #1a1a1a; }
    .footer { padding: 32px 48px; background: #fcfbf9; text-align: center; border-top: 1px solid #f0ebe0; }
    .cta { display: inline-block; background: #c9a84c; color: #ffffff; padding: 14px 32px; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">Solitic.OS</div>
      <div class="badge">Strategic Inquiry</div>
    </div>
    <div class="body">
      <div class="meta">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
      
      <div class="field">
        <div class="label">Consulting Candidate</div>
        <div class="value"><strong>${data.name}</strong> (${data.email})</div>
      </div>

      ${data.company ? `
      <div class="field">
        <div class="label">Organization</div>
        <div class="value">${data.company}</div>
      </div>` : ''}

      <div class="field">
        <div class="label">Subject of Interest</div>
        <div class="value">${data.subject}</div>
      </div>

      <div class="message-box">
        ${data.message.replace(/\n/g, '<br>')}
      </div>

      <div style="margin-top: 48px; text-align: center;">
        <a href="mailto:${data.email}?subject=Re: ${data.subject}" class="cta">Review and Respond →</a>
      </div>
    </div>
    <div class="footer">
      <div style="font-size: 10px; letter-spacing: 2px; color: #aaa; text-transform: uppercase;">
        Solitic Hub · Confidential Intelligence Dispatch
      </div>
    </div>
  </div>
</body>
</html>`;
}

function buildUserConfirmHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; margin: 0; padding: 0; background-color: #f9f7f4; color: #1a1a1a; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e8e0d0; overflow: hidden; }
    .header { background: #1a1a1a; color: #c9a84c; padding: 40px 48px; text-align: center; }
    .brand { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; }
    .badge { font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8; }
    .body { padding: 48px; text-align: center; }
    .icon { font-size: 32px; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 800; margin: 0 0 16px; color: #1a1a1a; }
    p { font-size: 16px; line-height: 1.7; color: #555; margin-bottom: 32px; }
    .quote { background: #f9f7f4; border-left: 3px solid #c9a84c; padding: 20px; text-align: left; font-style: italic; color: #888; font-size: 14px; }
    .footer { padding: 32px 48px; background: #fcfbf9; text-align: center; border-top: 1px solid #f0ebe0; font-size: 11px; color: #aaa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">Solitic.OS</div>
      <div class="badge">Inquiry Acknowledged</div>
    </div>
    <div class="body">
      <div class="icon">✓</div>
      <h1>Inquiry Received, ${data.name.split(' ')[0]}.</h1>
      <p>
        Your inquiry regarding <strong>${data.subject}</strong> has been successfully transmitted to our strategic lead team. 
        Expect a formal response within 24 business hours.
      </p>
      <div class="quote">
        "${data.message.substring(0, 140)}${data.message.length > 140 ? '...' : ''}"
      </div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Solitic Consulting · 91-9760825111 · solitic.in
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // 0. Rate Limiting Security
    if (isRateLimited(ip)) {
      console.warn(`🛡️  Rate limit triggered for IP: ${ip}`);
      return NextResponse.json(
        { message: 'Too many inquiries. Please wait an hour before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    
    // 1. Validate Input & Honeypot
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, company, subject, message, website } = validation.data;

    // Reject non-empty honeypot (Spam protection)
    if (website) {
      console.warn('🍯 Spam submission caught by honeypot.');
      return NextResponse.json({ message: 'Message received (Spam Filtered)' }, { status: 200 }); // Stealth rejection
    }

    // 2. Store in Database (Prisma)
    // NOTE: This requires 'npx prisma db push' to have been run
    let savedContact;
    try {
      savedContact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
          company,
          subject,
          message,
        },
      });
      console.log('✅ Contact message saved to DB:', savedContact.id);
    } catch (dbError) {
      console.error('❌ Database storage error:', dbError);
      // We continue even if DB fails, as email delivery is higher priority for "lossless" messaging
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = process.env.CONTACT_TO_EMAIL || siteConfig.email;
    const FROM_NAME = process.env.CONTACT_FROM_NAME || 'Solitic.OS Intelligence';
    const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    // 3. Email Delivery Orchestration (with built-in Retries)
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      try {
        console.log('\n--- 📨 Resend Transmission Audit ---');
        const results = await withRetry(async () => {
          // Notification to Admin
          const adminEmail = await resend.emails.send({
            from: `${FROM_NAME} <${FROM_EMAIL}>`,
            to: [ADMIN_EMAIL],
            replyTo: email,
            subject: `[Intelligence Hub] ${subject} — from ${name}`,
            html: buildAdminEmailHtml({ name, email, phone, company, subject, message }),
          });

          // Confirmation to User (Auto-Reply)
          const userEmail = await resend.emails.send({
            from: `Solitic Consulting <${FROM_EMAIL}>`,
            to: [email],
            subject: 'Inquiry Received — Solitic Consulting',
            html: buildUserConfirmHtml({ name, email, phone, company, subject, message }),
          });

          return { adminEmail, userEmail };
        });

        console.log('📦 AUTHENTICATED (Resend):', JSON.stringify(results, null, 2));
        
        if (results.adminEmail.error || results.userEmail.error) {
          console.error('⚠️  PROVIDER REJECTION:', results.adminEmail.error || results.userEmail.error);
        } else {
          console.log('✅ Emails strictly dispatched via Resend');
        }
      } catch (emailError) {
        console.error('❌ Resend critical failure:', JSON.stringify(emailError, null, 2));
        throw new Error(`Email provider error: ${emailError instanceof Error ? emailError.message : 'Unknown rejection'}`);
      }
    } else if (process.env.SMTP_HOST) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        debug: true, // Deep SMTP logging
        logger: true, // Exhaustive handshake reporting
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      console.log('\n--- 🛰️ SMTP Diagnostic Audit ---');
      try {
        await transporter.verify();
        console.log('🤝 SMTP Handshake: AUTHENTICATED');

        await transporter.sendMail({
          from: `"Solitic Website" <${process.env.SMTP_USER}>`,
          to: ADMIN_EMAIL,
          replyTo: email,
          subject: `[Web Inquiry] ${subject} — from ${name}`,
          html: buildAdminEmailHtml({ name, email, phone, company, subject, message }),
        });

        await transporter.sendMail({
          from: `"Solitic Consulting" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'We received your message — Solitic Consulting',
          html: buildUserConfirmHtml({ name, email, phone, company, subject, message }),
        });
        
        console.log('✅ Emails strictly dispatched via SMTP');
      } catch (smtpError) {
        console.error('❌ SMTP CONNECTION FAILURE:', smtpError);
        throw new Error('Our mail relay refused the connection. This is likely an auth/credential restriction.');
      }
    } else {
      // PROHIBITED: "Fake" logging is no longer allowed as per production integrity requirements.
      console.warn('🚨 FATAL: No email provider (Resend/SMTP) configured in .env');
      throw new Error('CRITICAL CONFIGURATION ERROR: No email provider detected. Set RESEND_API_KEY to activate.');
    }

    return NextResponse.json({
      message: 'Strategic inquiry received. Our team will respond within 24 business hours.',
    });

  } catch (error) {
    console.error('Contact form critical failure:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Transmission failure. Please reach us directly at contact@solitic.in' },
      { status: 500 }
    );
  }
}
