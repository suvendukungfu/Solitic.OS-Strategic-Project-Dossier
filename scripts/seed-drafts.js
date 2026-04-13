import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const topics = [
  { category: 'Strategy', author: 'Siddh Dhingra', tags: 'Business, Growth, Scaling' },
  { category: 'Technology', author: 'Solitic Core', tags: 'AI, Future, Automation' },
  { category: 'Finance', author: 'CA Ashish Tiwari', tags: 'Investment, Capital, Banking' },
  { category: 'Leadership', author: 'Principal Counsel', tags: 'Management, Culture, Vision' },
  { category: 'Legal', author: 'Solitic Systems', tags: 'Compliance, Law, Risk' }
];

const layouts = ['editorial', 'magazine', 'report', 'minimal', 'spotlight'];

const images = {
  editorial: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
  magazine: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop",
  report: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  minimal: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop",
  spotlight: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
};

const titles = [
  "The Future of Sovereign Wealth Funds",
  "AI Governance in High-Stakes Legal Disputes",
  "The Psychology of Institutional Leadership",
  "Capital Reallocation in the Age of Volatility",
  "Scaling Startups Without Sacrificing Equity",
  "The Hidden Costs of Corporate Non-Compliance",
  "Blockchain and the New Era of Transactional Law",
  "The Art of the Hostile Takeover Defense",
  "Modernizing the C-Suite for the 2030s",
  "The Economics of Sustainable Supply Chains",
  "Predictive Analytics in Private Equity",
  "Navigating Cross-Border M&A Regulations",
  "The Rise of the Virtual General Counsel",
  "Digital Assets and the Regulatory Frontier",
  "Strategic Pivoting in Saturated Markets",
  "The Ethics of Generative AI in Consulting",
  "Venture Debt as a Growth Catalyst",
  "Resilient Design for Global Trade Systems",
  "The Evolution of Boardroom Accountability",
  "Managing Reputation in a Hyper-Connected World",
  "De-risking Foreign Direct Investment",
  "The Hybrid Workforce: A Strategic Audit",
  "Quantum Computing and Security Protocols",
  "The Geopolitics of Energy Transition",
  "Restructuring Distressed Debt in 2026"
];

async function main() {
  console.log('--- STARTING INSTITUTIONAL SEEDING ---');
  
  // Clear existing posts to ensure a clean test environment (Optional - user said "tested with real data")
  // For a pure test, we'll just add 25 new ones.
  
  for (let i = 0; i < 25; i++) {
    const layout = layouts[i % 5];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const title = titles[i];
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: `Executive Overview: ${title}` }]
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'In this strategic brief, we analyze the current trajectories of global markets and their intersection with emerging regulatory frameworks. The objective is to provide actionable intelligence for decision-makers operating at the edge of institutional growth.' }]
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Evidence suggests that the historical models of centralization are being challenged by decentralized protocols, yet the core principles of fiduciary duty remain unchanged. We explore how these dynamics play out in real-world scenarios.' }]
        }
      ]
    };

    await prisma.post.create({
      data: {
        title,
        slug: `${slug}-${Math.random().toString(36).substring(7)}`,
        category: topic.category,
        author: topic.author,
        excerpt: `A comprehensive audit of ${title.toLowerCase()} and its implications for the current strategic cycle.`,
        content: JSON.stringify(content),
        coverImage: images[layout],
        readingTime: 5 + Math.floor(Math.random() * 10),
        featured: i % 7 === 0,
        trending: i % 5 === 0,
        status: i % 3 === 0 ? 'DRAFT' : 'PUBLISHED',
        layoutType: layout,
        tags: topic.tags,
        createdAt: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)) // Spaced out dates
      }
    });
    
    process.stdout.write(`\rSeeded Post ${i + 1}/25 - Layout: ${layout.padEnd(10)}`);
  }

  console.log('\n--- SEEDING COMPLETE ---');
}

main()
  .catch((e) => {
    console.error('\n!!! SEEDING FAILED !!!', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
