const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRAFTS = [
  // Editorial (4)
  {
    title: "The Great Decoupling: Strategic Sovereignty in 2026",
    slug: "great-decoupling-2026",
    category: "Strategy",
    layoutType: "editorial",
    fonts: "playfair",
    author: "Dr. Alistair Thorne",
    excerpt: "An investigation into the fragmentation of global supply chains and the emergence of institutional self-reliance.",
    content: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "THE END OF EFFICIENCY" }] },
        { type: "paragraph", content: [{ type: "text", text: "For decades, the global order was governed by the pursuit of absolute efficiency. Every link in the chain was optimized, regardless of geographical or political risk. But the landscape has shifted. Today, we are witnessing the Great Decoupling." }] },
        { type: "paragraph", content: [{ type: "text", text: "Strategic sovereignty is no longer a luxury; it is a necessity for survival. Companies are now internalizing critical assets, moving from 'just-in-time' to 'just-in-case' logic. This shift represents a fundamental transformation of the corporate mindset." }] },
        { type: "blockquote", content: [{ type: "text", text: "Sovereignty is the ultimate hedge against volatility." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Institutional Resilience: A Post-AI Corporate Framework",
    slug: "institutional-resilience-ai",
    category: "Technology",
    layoutType: "editorial",
    fonts: "merriweather",
    author: "Elena Vance",
    excerpt: "How established giants are restructuring to accommodate the rapid erosion of traditional management layers.",
    content: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "THE AUTOMATION OF MANAGEMENT" }] },
        { type: "paragraph", content: [{ type: "text", text: "The first wave of AI replaced labor. The second wave is replacing coordination. In the post-AI corporation, the middle manager is an algorithm. Strategy, once the domain of human intuition, is now an iterative loop between silicon and consciousness." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The New Fiscal Frontier: Institutional Crypto",
    slug: "fiscal-frontier-crypto",
    category: "Finance",
    layoutType: "editorial",
    fonts: "fira",
    author: "Marcus Aurelius",
    excerpt: "Analyzing the movement of sovereign wealth into decentralized ledgers and the implications for global banking.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "The vault is moving. As central banks explore digital currencies, the barrier between private ledgers and institutional finance is dissolving. We are entering the Golden Era of digital assets, where value is measured in cryptographic proof rather than faith." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The Silicon Silk Road: Logistics at Light Speed",
    slug: "silicon-silk-road",
    category: "Strategy",
    layoutType: "editorial",
    fonts: "playfair",
    author: "Chen Wei",
    excerpt: "Mapping the new physical infrastructure of the digital age.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Data may be digital, but the hardware that drives it remains physical. The new Silk Road is built of fiber optics and automated ports, connecting the silicon mines to the server farms in milliseconds." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1493946747174-75c8b2d212a4?auto=format&fit=crop&q=80&w=1600"
  },

  // Magazine (4)
  {
    title: "The Architecture of Ambition: Solitic HQ",
    slug: "architecture-ambition-solitic",
    category: "Strategy",
    layoutType: "magazine",
    fonts: "poppins",
    author: "Julian Sterling",
    excerpt: "A deep dive into the design philosophy behind the world's most exclusive strategic hub.",
    content: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "GLYPHS OF POWER" }] },
        { type: "paragraph", content: [{ type: "text", text: "When you enter the Solitic Atrium, you aren't just in a building. You are inside a statement. Glass, steel, and gold converge to create a space where decisions carry the weight of history." }] },
        { type: "blockquote", content: [{ type: "text", text: "Design is strategy made visible." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Visions of Tomorrow: The AI Renaissance",
    slug: "visions-tomorrow-ai",
    category: "Technology",
    layoutType: "magazine",
    fonts: "inter",
    author: "Sofia Chen",
    excerpt: "Where creativity meets computation. Exploring the aesthetic shift in the age of generative intelligence.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "We are no longer just using tools. We are collaborating with entities. The Renaissance wasn't just about art; it was about the rediscovery of human potential. AI is our second renaissance." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Silent Luxury: The New Global Aesthetic",
    slug: "silent-luxury-aesthetic",
    category: "Strategy",
    layoutType: "magazine",
    fonts: "playfair",
    author: "Isabella Rossi",
    excerpt: "Why the modern elite are moving away from logos and towards high-fidelity experience.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Logos are loud. Privacy is silent. In an age of total surveillance and social media noise, true luxury is the ability to disappear into quality." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1600607687940-4c20c6e09a33?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The Quantum Zenith: Beyond the Cloud",
    slug: "quantum-zenith",
    category: "Technology",
    layoutType: "magazine",
    fonts: "poppins",
    author: "Alex Rivers",
    excerpt: "Entering the era of probabilistic computing.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "The cloud was just the beginning. The next frontier is quantum—a realm where bits don't just exist, they coexist in a state of infinite possibility." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600"
  },

  // Minimal (4)
  {
    title: "Minimalism as Strategy",
    slug: "minimalism-as-strategy",
    category: "Strategy",
    layoutType: "minimal",
    fonts: "inter",
    author: "Paul Rand",
    excerpt: "The power of saying no to 'good' opportunities to say yes to 'great' ones.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "A cluttered calendar is a sign of a cluttered strategy. The most successful leaders aren't the ones who do the most; they are the ones who do the things that matter the most. Strategy is the art of sacrifice." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The Art of the Pivot",
    slug: "art-of-pivot",
    category: "Startups",
    layoutType: "minimal",
    fonts: "poppins",
    author: "Eric Ries",
    excerpt: "When to hold on and when to let go. Navigating the delicate balance of persistence and vision.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "A pivot is not a failure. It is a refinement based on data. The best startups treat their initial idea as a hypothesis to be tested, not a doctrine to be followed." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Focus: The Only Productivity Hack",
    slug: "focus-productivity-hack",
    category: "Leadership",
    layoutType: "minimal",
    fonts: "merriweather",
    author: "Cal Newport",
    excerpt: "Deep work is the only competitive advantage in an increasingly shallow world.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Multitasking is a myth. Every context switch carries a cost. If you want to produce world-class results, you must carve out time for singular focus." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Quiet Power",
    slug: "quiet-power",
    category: "Leadership",
    layoutType: "minimal",
    fonts: "inter",
    author: "Susan Cain",
    excerpt: "The virtue of the introvert in a noisy boardroom.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Influence is not measured in decibels. The quietest voice in the room is often the most considered. Mastery of silence is a leadership superpower." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
  },

  // Spotlight (4)
  {
    title: "The Maverick: A Profile of Innovation",
    slug: "maverick-profile-innovation",
    category: "Leadership",
    layoutType: "spotlight",
    fonts: "poppins",
    author: "Sarah Connor",
    excerpt: "How one leader disrupted an entire industry by breaking the rules of engagement.",
    content: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "BREAKING THE MOLD" }] },
        { type: "paragraph", content: [{ type: "text", text: "They said it couldn't be done. They said the market wasn't ready. But Sarah didn't listen. She knew that to build something new, you have to be willing to be misunderstood for a long time." }] },
        { type: "blockquote", content: [{ type: "text", text: "Innovation is the byproduct of defiance." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1519085185753-b211370d4b44?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Golden Dynasty: Making of an Empire",
    slug: "golden-dynasty-making",
    category: "Strategy",
    layoutType: "spotlight",
    fonts: "playfair",
    author: "The Strategist",
    excerpt: "The untold story of Solitic's rise to the pinnacle of global consulting.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "It didn't happen overnight. It happened through thousands of small, disciplined choices. The Golden Dynasty wasn't built on luck; it was built on a relentless commitment to excellence." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Against All Odds: Startup Survival",
    slug: "against-all-odds-survival",
    category: "Startups",
    layoutType: "spotlight",
    fonts: "inter",
    author: "Jack Dorsey",
    excerpt: "A tactical guide to navigating the 'Trough of Sorrow' and emerging as a unicorn.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Survival is the primary goal of any early-stage startup. If you can stay alive long enough to learn from your mistakes, you've already won half the battle." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The Archivist: Preserving History",
    slug: "archivist-preserving-history",
    category: "Strategy",
    layoutType: "spotlight",
    fonts: "playfair",
    author: "Leonard Nimoy",
    excerpt: "The man responsible for every institutional record in the Solitic vault.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Information is fragile. History is written by the victors, but preserved by the diligent. Leonard's job is to ensure that the strategic records remain immutable for centuries." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1600"
  },

  // Report (4)
  {
    title: "Q3 2026 Strategic Intelligence Brief",
    slug: "q3-2026-intel-brief",
    category: "Strategy",
    layoutType: "report",
    fonts: "inter",
    author: "Solitic Intelligence Unit",
    excerpt: "Quarterly assessment of global market risks and emerging opportunities in the tech sector.",
    content: {
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "EXECUTIVE SUMMARY" }] },
        { type: "paragraph", content: [{ type: "text", text: "The third quarter of 2026 has been characterized by unprecedented volatility in the semiconductor market. However, our analysis shows that this is a temporary correction rather than a long-term trend." }] },
        { type: "blockquote", content: [{ type: "text", text: "Risk is information reflected in price." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "M&A Sector Analysis: Technology",
    slug: "m-a-tech-analysis",
    category: "Finance",
    layoutType: "report",
    fonts: "fira",
    author: "M&A Desk",
    excerpt: "Detailed mapping of consolidation trends in the artificial intelligence and hardware domains.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Consolidation is accelerating as incumbents look to protect their margins by acquiring innovative upstarts. We expect to see a 40% increase in deal volume by the end of the year." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Global Compliance Risk Assessment",
    slug: "global-compliance-risk",
    category: "Strategy",
    layoutType: "report",
    fonts: "merriweather",
    author: "Institutional Review Board",
    excerpt: "Evaluating the impact of new international data privacy laws on multinational operations.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "The regulatory landscape is becoming increasingly complex. Organizations must implement a unified compliance framework to avoid significant penalties and reputational damage." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c7377bc586df?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Post-Disruption Recovery: Analysis",
    slug: "post-disruption-recovery",
    category: "Strategy",
    layoutType: "report",
    fonts: "inter",
    author: "Resilience Taskforce",
    excerpt: "A comparative study of recovery speed vs. institutional agility.",
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Agility is the ability to change direction without losing momentum. Our data shows that decentralized organizations recover twice as fast as their centralized counterparts after a major market shock." }] }
      ]
    },
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1454165833267-028cc21a7d6b?auto=format&fit=crop&q=80&w=1600"
  }
];

async function seed() {
  console.log('--- SEEDING 20 STRATEGIC DRAFTS ---');
  for (const draft of DRAFTS) {
    try {
      await prisma.post.create({
        data: {
          ...draft,
          content: draft.content
        }
      });
      console.log(`Created: ${draft.title}`);
    } catch (e) {
      console.error(`Error creating ${draft.title}:`, e.message);
    }
  }
  console.log('--- SEEDING COMPLETE ---');
  process.exit(0);
}

seed();
