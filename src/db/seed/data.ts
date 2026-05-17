/**
 * Seed content transcribed from INFORMATION.md, trilingual (EN/RU/UZ).
 * - L(text): proper nouns / brand names — identical in every language.
 * - T(en, ru, uz): translated prose.
 * Idempotent via run.ts (use `pnpm db:seed --reset` to re-apply).
 * Avatar/CV are uploaded via the admin; cv.pdf is a static asset.
 */

const L = (s: string) => ({en: s, ru: s, uz: s});
const T = (en: string, ru: string, uz: string) => ({en, ru, uz});

export const profileSeed = {
    fullName: 'Umidjon Tojiboyev',
    headline: T('Software Engineer', 'Инженер-программист', 'Dasturiy injener'),
    shortBio: T(
        '20-year-old software engineer from Tashkent. I build production systems — ERP integrations, real-time platforms and payment gateways — at BIS and Bron24.',
        '20-летний инженер-программист из Ташкента. Создаю production-системы — ERP-интеграции, real-time платформы и платёжные шлюзы — в BIS и Bron24.',
        "Toshkentlik 20 yoshli dasturiy injener. BIS va Bron24'da production tizimlar — ERP integratsiyalari, real-time platformalar va to'lov shlyuzlari quraman.",
    ),
    longBio: T(
        'I started coding formally at around 15. Today I work across the stack — Next.js and React on the front, Node.js/TypeScript and Spring Boot on the back, SAP Business One and HANA SQL on the enterprise side. My debut Habr article on PostgreSQL design hit the top-5 of the day across the largest CIS developer community, and I was invited to join the Habr content studio. I participated in the International AI Forum in Tashkent at the launch of the "Five Million Uzbek AI Prompters" initiative, and I build AI automation pipelines with n8n and the Claude API.',
        'Я начал программировать примерно в 15 лет. Сегодня работаю по всему стеку — Next.js и React на фронте, Node.js/TypeScript и Spring Boot на бэке, SAP Business One и HANA SQL на стороне enterprise. Моя дебютная статья на Habr о проектировании PostgreSQL вошла в топ-5 дня крупнейшего сообщества разработчиков СНГ, и меня пригласили в контент-студию Habr. Я участвовал в Международном AI-форуме в Ташкенте на запуске инициативы «Пять миллионов узбекских AI-промптеров» и создаю пайплайны AI-автоматизации на n8n и Claude API.',
        "Men taxminan 15 yoshda dasturlashni boshlaganman. Bugun butun stek bo'ylab ishlayman — frontda Next.js va React, backda Node.js/TypeScript va Spring Boot, enterprise tomonda SAP Business One va HANA SQL. PostgreSQL dizayni haqidagi debyut Habr maqolam MDH'ning eng yirik dasturchilar hamjamiyatida kunning top-5 taligiga kirdi va meni Habr kontent-studiyasiga taklif qilishdi. Toshkentdagi Xalqaro AI forumida «Besh million o'zbek AI prompteri» tashabbusi ochilishida qatnashganman va n8n hamda Claude API yordamida AI avtomatlashtirish payplaynlari quraman.",
    ),
    city: T('Tashkent, Uzbekistan', 'Ташкент, Узбекистан', "Toshkent, O'zbekiston"),
    age: 20,
    status: T(
        'Open to new engineering roles',
        'Открыт к новым инженерным ролям',
        "Yangi injenerlik rollariga ochiqman",
    ),
    socialLinks: {
        github: 'https://github.com/umidjon-2231',
        linkedin: 'https://linkedin.com/in/tojiboyevumidjon',
        telegram: 'https://t.me/tojiboyevumidjon',
        instagram: 'https://instagram.com/t_umidcheek',
        email: 'tumidjon808@gmail.com',
    },
    careerGoals: [
        T(
            'Engineering roles at high-growth tech companies',
            'Инженерные роли в быстрорастущих tech-компаниях',
            "Tez o'sayotgan tech-kompaniyalarda injenerlik rollari",
        ),
        T(
            'AI/ML transition through coursework and product ideation',
            'Переход в AI/ML через обучение и проработку продуктовых идей',
            "O'qish va mahsulot g'oyalari orqali AI/ML'ga o'tish",
        ),
        T(
            'Open-source contributions to n8n, expo/expo and langchainjs',
            'Вклад в open-source: n8n, expo/expo и langchainjs',
            "n8n, expo/expo va langchainjs'ga open-source hissa",
        ),
    ],
};

export const experienceSeed = [
    {
        role: T('Software Engineer', 'Инженер-программист', 'Dasturiy injener'),
        company: 'Business Intelligence Solutions (BIS)',
        employmentType: 'Part-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2026-01-01'),
        current: true,
        description: T(
            'SAP Business One integrations and ERP synchronization.',
            'Интеграции SAP Business One и синхронизация ERP.',
            'SAP Business One integratsiyalari va ERP sinxronizatsiyasi.',
        ),
        highlights: [
            T(
                'SAP B1 Service Layer: HANA SQL, UDTs, UDOs, UDFs, OData v3/v4, batch ops, attachments API',
                'SAP B1 Service Layer: HANA SQL, UDT, UDO, UDF, OData v3/v4, пакетные операции, attachments API',
                'SAP B1 Service Layer: HANA SQL, UDT, UDO, UDF, OData v3/v4, batch operatsiyalar, attachments API',
            ),
            T(
                'SAP B1 ↔ Smartup ERP sync (Node.js, TypeScript, Azure Service Bus, SQLite)',
                'Синхронизация SAP B1 ↔ Smartup ERP (Node.js, TypeScript, Azure Service Bus, SQLite)',
                'SAP B1 ↔ Smartup ERP sinxronizatsiyasi (Node.js, TypeScript, Azure Service Bus, SQLite)',
            ),
            T(
                'Kia OEM ↔ 1C ↔ SAP B1 six-flow integration',
                'Интеграция Kia OEM ↔ 1С ↔ SAP B1 (шесть потоков)',
                'Kia OEM ↔ 1C ↔ SAP B1 olti oqimli integratsiya',
            ),
            T(
                'UUVZ Statica weighing-scale real-time web dashboard (CORS proxy)',
                'Real-time веб-дашборд весов UUVZ Statica (CORS-прокси)',
                'UUVZ Statica tarozilari uchun real-time veb-dashbord (CORS proksi)',
            ),
            T(
                'Multicard payment gateway (Uzcard, Humo, Payme, Click, Uzum, Payze)',
                'Платёжный шлюз Multicard (Uzcard, Humo, Payme, Click, Uzum, Payze)',
                "Multicard to'lov shlyuzi (Uzcard, Humo, Payme, Click, Uzum, Payze)",
            ),
            T(
                'Built getCardAvgMonthlyPayment with two-level HANA SQL aggregation',
                'Реализовал getCardAvgMonthlyPayment с двухуровневой агрегацией на HANA SQL',
                "Ikki bosqichli HANA SQL agregatsiyasi bilan getCardAvgMonthlyPayment'ni yaratdim",
            ),
        ],
        techStack: ['SAP Business One', 'HANA SQL', 'Node.js', 'TypeScript', 'Azure Service Bus', 'SQLite'],
        order: 0,
    },
    {
        role: T(
            'Mobile & Frontend Developer',
            'Mobile- и Frontend-разработчик',
            'Mobil va Frontend dasturchi',
        ),
        company: 'Bron24',
        employmentType: 'Part-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2025-02-01'),
        current: true,
        description: T(
            'Sport venue booking platform — mobile and frontend development.',
            'Платформа бронирования спортивных площадок — мобильная и фронтенд-разработка.',
            "Sport maydonlarini bron qilish platformasi — mobil va frontend ishlab chiqish.",
        ),
        highlights: [
            T(
                'AI-powered nightly analytics pipeline: n8n + Claude API → Telegram reports',
                'Ночной AI-пайплайн аналитики: n8n + Claude API → отчёты в Telegram',
                "AI asosidagi tungi analitika payplayni: n8n + Claude API → Telegram hisobotlari",
            ),
            T(
                'Weather data integration planning (Open-Meteo)',
                'Планирование интеграции погодных данных (Open-Meteo)',
                "Ob-havo ma'lumotlari integratsiyasini rejalashtirish (Open-Meteo)",
            ),
        ],
        techStack: ['JavaScript', 'Next.js', 'n8n', 'Claude API'],
        order: 1,
    },
    {
        role: T('Back-end Developer', 'Back-end разработчик', 'Back-end dasturchi'),
        company: 'DeepRed',
        employmentType: 'Contract',
        location: 'United States',
        remote: true,
        startDate: new Date('2025-11-01'),
        endDate: new Date('2026-02-01'),
        current: false,
        description: T(
            'Social platform for influencers, sponsors and entrepreneurs.',
            'Социальная платформа для инфлюенсеров, спонсоров и предпринимателей.',
            'Influenserlar, homiylar va tadbirkorlar uchun ijtimoiy platforma.',
        ),
        highlights: [
            T(
                'Real-time: Socket.IO + Supabase Realtime (live chat, typing, read receipts, presence)',
                'Real-time: Socket.IO + Supabase Realtime (чат, индикаторы набора, прочтения, присутствие)',
                "Real-time: Socket.IO + Supabase Realtime (chat, yozish indikatori, o'qilgan belgisi, presence)",
            ),
            T(
                'Payments: Stripe PaymentIntent, saved methods, refunds, Connect payouts + bank accounts',
                'Платежи: Stripe PaymentIntent, сохранённые методы, возвраты, выплаты Connect + банковские счета',
                "To'lovlar: Stripe PaymentIntent, saqlangan usullar, qaytarishlar, Connect to'lovlari + bank hisoblari",
            ),
            T(
                'Notifications: push (Expo + Web Push), email, in-app; dynamic templates + preferences',
                'Уведомления: push (Expo + Web Push), email, in-app; динамические шаблоны + настройки',
                "Bildirishnomalar: push (Expo + Web Push), email, in-app; dinamik shablonlar + sozlamalar",
            ),
            T(
                'End-to-end TypeScript, Drizzle ORM, Zod, OpenAPI auto-docs, 50+ DB tables',
                'Сквозной TypeScript, Drizzle ORM, Zod, авто-документация OpenAPI, 50+ таблиц БД',
                "Uchma-uch TypeScript, Drizzle ORM, Zod, OpenAPI avto-hujjatlar, 50+ DB jadval",
            ),
            T(
                'Security: RBAC, audit logging, rate limiting, secure file handling',
                'Безопасность: RBAC, аудит-логирование, rate limiting, безопасная работа с файлами',
                "Xavfsizlik: RBAC, audit logging, rate limiting, fayllar bilan xavfsiz ishlash",
            ),
        ],
        techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Socket.IO', 'Stripe', 'Supabase', 'Zod', 'Pino', 'Vitest'],
        order: 2,
    },
    {
        role: T('Software Engineer', 'Инженер-программист', 'Dasturiy injener'),
        company: 'OPEN CLOUD JV LLC',
        employmentType: 'Part-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-11-01'),
        current: false,
        description: T(
            'Web application development.',
            'Разработка веб-приложений.',
            'Veb-ilovalar ishlab chiqish.',
        ),
        highlights: [],
        techStack: ['Next.js', 'Vue.js'],
        order: 3,
    },
    {
        role: T('Frontend Developer', 'Frontend-разработчик', 'Frontend dasturchi'),
        company: 'TEDA LLC',
        employmentType: 'Full-time',
        location: 'Tashkent, Uzbekistan',
        remote: false,
        startDate: new Date('2022-10-01'),
        endDate: new Date('2023-04-01'),
        current: false,
        description: T(
            'Frontend development.',
            'Frontend-разработка.',
            'Frontend ishlab chiqish.',
        ),
        highlights: [],
        techStack: ['React', 'PostgreSQL'],
        order: 4,
    },
];

export const projectSeed = [
    {
        title: L('Bron24'),
        description: T(
            'Sport venue booking platform with an AI-powered nightly analytics pipeline (n8n → Claude API → Telegram) and planned Open-Meteo weather integration.',
            'Платформа бронирования спортивных площадок с ночным AI-пайплайном аналитики (n8n → Claude API → Telegram) и планируемой интеграцией погоды Open-Meteo.',
            "Sport maydonlarini bron qilish platformasi: AI asosidagi tungi analitika payplayni (n8n → Claude API → Telegram) va rejalashtirilgan Open-Meteo ob-havo integratsiyasi.",
        ),
        techStack: ['Next.js', 'JavaScript', 'n8n', 'Claude API'],
        links: {},
        featured: true,
        order: 0,
    },
    {
        title: L('DeepRed Backend'),
        description: T(
            'Social platform backend: real-time chat, Stripe Connect payments, multi-channel notifications, RBAC, 50+ DB tables, OpenAPI docs.',
            'Бэкенд социальной платформы: real-time чат, платежи Stripe Connect, мультиканальные уведомления, RBAC, 50+ таблиц БД, OpenAPI-документация.',
            "Ijtimoiy platforma backendi: real-time chat, Stripe Connect to'lovlar, ko'p kanalli bildirishnomalar, RBAC, 50+ DB jadval, OpenAPI hujjatlar.",
        ),
        techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Stripe', 'Socket.IO', 'Supabase'],
        links: {},
        featured: true,
        order: 1,
    },
    {
        title: L('expo-plausible'),
        description: T(
            'Plausible Analytics client for Expo / React Native: PlausibleProvider, useTrackEvent, offline queue + retry, batching, consent helpers. Published on npm.',
            'Клиент Plausible Analytics для Expo / React Native: PlausibleProvider, useTrackEvent, офлайн-очередь + повторы, батчинг, consent-хелперы. Опубликован в npm.',
            "Expo / React Native uchun Plausible Analytics klienti: PlausibleProvider, useTrackEvent, oflayn navbat + qayta urinish, batching, consent yordamchilar. npm'da chop etilgan.",
        ),
        techStack: ['React Native', 'Expo', 'TypeScript'],
        links: {npm: 'https://npmjs.com/package/expo-plausible'},
        featured: true,
        order: 2,
    },
    {
        title: L('DachaBook'),
        description: T(
            'iOS dacha rental app, live on TestFlight. StoreKit subscriptions and an EAS Submit CI/CD pipeline.',
            'iOS-приложение аренды дач, доступно в TestFlight. Подписки StoreKit и CI/CD-пайплайн EAS Submit.',
            "iOS dacha ijara ilovasi, TestFlight'da. StoreKit obunalari va EAS Submit CI/CD payplayni.",
        ),
        techStack: ['React Native', 'Expo', 'EAS', 'StoreKit'],
        links: {},
        featured: false,
        order: 3,
    },
    {
        title: L('SAP B1 ↔ Smartup Sync'),
        description: T(
            'Real-time inventory/order sync between SAP Business One and Smartup ERP with a fault-tolerant message-queue architecture.',
            'Real-time синхронизация остатков/заказов между SAP Business One и Smartup ERP с отказоустойчивой архитектурой очередей сообщений.',
            "SAP Business One va Smartup ERP o'rtasida real-time qoldiq/buyurtma sinxronizatsiyasi, nosozlikka chidamli xabar navbati arxitekturasi bilan.",
        ),
        techStack: ['Node.js', 'TypeScript', 'Azure Service Bus', 'SQLite'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 4,
    },
    {
        title: L('Kia OEM ↔ 1C ↔ SAP B1 Integration'),
        description: T(
            'Six bidirectional data flows across three enterprise systems with complex data mapping and transformation.',
            'Шесть двунаправленных потоков данных между тремя enterprise-системами со сложным маппингом и трансформацией.',
            "Uchta enterprise tizim o'rtasida olti ikki tomonlama ma'lumot oqimi, murakkab mapping va transformatsiya bilan.",
        ),
        techStack: ['SAP Business One', '1C', 'Node.js'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 5,
    },
    {
        title: L('UUVZ Statica Weighing-Scale Dashboard'),
        description: T(
            'Real-time web dashboard for industrial weighing hardware; solved a CORS proxy for hardware data ingestion.',
            'Real-time веб-дашборд для промышленных весов; решена задача CORS-прокси для приёма данных с оборудования.',
            "Sanoat tarozilari uchun real-time veb-dashbord; uskunadan ma'lumot olish uchun CORS proksi yechildi.",
        ),
        techStack: ['Node.js', 'TypeScript'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 6,
    },
    {
        title: L('Multicard Payment Gateway'),
        description: T(
            'Integrated Uzcard, Humo, Payme, Click, Uzum and Payze with full callback schemas and webhook-flow documentation.',
            'Интеграция Uzcard, Humo, Payme, Click, Uzum и Payze с полными схемами колбэков и документацией webhook-потоков.',
            "Uzcard, Humo, Payme, Click, Uzum va Payze integratsiyasi, to'liq callback sxemalari va webhook hujjatlari bilan.",
        ),
        techStack: ['Node.js', 'TypeScript'],
        links: {},
        featured: false,
        category: 'BIS',
        order: 7,
    },
    {
        title: L('AI Finance Analyst'),
        description: T(
            'Product concept targeting the Uzbekistan SAP B1 market: multi-tenant adapter architecture with defined pricing tiers and technical design.',
            'Концепт продукта для рынка SAP B1 в Узбекистане: мультиарендная адаптерная архитектура с проработанными тарифами и техническим дизайном.',
            "O'zbekiston SAP B1 bozoriga mo'ljallangan mahsulot konsepti: multi-tenant adapter arxitekturasi, belgilangan tarif rejalari va texnik dizayn bilan.",
        ),
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
        degree: T(
            'BSc in Information Technology',
            'Бакалавр информационных технологий',
            "Axborot texnologiyalari bo'yicha bakalavr",
        ),
        startDate: new Date('2024-09-01'),
        endDate: new Date('2027-05-01'),
        notes: [
            T(
                'Government state-order scholarship (merit-based)',
                'Государственная стипендия по госзаказу (за заслуги)',
                "Davlat buyurtmasi bo'yicha stipendiya (natijaga ko'ra)",
            ),
            T(
                'Mandatory post-graduation work placement obligation',
                'Обязательное распределение после выпуска',
                'Bitirgandan keyin majburiy ishga taqsimlash',
            ),
        ],
        order: 0,
    },
    {
        institution: 'Amity University Tashkent',
        degree: T(
            'Foundation Degree, Information Technology',
            'Foundation-степень, информационные технологии',
            'Foundation daraja, axborot texnologiyalari',
        ),
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-05-01'),
        notes: [],
        order: 1,
    },
    {
        institution: 'School #307',
        degree: T('High School Diploma', 'Аттестат о среднем образовании', "O'rta ta'lim attestati"),
        startDate: new Date('2012-09-01'),
        endDate: new Date('2023-05-01'),
        grade: '5/5',
        notes: [],
        order: 2,
    },
    {
        institution: 'PDP Academy',
        degree: T(
            'Java Backend Development (Middle level)',
            'Java Backend разработка (Middle level)',
            'Java Backend dasturlash (Middle daraja)',
        ),
        startDate: new Date('2021-09-01'),
        endDate: new Date('2022-05-01'),
        grade: '100/100',
        notes: [L('Spring Framework, PostgreSQL')],
        order: 3,
    },
    {
        institution: 'PDP Academy',
        degree: T(
            'Frontend Development (Middle level)',
            'Frontend-разработка (Middle level)',
            'Frontend dasturlash (Middle daraja)',
        ),
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-07-01'),
        grade: '100/100',
        notes: [L('React, JavaScript')],
        order: 4,
    },
];

export const certificationSeed = [
    {
        name: T(
            'Introduction to Referencing',
            'Introduction to Referencing',
            'Introduction to Referencing',
        ),
        issuer: 'UCL (University College London)',
        order: 0,
    },
];

export const writingSeed = [
    {
        title: T(
            '25 Iron Rules of Database Design in PostgreSQL',
            '25 железных правил проектирования баз данных в PostgreSQL',
            "PostgreSQL'da ma'lumotlar bazasini loyihalashning 25 temir qoidasi",
        ),
        summary: T(
            'Practical PostgreSQL patterns, anti-patterns and production decisions. Top-5 best publications of the day on Habr within 24 hours; invited to join the Habr content studio.',
            'Практические паттерны, антипаттерны и production-решения PostgreSQL. Топ-5 лучших публикаций дня на Habr за 24 часа; приглашён в контент-студию Habr.',
            "Amaliy PostgreSQL patternlari, anti-patternlar va production yechimlari. 24 soat ichida Habr'da kunning top-5 eng yaxshi nashri; Habr kontent-studiyasiga taklif qilingan.",
        ),
        platform: 'Habr',
        url: 'https://habr.com',
        metrics: T(
            '5,692 readers · 134 bookmarks · 48 comments · rating +24',
            '5 692 читателя · 134 в закладках · 48 комментариев · рейтинг +24',
            "5 692 o'quvchi · 134 xatcho'p · 48 izoh · reyting +24",
        ),
        featured: true,
        order: 0,
    },
];

export const openSourceSeed = [
    {
        name: 'expo-plausible',
        description: T(
            'Plausible Analytics client for Expo / React Native — PlausibleProvider, useTrackEvent hook, offline queue + retry, batching, consent helpers.',
            'Клиент Plausible Analytics для Expo / React Native — PlausibleProvider, хук useTrackEvent, офлайн-очередь + повторы, батчинг, consent-хелперы.',
            "Expo / React Native uchun Plausible Analytics klienti — PlausibleProvider, useTrackEvent hook, oflayn navbat + qayta urinish, batching, consent yordamchilar.",
        ),
        url: 'https://npmjs.com/package/expo-plausible',
        order: 0,
    },
];

export const eventSeed = [
    {
        title: T(
            'International AI Forum, Tashkent',
            'Международный AI-форум, Ташкент',
            'Xalqaro AI forum, Toshkent',
        ),
        description: T(
            'Participant at the launch of "Five Million Uzbek AI Prompters" — a presidential initiative (Mirziyoyev + UAE) to train 4.75M students, 150K teachers and 100K civil servants in AI by 2030, with $100M funding and an NVIDIA supercomputer cluster.',
            'Участник запуска «Пяти миллионов узбекских AI-промптеров» — президентской инициативы (Мирзиёев + ОАЭ) по обучению AI 4,75 млн студентов, 150 тыс. учителей и 100 тыс. госслужащих к 2030 году, с финансированием $100 млн и суперкомпьютерным кластером NVIDIA.',
            "«Besh million o'zbek AI prompteri» ochilishida ishtirokchi — 2030 yilga qadar 4,75 mln talaba, 150 ming o'qituvchi va 100 ming davlat xizmatchisini AI bo'yicha o'qitishga qaratilgan prezident tashabbusi (Mirziyoyev + BAA), $100 mln moliyalashtirish va NVIDIA superkompyuter klasteri bilan.",
        ),
        order: 0,
    },
];

export const courseworkSeed = [
    {
        title: T(
            'Customer Churn Prediction (Telco dataset)',
            'Прогноз оттока клиентов (датасет Telco)',
            "Mijozlar ketishini bashorat qilish (Telco dataset)",
        ),
        description: T(
            'Group project applying classical ML to telecom churn.',
            'Групповой проект: классический ML для оттока в телекоме.',
            "Telekom churn uchun klassik ML qo'llagan guruh loyihasi.",
        ),
        tools: ['Python', 'R'],
        topics: ['SVM', 'Decision Trees', 'KNN', 'Entropy', 'Information Gain'],
        order: 0,
    },
];

export const socialProofSeed = {
    items: [
        {platform: 'LinkedIn', stat: T('263 connections · 279 followers', '263 контакта · 279 подписчиков', '263 kontakt · 279 obunachi'), url: 'https://linkedin.com/in/tojiboyevumidjon', order: 0},
        {platform: 'Habr', stat: T('5,692 readers on debut article · Top-5 of the day', '5 692 читателя дебютной статьи · Топ-5 дня', "Debyut maqolada 5 692 o'quvchi · Kunning top-5"), url: 'https://habr.com', order: 1},
        {platform: 'npm', stat: T('expo-plausible published', 'опубликован expo-plausible', "expo-plausible chop etilgan"), url: 'https://npmjs.com/package/expo-plausible', order: 2},
        {platform: 'TestFlight', stat: T('DachaBook live on iOS', 'DachaBook доступен на iOS', "DachaBook iOS'da ishlamoqda"), order: 3},
    ],
};
