import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/europe/netherlands/unknown', destination: '/europe/netherlands/amstelveen', permanent: true },
      { source: '/europe/netherlands/unknown/:path*', destination: '/europe/netherlands/amstelveen/:path*', permanent: true },
      { source: '/north-america/canada/toronto/unknown-157', destination: '/north-america/canada/toronto/hsuen-medicine-157', permanent: true },
      { source: '/north-america/canada/toronto/unknown-160', destination: '/north-america/canada/toronto/yamashiro-clinic-160', permanent: true },
      { source: '/europe/france/paris/unknown-178', destination: '/europe/france/paris/dr-ota-hiroaki-178', permanent: true },
      { source: '/europe/france/paris/unknown-180', destination: '/europe/france/paris/dr-kondo-takeshi-180', permanent: true },
      { source: '/europe/france/paris/unknown-181', destination: '/europe/france/paris/dr-mimura-teiji-181', permanent: true },
      { source: '/europe/france/paris/unknown-184', destination: '/europe/france/paris/dr-muller-184', permanent: true },
      { source: '/europe/france/paris/unknown-186', destination: '/europe/france/paris/dr-inazuma-186', permanent: true },
      { source: '/europe/switzerland/geneva/unknown-204', destination: '/europe/switzerland/geneva/dr-suzuki-risako-204', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(self), microphone=(), camera=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
