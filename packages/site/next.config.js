module.exports = {
  reactStrictMode: true,
  env: {
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
  },
  transpilePackages: ["ui"],
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};
