/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://tojiboyevumidjon.uz',
    generateRobotsTxt: true,
    exclude: ["/admin",'/admin/*'],
    additionalPaths: async () => {
        return [
            '/en',
            '/ru'
        ]
    },
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: ["/", "/ru", "/en"],
                disallow: ['/admin']
            }
        ],
    },
}