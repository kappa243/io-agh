/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/mechanic/home',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
