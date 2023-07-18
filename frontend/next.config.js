/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  headers: () => [
    {
      source: "/explore",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.flowcapacitor.xyz",
      },
      {
        protocol: "https",
        hostname: "flowcapacitor.fly.dev",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
      },
    ],
  },
};

module.exports = nextConfig;
