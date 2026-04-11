const DEFAULT_SITE_URL = 'http://localhost:3000';

function normalizeSiteUrl(value?: string | null) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  return value.replace(/\/+$/, '');
}

export const siteConfig = {
  name: 'Solitic Consulting',
  shortName: 'Solitic',
  description:
    'Strategic legal counsel, corporate advisory, and editorial intelligence for modern businesses.',
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL,
  ),
  email: 'contact@solitic.in',
  phone: '+91-9760825111',
  instagram: 'https://www.instagram.com/solitic.consulting?igsh=MW85OXBhbnh6anlpOQ%3D%3D&utm_source=qr',
  locale: 'en_IN',
};

export function absoluteUrl(path = '/') {
  if (!path || path === '/') {
    return siteConfig.url;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
