
import { proxy } from "@/server/proxy";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('...path');
  return new Promise<void>((resolve, reject) => {
    // removes the api prefix from url
    req.url = req?.url?.replace(/^\/api/, "");

    const cookies = new Cookies(req, res);
    const token = cookies.get("token");

    // don't forwards the cookies to the target server
    req.headers.cookie = "";
    if (token) {
      req.headers.authorization = token;
    }

    /**
     * if an error occurs in the proxy, we will reject the promise.
     * it is so important. if you don't reject the promise,
     * you're facing the stalled requests issue.
     */
    proxy.once("error", reject);

    proxy.web(req, res, {
      /**
       * it should be enable to handle proxy response via proxyRes event.
       */
      selfHandleResponse: true,
    });

    proxy.on('proxyRes', (proxyRes) => {
      const chunks: any = [];
  
      proxyRes.on('data', (chunk) => {
        chunks.push(chunk);
      });

      // don't forget the catch the errors
      proxyRes.once("error", reject);
  
      proxyRes.on('end', () => {
        const data = JSON.parse(Buffer.concat(chunks).toString());
        console.log(`Received response data: ${data}`);
        res.status(200).end(data);

        /**
         * we are resolving the promise here for next.js to notify we've handled it.
         */
         resolve();
      });
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};