import localFont from "@next/font/local";
import "../styles/globals.scss";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { EmptyLayoutComponent } from "@/layout/empty";
import { AppPropsWithLayout } from "@/models/common";
import { SWRConfig } from "swr";
import { getData } from "@/service/base-service";
import { AlertProvider, LoadingProvider } from "shared/context";
import { AlertComponent, LoadingComponent } from "@/core/dialog";

const SourceHanSerif = localFont({
  src: [
    {
      path: "../assets/fonts/SourceHanSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/SourceHanSerif-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/SourceHanSerif-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["Helvetica", "ui-sans-serif"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayoutComponent;
  return (
    <>
      <style jsx global>{`
        :root {
          --font-base: ${SourceHanSerif.style.fontFamily};
        }
      `}</style>
      <SWRConfig
        value={{
          fetcher: (url) => getData(url),
          shouldRetryOnError: false,
        }}
      >
        <AlertProvider>
          <LoadingProvider>
            <AlertComponent />
            <LoadingComponent />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LoadingProvider>
        </AlertProvider>
      </SWRConfig>
    </>
  );
}
