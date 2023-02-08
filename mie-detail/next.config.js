/** @type {import('next').NextConfig} */
const path = require("path");

const environment = process.env.MODE_BUILD;

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: getEnvConfig(),
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
