/**
 * Giles Butler - personal portfolio site config
 * Edit this file to update names, headlines, links, sections, footer, and the
 * contact form provider.
 */

export const siteConfig = {
  name: "Giles",
  tagline: "Product-minded full-stack staff engineer with frontend depth, design fluency, and creative product judgment.",
  url: "https://giles.io",
  favicon: "/favicon.svg",

  theme: {
    toggle: true,
    default: "light" as "light" | "dark",
  },

  navigation: {
    links: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about/" },
      { label: "Case Study", url: "/work/" },
    ],
    cta: { label: "Contact", url: "/contact/" },
  },

  hero: {
    nameLabel: "my name is",
    name: "Giles",
    availability: "Available for thoughtful projects",
    ctaLabel: "Get in touch",
    ctaUrl: "/contact/",
    stickers: {
      notes: [
        { lead: "Founder of", strong: "Mixo" },
        { lead: "Best at", strong: "Product + engineering" },
      ],
      role: "Staff Product Engineer",
      location: "Cotswolds 🇬🇧 - remote",
    },
    avatars: ["/avatar.jpg", "/avatar-secondary.png"],
  },

  statement: {
    partA: "I design & build",
    partB: "world class digital products",
    ctaLabel: "Get in touch",
    ctaUrl: "/contact/",
  },

  about: {
    kicker: "about me!",
    heading: "what's up",
    lead: {
      partA: "I'm Giles, a full-stack product staff engineer in the Cotswolds 🇬🇧",
      photo: "/about-inline.png",
      partB: "I",
      emphasis: "love",
      partC: "bringing product thinking, design, and engineering together.",
    },
    workspace: [
      { image: "/workspace-remote.png", caption: "the office" },
      { image: "/workspace-desk.png", caption: "my desk" },
    ],
    skills: [
      { label: "Product engineering", color: "cyan", icon: "product" },
      { label: "Frontend systems", color: "amber", icon: "system" },
      { label: "UI/UX Design", color: "magenta", icon: "grid" },
      { label: "Agentic Workflows", color: "green", icon: "robot" },
    ],
  },

  works: {
    kicker: "selected work",
    titleTop: "CASE",
    titleBottom: "STUDIES",
    note: "This is a showcase of what happens when product, design, and engineering drive the process.",
    viewLabel: "View case study",
    projectPrefix: "Case",
  },

  contact: {
    lets: "let's talk",
    text: "I'm most energized by staff product engineering roles where I can move from shaping the problem to shipping the product - with frontend depth, full-stack fluency, and a designer's eye for the details.",
    stickerLabel: "Contact",
    comment: {
      header: "Currently",
      name: "Giles",
      avatar: "/avatar.jpg",
      body: "Open to staff product engineering roles. Remote-friendly, UK/US East Coast hours, available from the Cotswolds, UK.",
      reactions: 1,
    },
  },

  footer: {
    bio: "Staff product engineer in the UK making complicated things simple. Currently taking on a few thoughtful projects.",
    availability: "Open to to new roles and projects",
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "Work", url: "/work/" },
          { label: "About", url: "/about/" },
        ],
      },
      {
        heading: "Get in touch",
        links: [
          { label: "Contact form", url: "/contact/" },
          { label: "LinkedIn", url: "https://www.linkedin.com/in/gilesbutler/" },
          { label: "Bluesky", url: "https://bsky.app/profile/giles.io" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/gilesbutler/", icon: "linkedin" },
      { label: "Bluesky", url: "https://bsky.app/profile/giles.io", icon: "bluesky" },
    ],
    copyright: "© 2026 Giles Butler.",
    backlink: { prefix: "Built with", label: "Astro", url: "https://astro.build" },
  },

  pages: {
    about: {
      kicker: "about me",
      title: "Founder, father, entrepreneur",
      subtitle: "A staff product engineer with frontend depth, full-stack fluency, a love for design, and 15+ years of shipping.",
    },
    work: {
      kicker: "selected work",
      title: "Case studies",
      subtitle: "This is a showcase of what happens when product, design, and engineering drive the process.",
    },
    contact: {
      kicker: "get in touch",
      title: "Let's talk",
      subtitle: "Open to contract work, full-time roles, and good conversations about hard problems.",
    },
  },

  timeline: {
    kicker: "the story so far",
    heading: "How I got here",
    entries: [
      {
        year: "2016 - now",
        title: "Co-Founder, Fuzzy Logic Labs",
        body: "Co-founded Fuzzy Logic Labs with Adam Arbolino. Fuzzy Logic is a digital agency and startup studio. Inside Fuzzy Logic we built Mixo, Mixvisor, Userfold and Room For Sound. I am involved in all aspects of the business from product direction, design, frontend and backend engineering, growth, support and managing the company.",
        color: "cyan",
      },
      {
        year: "2019–2022",
        title: "Co-Founder & Product Engineer, Promo.ai",
        body: "Co-founded and built an email marketing platform for Shopify merchants. I owned the product design, UX and Vue 3 frontend, including campaign creation, email templates and the component system. Built with Vuex, VueUse, Tailwind CSS and Storybook, with Shopify and SendGrid integrations. Promo.ai served thousands of paying customers.",
        color: "amber",
      },
      {
        year: "Client engagement",
        title: "Fuzzy Logic Labs x eGuarantee",
        body: "Client engagement through Fuzzy Logic Labs from Dec 2019 to Jan 2021. We built eGuarantee’s original MVP and digital underwriting application. Giles led discovery, UX design and frontend delivery with the founder, designing and building the Vue 3 application. XState modelled the application and underwriting workflow, handling applications, underwriting information, documents, payments and approvals. Integrated with a custom Node.js serverless architecture on AWS and document-processing APIs, and built supporting Astro/Vue landing pages. The company has since grown into an award-winning Australian commercial lease-bond provider.",
        color: "amber",
      },
      {
        year: "Client engagement",
        title: "Fuzzy Logic Labs x Credabl",
        body: "Client engagement through Fuzzy Logic Labs. Design, wireframing, development and updating of Credabl's WordPress site, then a full rebuild a few years later on a headless CMS (Dato) and React (Gridsome).",
        color: "green",
      },
      {
        year: "2013",
        title: "Lead Engineer, CommBank website rebuild",
        body: "Led frontend development for the rebuild of CommBank's website as lead frontend developer, managing a team of four over an approximately six-month engagement. Took the site from wireframes through to production: a 20,000-page migration, with ownership of frontend architecture and code review and coordination with design and backend teams. The bank’s CTO estimated the result saved hundreds of thousands of dollars.",
        color: "amber",
      },
      {
        year: "Various contracting",
        title: "VML, Emirates, Quiksilver, Hothouse",
        body: "Contracted through VML. Built sites and apps for Emirates, Quiksilver and Toyota.",
        color: "magenta",
      },
      {
        year: "2016–2017",
        title: "Product Engineer & Product Manager, LawPath",
        body: "Product engineer and product manager at LawPath. Led the company registration tool across product strategy, design, frontend engineering, third-party APIs, and integration with ASIC. Presented to C-level executives, and owned the product direction.",
        color: "green",
      },
      {
        year: "2009 - now",
        title: "Building",
        body: "Started building for the web in earnest around 2009. Fifteen-plus years of product, frontend, design, and full-stack work later, I am most useful where someone needs the gap between design intent and a shipped product closed.",
        color: "cyan",
      },
    ],
  },

  faq: {
    kicker: "questions?",
    heading: "Good to know",
    items: [
      { q: "What kind of work do you take on?", a: "I help teams turn ambiguous product problems into shipped software. From product framing and interaction design through to frontend systems and full-stack delivery. I'm happiest on complex products where thoughtful decisions make a real difference." },
      { q: "Are you available right now?", a: "I'm open to staff product engineering and/or frontend/full-stack roles and selected product engagements. I keep commitments focused so I can give the work proper attention." },
      { q: "Do you work solo or with a team?", a: "Both. I can take ownership from problem framing to implementation, or join an existing team as a product-minded technical lead who raises clarity and quality." },
      { q: "Where are you based?", a: "Cotswolds, UK, working remotely with teams across the UK, Europe, and the US. Comfortable with US East Coast hours and occasional on-site time for the right team." },
      { q: "How do we start?", a: "A short call to understand the product, the team, and the problem... then we can work out the shape of the engagement or role from there." },
    ],
  },

  contactForm: {
    provider: "netlify" as "formspree" | "formsubmit" | "netlify",
    formspreeId: "",
    formsubmitEmail: "",
    submitLabel: "Send it",
    successMessage: "Thanks - I'll get back to you within a day or two.",
    fields: {
      name: "Your name",
      email: "Email",
      message: "What's on your mind?",
    },
    channels: [
      { label: "Based in", value: "Cotswolds, UK", url: "" },
      { label: "Open to", value: "Remote, UK/US East Coast hours", url: "" },
      { label: "Response", value: "Within ~48h", url: "" },
    ],
  },

  clients: {
    kicker: "worked with",
    items: [
      "Mixo",
      "Mixvisor",
      "Userfold",
      "Room For Sound",
      "Credabl",
      "eGuarantee",
      "CommBank",
      "Emirates",
      "Quiksilver",
      "LawPath",
      "Toyota",
    ],
  },

  stats: {
    kicker: "by the numbers",
    heading: "A decade+ of shipping",
    items: [
      { value: "16", label: "Years building", color: "cyan" },
      { value: "40", label: "Products shipped", color: "magenta" },
      { value: "3m", label: "Websites created", color: "amber" },
      { value: "4.99", label: "Avg. client rating", color: "green" },
    ],
  },

  testimonials: {
    kicker: "kind words",
    heading: "What people say",
    items: [
      {
        quote: "Giles is one of the best front-end engineers I had the pleasure to work with at Fuzzy Logic Labs and Mixo. His in-depth knowledge of front-end development - in particular CSS and JS frameworks - made him an absolute asset to the team. Giles is the type of person I could always count on and delivers his work with the highest quality. He has made great contributions to the company with valuable insights in both technology and business decisions.",
        name: "Adam Arbolino",
        role: "Co-founder, Fuzzy Logic Labs / Mixo",
        avatar: "/people/adam.webp",
        color: "cyan",
      },
      {
        quote: "Giles's work on the CommBank website redesign was first class. He has the uncommon ability to combine tremendous technical acumen, creative thinking and strong communication to deliver great results. As part of a large project team Giles played a key front end development role, working closely with designers, developers and business stakeholders to manage fluid requirements and cope with the intensity and long hours of a large project implementation. I'd recommend Giles without hesitation.",
        name: "Brad Phillips",
        role: "Head of Digital & Data, CommBank",
        avatar: "/people/brad.webp",
        color: "magenta",
      },
      {
        quote: "Giles was the technical front-end leader when I first joined the CBA project. He naturally serves as an inspiring mentor for the whole team. We had a lot to catch up with but he made it possible. Giles is an out-of-the-box thinker as well as a results-oriented problem solver. He is technically savvy and likes to keep on top of the latest trends and technologies in the field. He is a true asset to any organisation.",
        name: "Remon Saddik",
        role: "CBA project",
        avatar: "/people/remon.webp",
        color: "amber",
      },
      {
        quote: "Giles is an excellent designer with a great eye for detail. He works very efficiently with a passion for the web. Giles helped transform the design of CreditorWatch into a modern and professional layout, significantly increasing sales.",
        name: "Dale Hurley",
        role: "CreditorWatch",
        avatar: "/people/dale.webp",
        color: "green",
      },
      {
        quote: "Giles is an extremely talented developer who stays up to date with the bleeding edge of the industry and stands out due to his focus and discipline. He is very knowledgeable and a natural innovator that will find the most optimal way to tackle a problem with his constantly evolving toolkit. Not afraid of large-scale projects, his personality and natural leadership qualities will certainly make him a driving force in any team he joins.",
        name: "Daniel Serrano",
        role: "Hothouse",
        avatar: "/people/daniel.webp",
        color: "cyan",
      },
      {
        quote: "I had the pleasure to work with Giles on Mixvisor's growth strategy. He's an entrepreneur who knows how to move fast to build a promising product with a good vision. I'd love to work with him again!",
        name: "Adrien Montcoudiol",
        role: "Mozza",
        avatar: "/people/adrien.webp",
        color: "amber",
      },
    ],
  },

  notFound: {
    kicker: "well, this is awkward",
    title: "404",
    note: "That page wandered off the canvas",
    ctaLabel: "Back home",
  },

  ui: {
    workBackShort: "All work",
    workBackLong: "Back to all work",
    journalBackShort: "The journal",
    journalBackLong: "Back to the journal",
  },

  seo: {
    title: "Giles Butler - Staff Product Engineer",
    description: "Giles is a product-minded full-stack staff engineer with frontend depth, design fluency, and creative product judgment, and co-founder of Fuzzy Logic Labs. 15+ years turning complex problems into products people actually use.",
    ogImage: "/avatar.jpg",
    twitterHandle: "",
  },

  analytics: {
    provider: null as null | "google" | "plausible" | "umami",
    googleId: "",
    plausibleDomain: "giles.io",
    umamiWebsiteId: "",
    umamiScriptUrl: "",
  },

  headScripts: "" as string,
};

export type SiteConfig = typeof siteConfig;
