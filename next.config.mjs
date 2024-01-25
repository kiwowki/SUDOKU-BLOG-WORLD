/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    }
};

export default nextConfig;

// 이미지 호스팅을 위한 코드