import type { NextConfig } from "next";

// En dev local : localhost:8080 (backend lancé directement sur la machine)
// En Docker : le nom du service compose (ex: http://api:8080), injecté à l'exécution
const backendUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  output: "standalone", // indispensable pour le Dockerfile — produit .next/standalone
  async rewrites() {
    return [
      {
        source: "/api/((?!auth).*)",
        destination: `${backendUrl}/api/$1`,
      },
    ];
  },
};

export default nextConfig;