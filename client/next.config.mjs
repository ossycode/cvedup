/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/getting-started",
        destination: "/getting-started/personal-information",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
