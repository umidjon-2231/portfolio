/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["@n8n/chat"],
    output: 'standalone', // Enable standalone output for Docker
};

export default nextConfig;
