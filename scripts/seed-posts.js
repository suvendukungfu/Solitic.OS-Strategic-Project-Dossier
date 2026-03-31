import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      title: 'The Digital Transformation of Regulatory Compliance',
      slug: 'digital-transformation-regulatory-compliance',
      excerpt: 'How data analytics and AI are reshaping the landscape of legal and strategic advisory in 2026.',
      content: JSON.stringify({
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Navigating the Future' }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'In an era of unprecedented rapid change, regulatory compliance is no longer a static obligation. It has become a dynamic competitive advantage for corporations that can leverage technology to anticipate risks before they materialize.' }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'At Solitic Consulting, we are at the forefront of this evolution, integrating advanced data analytics into traditional legal advisory frameworks.' }]
          }
        ]
      }),
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      tags: 'Innovation,LegalTech,Compliance',
      status: 'PUBLISHED'
    },
    {
      title: 'Strategic Alliances in Global Markets',
      slug: 'strategic-alliances-global-markets',
      excerpt: 'Forging resilient partnerships across borders to achieve sustainable growth and market expansion.',
      content: JSON.stringify({
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Beyond Borders' }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Success in the international arena requires more than just capital; it requires deep cultural and legal integration.' }]
          }
        ]
      }),
      coverImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop',
      tags: 'GlobalBusiness,Strategy,Partnerships',
      status: 'PUBLISHED'
    },
    {
      title: 'Understanding Modern Corporate Governance',
      slug: 'understanding-modern-corporate-governance',
      excerpt: 'A comprehensive guide to ethics, accountability, and the new standards for board-level decision-making.',
      content: JSON.stringify({
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Accountability First' }]
          }
        ]
      }),
      coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
      tags: 'Governance,Ethics,Business',
      status: 'PUBLISHED'
    }
  ];

  for (const postData of posts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    });
  }

  console.log('Blog posts seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
