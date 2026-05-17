/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://tojiboyevumidjon.uz',
    generateRobotsTxt: true,
    exclude: ['/admin', '/admin/*'],
    additionalPaths: async (config) => [
        await config.transform(config, '/'),
        await config.transform(config, '/ru'),
        await config.transform(config, '/uz'),
        await config.transform(config, '/resume'),
        await config.transform(config, '/ru/resume'),
        await config.transform(config, '/uz/resume'),
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: ['/', '/ru', '/uz'],
                disallow: ['/admin'],
            },
        ],
    },
}
