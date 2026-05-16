/**
 * Seed content transcribed from INFORMATION.md. EN is filled; RU/UZ are
 * left empty and fall back to EN until edited in the admin dashboard.
 * One-shot, idempotent (see run.ts). Avatar/CV are uploaded via the
 * admin (cv.pdf also remains a static asset).
 */

const L = (en: string) => ({en, ru: '', uz: ''});

export const profileSeed = {
    fullName: 'Umidjon Tojiboyev',
    headline: L('Full-Stack Engineer & CTO'),
    shortBio: L(
        '20-year-old full-stack engineer from Tashkent. CTO at Bron24 and Software Engineer at BIS. I build production systems: ERP integrations, real-time platforms and payment gateways.',
    ),
    longBio: L(
        'I started coding formally at around 15. Today I work across the stack — Next.js and React on the front, Node.js/TypeScript and Spring Boot on the back, SAP Business One and HANA SQL on the enterprise side. My debut Habr article on PostgreSQL design hit the top-5 of the day across the largest CIS developer community, and I was invited to join the Habr content studio. I participated in the International AI Forum in Tashkent at the launch of the "Five Million Uzbek AI Prompters" initiative, and I build AI automation pipelines with n8n and the Claude API.',
    ),
    city: L('Tashkent, Uzbekistan'),
    age: 20,
    status: L('Open to senior / CTO-level roles'),
    socialLinks: {
        github: 'https://github.com/umidjon-2231',
        linkedin: 'https://linkedin.com/in/tojiboyevumidjon',
        telegram: 'https://t.me/tojiboyevumidjon',
        instagram: 'https://instagram.com/t_umidcheek',
        email: 'tumidjon808@gmail.com',
    },
    careerGoals: [
        L('Senior / CTO-level roles at high-growth tech companies'),
        L('AI/ML transition through coursework and product ideation'),
        L('Open-source contributions to n8n, expo/expo and langchainjs'),
    ],
};

export const experienceSeed = [
    {
        role: L('Software Engineer'),
        company: 'Business Intelligence Solutions (BIS)',
        employmentType: 'Part-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2026-01-01'),
        current: true,
        description: L('SAP Business One integrations and ERP synchronization.'),
        highlights: [
            L('SAP B1 Service Layer: HANA SQL, UDTs, UDOs, UDFs, OData v3/v4, batch ops, attachments API'),
            L('SAP B1 ↔ Smartup ERP sync (Node.js, TypeScript, Azure Service Bus, SQLite)'),
            L('Kia OEM ↔ 1C ↔ SAP B1 six-flow integration'),
            L('UUVZ Statica weighing-scale real-time web dashboard (CORS proxy)'),
            L('Multicard payment gateway (Uzcard, Humo, Payme, Click, Uzum, Payze)'),
            L('Built getCardAvgMonthlyPayment with two-level HANA SQL aggregation'),
        ],
        techStack: ['SAP Business One', 'HANA SQL', 'Node.js', 'TypeScript', 'Azure Service Bus', 'SQLite'],
        order: 0,
    },
    {
        role: L('CTO / Frontend Web Developer'),
        company: 'Bron24',
        employmentType: 'Part-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2025-02-01'),
        current: true,
        description: L('Sport venue booking platform; technical leadership and frontend.'),
        highlights: [
            L('AI-powered nightly analytics pipeline: n8n + Claude API → Telegram reports'),
            L('Weather data integration planning (Open-Meteo)'),
        ],
        techStack: ['JavaScript', 'Next.js', 'n8n', 'Claude API'],
        order: 1,
    },
    {
        role: L('Back-end Developer'),
        company: 'DeepRed',
        employmentType: 'Contract',
        location: 'United States',
        remote: true,
        startDate: new Date('2025-11-01'),
        endDate: new Date('2026-02-01'),
        current: false,
        description: L('Social platform for influencers, sponsors and entrepreneurs.'),
        highlights: [
            L('Real-time: Socket.IO + Supabase Realtime (live chat, typing, read receipts, presence)'),
            L('Payments: Stripe PaymentIntent, saved methods, refunds, Connect payouts + bank accounts'),
            L('Notifications: push (Expo + Web Push), email, in-app; dynamic templates + preferences'),
            L('End-to-end TypeScript, Drizzle ORM, Zod, OpenAPI auto-docs, 50+ DB tables'),
            L('Security: RBAC, audit logging, rate limiting, secure file handling'),
        ],
        techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Socket.IO', 'Stripe', 'Supabase', 'Zod', 'Pino', 'Vitest'],
        order: 2,
    },
    {
        role: L('Software Engineer'),
        company: 'OPEN CLOUD JV LLC',
        employmentType: 'Part-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-11-01'),
        current: false,
        description: L('Web application development.'),
        highlights: [],
        techStack: ['Next.js', 'Vue.js'],
        order: 3,
    },
    {
        role: L('Frontend Developer'),
        company: 'TEDA LLC',
        employmentType: 'Full-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-04-01'),
        current: false,
        description: L('Frontend development.'),
        highlights: [],
        techStack: ['React', 'PostgreSQL'],
        order: 4,
    },
];

export const projectSeed = [
    {
        title: L('Bron24'),
        description: L('Sport venue booking platform with an AI-powered nightly analytics pipeline (n8n → Claude API → Telegram) and planned Open-Meteo weather integration.'),
        techStack: ['Next.js', 'JavaScript', 'n8n', 'Claude API'],
        links: {},
        featured: true,
        order: 0,
    },
    {
        title: L('DeepRed Backend'),
        description: L('Social platform backend: real-time chat, Stripe Connect payments, multi-channel notifications, RBAC, 50+ DB tables, OpenAPI docs.'),
        techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Stripe', 'Socket.IO', 'Supabase'],
        links: {},
        featured: true,
        order: 1,
    },
    {
        title: L('expo-plausible'),
        description: L('Plausible Analytics client for Expo / React Native: PlausibleProvider, useTrackEvent, offline queue + retry, batching, consent helpers. Published on npm.'),
        techStack: ['React Native', 'Expo', 'TypeScript'],
        links: {npm: 'https://npmjs.com/package/expo-plausible'},
        featured: true,
        order: 2,
    },
    {
        title: L('DachaBook'),
        description: L('iOS dacha rental app, live on TestFlight. StoreKit subscriptions and an EAS Submit CI/CD pipeline.'),
        techStack: ['React Native', 'Expo', 'EAS', 'StoreKit'],
        links: {},
        featured: false,
        order: 3,
    },
    {
        title: L('SAP B1 ↔ Smartup Sync'),
        description: L('Real-time inventory/order sync between SAP Business One and Smartup ERP with a fault-tolerant message-queue architecture.'),
        techStack: ['Node.js', 'TypeScript', 'Azure Service Bus', 'SQLite'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 4,
    },
    {
        title: L('Kia OEM ↔ 1C ↔ SAP B1 Integration'),
        description: L('Six bidirectional data flows across three enterprise systems with complex data mapping and transformation.'),
        techStack: ['SAP Business One', '1C', 'Node.js'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 5,
    },
    {
        title: L('UUVZ Statica Weighing-Scale Dashboard'),
        description: L('Real-time web dashboard for industrial weighing hardware; solved a CORS proxy for hardware data ingestion.'),
        techStack: ['Node.js', 'TypeScript'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 6,
    },
    {
        title: L('Multicard Payment Gateway'),
        description: L('Integrated Uzcard, Humo, Payme, Click, Uzum and Payze with full callback schemas and webhook-flow documentation.'),
        techStack: ['Node.js', 'TypeScript'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 7,
    },
    {
        title: L('AI Finance Analyst'),
        description: L('Product concept targeting the Uzbekistan SAP B1 market: multi-tenant adapter architecture with defined pricing tiers and technical design.'),
        techStack: ['Claude API', 'SAP Business One', 'Node.js'],
        links: {},
        featured: false,
        order: 8,
    },
];

const skillCat = (category: string, names: string[], start: number) =>
    names.map((name, i) => ({name, category, order: start + i}));

export const skillSeed = [
    ...skillCat('Mobile', ['React Native', 'Expo', 'EAS', 'StoreKit'], 0),
    ...skillCat('Frontend', ['React', 'Next.js', 'Vue.js', 'JavaScript', 'TypeScript'], 10),
    ...skillCat('Backend', ['Node.js', 'NestJS', 'Express.js', 'Spring Boot', 'Socket.IO'], 20),
    ...skillCat('Enterprise / ERP', ['SAP Business One', 'OData v3/v4', 'SAP HANA SQL'], 30),
    ...skillCat('Databases', ['PostgreSQL', 'SQLite', 'SAP HANA', 'Drizzle ORM', 'Prisma'], 40),
    ...skillCat('Cloud & DevOps', ['Docker', 'Docker Swarm', 'Azure Service Bus', 'Supabase', 'Linux'], 50),
    ...skillCat('Payments', ['Stripe', 'Multicard'], 60),
    ...skillCat('Automation & AI', ['n8n', 'Claude API', 'MCP'], 70),
    ...skillCat('Other', ['Groovy DSL', 'Flyway', 'Zod', 'Pino', 'Vitest'], 80),
];

export const educationSeed = [
    {
        institution: 'Amity University Tashkent',
        degree: L('BSc in Information Technology'),
        startDate: new Date('2024-09-01'),
        endDate: new Date('2027-05-01'),
        notes: [
            L('Government state-order scholarship (merit-based)'),
            L('Mandatory post-graduation work placement obligation'),
        ],
        order: 0,
    },
    {
        institution: 'Amity University Tashkent',
        degree: L('Foundation Degree, Information Technology'),
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-05-01'),
        notes: [],
        order: 1,
    },
    {
        institution: 'School #307',
        degree: L('High School Diploma'),
        startDate: new Date('2012-09-01'),
        endDate: new Date('2023-05-01'),
        grade: '5/5 (top grade, Uzbekistan system)',
        notes: [],
        order: 2,
    },
    {
        institution: 'PDP Academy',
        degree: L('Java Backend Development (Middle level)'),
        startDate: new Date('2021-09-01'),
        endDate: new Date('2022-05-01'),
        grade: '100/100',
        notes: [L('Skills: Spring Framework, PostgreSQL')],
        order: 3,
    },
    {
        institution: 'PDP Academy',
        degree: L('Frontend Development (Middle level)'),
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-07-01'),
        grade: '100/100',
        notes: [L('Skills: React, JavaScript')],
        order: 4,
    },
];

export const certificationSeed = [
    {
        name: L('Introduction to Referencing'),
        issuer: 'UCL (University College London)',
        order: 0,
    },
];

export const writingSeed = [
    {
        title: L('25 Iron Rules of Database Design in PostgreSQL'),
        summary: L('Practical PostgreSQL patterns, anti-patterns and production decisions. Top-5 best publications of the day on Habr within 24 hours; invited to join the Habr content studio.'),
        platform: 'Habr',
        url: 'https://habr.com',
        metrics: L('5,692 readers · 134 bookmarks · 48 comments · rating +24'),
        featured: true,
        order: 0,
    },
];

export const openSourceSeed = [
    {
        name: 'expo-plausible',
        description: L('Plausible Analytics client for Expo / React Native — PlausibleProvider, useTrackEvent hook, offline queue + retry, batching, consent helpers.'),
        url: 'https://npmjs.com/package/expo-plausible',
        order: 0,
    },
];

export const eventSeed = [
    {
        title: L('International AI Forum, Tashkent'),
        description: L('Participant at the launch of "Five Million Uzbek AI Prompters" — a presidential initiative (Mirziyoyev + UAE) to train 4.75M students, 150K teachers and 100K civil servants in AI by 2030, with $100M funding and an NVIDIA supercomputer cluster.'),
        order: 0,
    },
];

export const courseworkSeed = [
    {
        title: L('Customer Churn Prediction (Telco dataset)'),
        description: L('Group project applying classical ML to telecom churn.'),
        tools: ['Python', 'R'],
        topics: ['SVM', 'Decision Trees', 'KNN', 'Entropy', 'Information Gain'],
        order: 0,
    },
];

export const socialProofSeed = {
    items: [
        {platform: 'LinkedIn', stat: L('263 connections · 279 followers'), url: 'https://linkedin.com/in/tojiboyevumidjon', order: 0},
        {platform: 'Habr', stat: L('5,692 readers on debut article · Top-5 of the day'), url: 'https://habr.com', order: 1},
        {platform: 'npm', stat: L('expo-plausible published'), url: 'https://npmjs.com/package/expo-plausible', order: 2},
        {platform: 'TestFlight', stat: L('DachaBook live on iOS'), order: 3},
    ],
};
