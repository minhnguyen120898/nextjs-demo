
import httpProxy from "http-proxy";

export const proxy = httpProxy.createProxyServer({
  /**
   * Get the actual back-end service url from env variables.
   */
  target: process.env.host,
  autoRewrite: false
});