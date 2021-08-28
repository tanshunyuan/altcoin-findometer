/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    CMC_API_KEY: process.env.CMC_API_KEY,
  },
};
