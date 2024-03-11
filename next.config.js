/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mautskebeli.ge",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.youtube.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
