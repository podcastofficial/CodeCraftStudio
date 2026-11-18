export const services = [
  {
    title: "Websites & Landing Pages",
    icon: "⌘",
    summary: "Professional, responsive websites that present your brand and convert visitors into customers.",
    details: "Business websites, portfolios, agency sites, landing pages, blogs, directories and multi-page websites."
  },
  {
    title: "E-commerce & Online Stores",
    icon: "▤",
    summary: "Online shopping experiences designed around your products, customers and operations.",
    details: "Product catalogues, shopping carts, checkout flows, order management, vendor stores and marketplaces."
  },
  {
    title: "Web Applications & SaaS",
    icon: "▣",
    summary: "Custom browser-based platforms that turn complex workflows into simple user experiences.",
    details: "SaaS products, subscription platforms, customer portals, booking systems, learning platforms and business tools."
  },
  {
    title: "Mobile Apps & PWA",
    icon: "▯",
    summary: "Mobile-first applications and installable web experiences for customers and teams.",
    details: "Android/iOS app projects, progressive web apps, cross-platform experiences and app-connected backends."
  },
  {
    title: "Telegram Bots & Mini Apps",
    icon: "◎",
    summary: "Telegram-native products, interactive Mini Apps and bots that automate useful work.",
    details: "Business bots, community tools, support bots, alerts, games, payment flows, dashboards and Telegram Web App integrations."
  },
  {
    title: "AI-Powered Applications",
    icon: "✳",
    summary: "Practical AI features integrated into products, workflows and customer experiences.",
    details: "AI assistants, chat interfaces, document tools, knowledge search, content workflows and integrations with suitable AI models or self-hosted systems."
  },
  {
    title: "Admin Panels & Dashboards",
    icon: "▦",
    summary: "Clear control centres for managing users, content, transactions and business operations.",
    details: "Admin dashboards, analytics panels, reporting tools, role-based portals and internal management systems."
  },
  {
    title: "Backend, APIs & Integrations",
    icon: "⌘",
    summary: "The reliable server-side foundations that connect your product and its data.",
    details: "REST APIs, authentication, databases, payment integrations, third-party services, webhooks and custom backend systems."
  },
  {
    title: "Business Automation",
    icon: "↗",
    summary: "Reduce repetitive work by connecting tools, events, notifications and business processes.",
    details: "Workflow automation, scheduled jobs, alerts, data sync, lead routing, reporting and custom automation bots."
  },
  {
    title: "Blockchain & Web3",
    icon: "◇",
    summary: "Blockchain-connected applications and monitoring tools built to your product requirements.",
    details: "Wallet integrations, token and contract monitoring, on-chain activity trackers, Web3 dashboards and blockchain API integrations."
  },
  {
    title: "CRM, ERP & Booking Systems",
    icon: "▧",
    summary: "Purpose-built systems to organise customers, teams, appointments and operations.",
    details: "CRM tools, inventory and order systems, appointment booking, staff portals, service management and lightweight ERP solutions."
  },
  {
    title: "Custom Software & Platforms",
    icon: "✧",
    summary: "A tailored digital solution when your idea does not fit a ready-made category.",
    details: "Education, finance, logistics, healthcare administration, real estate, travel, media, community and industry-specific platforms."
  }
];

export const projectCategories = [
  "Business & corporate websites",
  "E-commerce stores & marketplaces",
  "SaaS platforms & subscriptions",
  "Mobile apps & progressive web apps",
  "Telegram bots, Mini Apps & games",
  "AI assistants & AI-powered tools",
  "Admin panels & analytics dashboards",
  "CRM, ERP & inventory systems",
  "Booking, appointment & service platforms",
  "APIs, backend systems & integrations",
  "Workflow automation & notification systems",
  "Blockchain, Web3 & crypto tools",
  "Education & e-learning platforms",
  "Finance, fintech & payment experiences",
  "Real estate, travel & directory platforms",
  "Community, content & membership platforms"
];

export const starterProjects = [
  { title: "Pulse Fitness", category: "Business Website", slug: "pulse-fitness", description: "A premium gym website with class schedule, membership pricing toggle, testimonials and FAQ.", technologies: ["HTML","CSS","JavaScript"], demo_url: "/demos/pulse-fitness.html", github_url: "", featured: true },
  { title: "Northwind Store", category: "E-commerce", slug: "northwind-store", description: "An online store with category filters, cart drawer, quantity controls and a free-shipping progress bar.", technologies: ["HTML","CSS","JavaScript"], demo_url: "/demos/northwind-store.html", github_url: "", featured: true },
  { title: "Orbit Wallet", category: "Telegram Mini App", slug: "orbit-miniapp", description: "A Telegram Mini App style wallet with live balance, top-ups, transfers and activity feed.", technologies: ["Telegram Web Apps","JavaScript"], demo_url: "/demos/orbit-miniapp.html", github_url: "", featured: true },
  { title: "Lena Voss Photography", category: "Portfolio", slug: "lena-voss-photography", description: "An editorial photographer portfolio with category filters and a full-screen photo preview.", technologies: ["HTML","CSS","JavaScript"], demo_url: "/demos/lena-voss-photography.html", github_url: "", featured: true },
  { title: "Haven Estates", category: "Real Estate", slug: "haven-estates", description: "A real estate listing site with city filters, price sorting and a viewing request form.", technologies: ["HTML","CSS","JavaScript"], demo_url: "/demos/haven-estates.html", github_url: "", featured: true },
  { title: "Blockchain Tracker", category: "Web3 Platform", slug: "blockchain-tracker", description: "A blockchain monitoring product concept for tracking supported networks, wallet addresses and on-chain activity.", technologies: ["Next.js", "TypeScript", "Blockchain APIs"], demo_url: "", github_url: "", featured: true },
  { title: "Telegram Mini App", category: "Telegram Mini App", slug: "telegram-mini-app", description: "A Telegram-first application experience with a responsive interface and connected backend workflows.", technologies: ["Telegram Web Apps", "React", "API"], demo_url: "", github_url: "", featured: true },
  { title: "Custom Telegram Bot", category: "Automation", slug: "custom-telegram-bot", description: "A bot workflow concept designed to automate repetitive tasks and deliver useful notifications.", technologies: ["Node.js", "Telegram Bot API", "PostgreSQL"], demo_url: "", github_url: "", featured: true }
];

// Prices are in USD. PLACEHOLDER starting prices: edit them to your real rates. Leave empty to show "Custom quote".
export const packages = [
  { name: "Starter", price: "From $100", forWho: "Individuals and small businesses that need a clean online presence.", features: ["Responsive landing page or small website", "Contact / inquiry form", "Basic SEO setup", "Deployment on your domain"], featured: false },
  { name: "Business", price: "From $300", forWho: "Growing businesses, startups and Telegram-first products.", features: ["Multi-page website or Telegram Mini App", "Admin panel for content", "Database and integrations", "Telegram or email notifications", "Post-launch support period"], featured: true },
  { name: "Custom", price: "From $1,000", forWho: "Complex platforms, SaaS, AI tools and automation systems.", features: ["Requirement workshop and scoping", "Custom backend, APIs and dashboards", "Third-party and payment integrations", "Milestone-based delivery"], featured: false }
];

export const faqs = [
  { q: "How do I start a project?", a: "Message us on Telegram with your idea. We review it, ask a few questions and reply with an approach, timeline and quote." },
  { q: "How much does a project cost?", a: "Prices start from $100 for a simple site and go up with features, integrations and timeline. After understanding your requirements we give a fixed or milestone-based quote in USD before any work begins." },
  { q: "How long does it take?", a: "A simple website can take days to a couple of weeks. Larger apps and platforms are planned in milestones so you see progress regularly." },
  { q: "Do you build Telegram bots and Mini Apps?", a: "Yes. Telegram bots, Mini Apps, payment flows and admin dashboards are one of our core services." },
  { q: "Will I own the code and the project?", a: "Ownership and handover terms are agreed in writing before the project starts." },
  { q: "Do you provide support after launch?", a: "Yes. We can agree a support or maintenance period for fixes, updates and improvements." }
];

export type Testimonial = { name: string; role: string; quote: string };
// Add only real, approved client reviews here. The section stays hidden while this list is empty.
export const testimonials: Testimonial[] = [];
