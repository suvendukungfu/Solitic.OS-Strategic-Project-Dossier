import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

async function sendHeartbeat() {
  console.log('\n💓 Solitic.OS Resend Heartbeat Diagnostic');
  console.log('═══════════════════════════════════════════');

  // 1. Manually load .env (since this is a standalone script)
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ FATAL: .env file not found.');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envLine = envContent.split('\n').find(line => line.trim().startsWith('RESEND_API_KEY='));
  
  if (!envLine) {
    console.error('❌ FATAL: RESEND_API_KEY not found in .env');
    return;
  }

  const apiKey = envLine.split('=')[1].replace(/["']/g, '').trim();

  if (!apiKey || apiKey.includes('re_xxxx')) {
    console.warn('⚠️  HINT: You haven\'t replaced the placeholder key in your .env yet.');
    console.warn('   Get your key from https://resend.com and paste it in .env');
    return;
  }

  const resend = new Resend(apiKey);
  const ADMIN_EMAIL = 'contact@solitic.in';

  console.log('📡 ATTEMPTING HEARTBEAT TRANSMISSION...');
  console.log(`TO: ${ADMIN_EMAIL}`);
  console.log('FROM: Solitic Consulting <onboarding@resend.dev>');

  try {
    const { data, error } = await resend.emails.send({
      from: 'Solitic Consulting <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: '💓 RESEND HEARTBEAT — Solitic.OS Diagnostic',
      html: `
        <div style="font-family: sans-serif; padding: 40px; background: #f9f7f4; border: 1px solid #e8e0d0;">
          <h1 style="color: #1a1a1a;">💓 Resend Active.</h1>
          <p style="color: #555; line-height: 1.6;">
            This is an automated heartbeat from the <strong>Solitic.OS Diagnostic Utility</strong>.<br>
            If you received this message, your Resend API integration is fully functional.
          </p>
          <div style="margin-top: 20px; padding: 12px; background: #fff; border-left: 4px solid #C9A84C; font-size: 13px; color: #888;">
            Transmission ID: ${new Date().getTime()}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('\n❌ PROVIDER REJECTION:');
      console.error(JSON.stringify(error, null, 2));
      console.log('\n💡 Tip: If you get a 403, ensure your Resend key is correct.');
    } else {
      console.log('\n✅ TRANSMISSION DISPATCHED SUCESSFULLY!');
      console.log('📦 AUTH PAYLOAD:', JSON.stringify(data, null, 2));
      console.log('\n👉 Final Step: Check your inbox at contact@solitic.in');
    }
  } catch (err) {
    console.error('\n❌ CRITICAL API FAILURE:');
    console.error(err);
  }
}

sendHeartbeat();
