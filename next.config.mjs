/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["images.unsplash.com", "www.dominos.co.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.dominos.co.in",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
