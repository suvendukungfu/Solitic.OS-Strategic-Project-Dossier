import fs from 'fs';
import path from 'path';

function verifyConfig() {
  console.log('\n🔍 Solitic.OS Configuration Audit (Communication Pipeline)');
  console.log('═══════════════════════════════════════════════════');

  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ FATAL: .env file not found in root directory.');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');

  const keys = {
    RESEND_API_KEY: { status: false, comment: 'Option A (Resend)' },
    SMTP_HOST: { status: false, comment: 'Option B (Nodemailer)' },
    SMTP_USER: { status: false, comment: 'Option B (Nodemailer)' },
    SMTP_PASS: { status: false, comment: 'Option B (Nodemailer)' },
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    // Detect keys even if they are malformed or have extra whitespace
    for (const key in keys) {
      if (trimmed.startsWith(`${key}=`)) {
        const parts = trimmed.split('=');
        if (parts.length < 2) continue;
        
        const value = parts.slice(1).join('=').replace(/["']/g, '').trim();
        if (value && !value.includes('re_xxxx')) {
          keys[key].status = true;
        }
      }
    }
  });

  let activeProvider = 'NONE';
  if (keys.RESEND_API_KEY.status) activeProvider = 'RESEND';
  else if (keys.SMTP_HOST.status && keys.SMTP_USER.status && keys.SMTP_PASS.status) activeProvider = 'SMTP';

  console.log(`📡 ACTIVE PROVIDER: ${activeProvider === 'NONE' ? '❌ NONE (System will fail)' : '✅ ' + activeProvider}`);
  
  console.log('\n--- Configuration Matrix ---');
  Object.entries(keys).forEach(([key, info]) => {
    const statusIcon = info.status ? '✅' : '❌';
    console.log(`${statusIcon} ${key.padEnd(16)} : ${info.status ? 'Populated' : 'Missing/Dummy'} (${info.comment})`);
  });

  if (activeProvider === 'NONE') {
    console.log('\n🚨 CRITICAL FAILURE DETECTED:');
    console.log('Neither Resend nor SMTP is correctly configured. The contact form is currently OFFLINE.');
    console.log('1. Visit https://resend.com to get an API key');
    console.log('2. Add RESEND_API_KEY="your-key" to your .env file');
  } else {
    console.log('\n✨ CORE CONFIGURATION VALID.');
    console.log('The system will now attempt a real-world transmission upon form submission.');
    if (activeProvider === 'RESEND') {
      console.log('💡 Note: Ensure your Resend domain is verified or use the associated account email for testing.');
    }
  }
}

verifyConfig();
