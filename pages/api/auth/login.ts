
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { proxy } from "server/proxy";

const LOGIN_ENDPOINT_PATH = `/login`;

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    // we're changing the url to our login endpoint without the /api prefix
    req.url = LOGIN_ENDPOINT_PATH;
    /**
     * if an error occurs in the proxy, we will reject the promise.
     * it is so important. if you don't reject the promise,
     *  you're facing the stalled requests issue.
     */
    proxy.once("error", reject);

    proxy.once("proxyRes", (proxyRes) => {
      let body: any[] = [];

      proxyRes.on("data", (chunk) => {
        return body.push(chunk);
      });
      // don't forget the catch the errors
      proxyRes.once("error", reject);
      proxyRes.on("end", () => {
        const isSuccess = proxyRes.statusCode === 200;
        let temp = JSON.parse(Buffer.concat(body).toString());

        if (isSuccess) {
          const cookies = new Cookies(req, res);
          cookies.set("token", temp.token, {
            httpOnly: true,
            sameSite: "lax",
          });
          res.status(200).end();
        } else {
          res.status(proxyRes.statusCode || 500).json(temp);
        }

        /**
         * we are resolving the promise here for next.js to notify we've handled it.
         */
        resolve();
      });
    });

    proxy.web(req, res, {
      /**
       * it should be enable to handle proxy response via proxyRes event.
       */
      selfHandleResponse: true,
    });
  });
};

/**
 * In next.js's api routes, bodyParser is automatically enabled.
 * Since we are using the proxy, we need to disable it.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};