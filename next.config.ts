import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.68"],
  images: { qualities: [75, 90], unoptimized: true },
};
export default config;
