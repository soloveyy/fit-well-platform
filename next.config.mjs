/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isProd ? '/fitwell' : '',
    assetPrefix: isProd ? '/fitwell' : '', // This helps ensure assets are loaded correctly in production
};


export default nextConfig;
