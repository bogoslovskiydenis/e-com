/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        appDir: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            type: 'asset/resource',
        });

        return config;
    },
};

module.exports = nextConfig;