import Head from "next/head";
import * as React from "react";

export interface SeoModel {
  title: string;
  description: string;
  url: string;
  thumbnaiUrl: string;
}

export interface SeoComponentProps {
  data: SeoModel;
}

export function SeoComponent({ data }: SeoComponentProps) {
  const { title, description, thumbnaiUrl, url } = data;
  return (
    <>
      <Head>
        <title>{"MIE | " + title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="mie" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:title" content={"MIE | " + title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={thumbnaiUrl}
        />
        <meta property="og:url" content={`${process.env.domain}/${url}`} />
        <meta property="og:type" content="website" />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content={thumbnaiUrl} />
        <meta name="twitter:title" content={"MIE | " + title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={thumbnaiUrl} />
        <meta name="twitter:url" content={`${process.env.domain}/${url}`} />
      </Head>
    </>
  );
}
