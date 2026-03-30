import createNextIntlPlugin from 'next-intl/plugin';

// 1. Initialize the i18n plugin with the exact path to your routing configuration
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** * Next.js Global Configuration
 * * Defines build steps, external asset permissions, and plugins.
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
    images: {
        // Security Feature: Strictly whitelist external domains for Next/Image optimization
        remotePatterns: [
            { 
                protocol: 'https', 
                hostname: 'cdn.sanity.io',
                // Explicitly allow all image paths from the Sanity CDN
                pathname: '/**', 
            },
        ],
    },
};

// 2. Wrap the core Next.js config with the internationalization plugin before exporting
export default withNextIntl(nextConfig);