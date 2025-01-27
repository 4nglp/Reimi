/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mangadex.network",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uploads.mangadex.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
