/** @type {import('next').NextConfig} */
const path = require("path");

const environment = process.env.MODE_BUILD;
const jsonSetting = getEnvConfig();

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: jsonSetting.env,
  images: {
    remotePatterns: [
      jsonSetting.images
    ],
  },
};

function getEnvConfig() {
  // for multi-file config
  try {
    if (environment) {
      return require(`./${environment}.json`);
    } else {
      return require("./development.json");
    }
  } catch (err) {
    return require("./development.json");
  }
}

module.exports = nextConfig;
