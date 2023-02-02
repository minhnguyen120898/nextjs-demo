/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    clientKey: "SChN56MvzoPDHZzjYR3hx8Fka4Q0uQnQv02DJhZHTJBOLFOC0biiLGOpBavxC5Z7YwRQ7mKD8Mxa2O0l7q638x0wf6hC5WctUp3wSVdq5Wre1560622142246CCJW3z2M4lshADE1GVTfQkBuHnt8YvyULSX76qF9r0OoxcgjCiPIZpaRbN5eKmwdE",
    routerLoginAdmin: "admin",
    host: "http://server_test.rion-lab.com:9098",
    host_socket: "http://server_test.rion-lab.com:9098",
  }
}

module.exports = nextConfig
