/* eslint-disable @next/next/no-page-custom-font */
import React, { Fragment, FC, useEffect } from "react";
import Head from "next/head";


import { useRouter } from "next/router";
interface ISeo {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  keywords?: string;
}

interface ISite {
  seo: ISeo;
  isHome?: boolean;
  isLogin?: boolean;
  children: React.ReactNode;
}

const SEO = {
  title: "Homepage",
  description: "Description",
  image: "",
  url: "",
  noIndex: 0,
  keywords: "",
};

const Site: FC<ISite> = ({
  seo = SEO,
  isHome = false,
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1027453168174179"); // facebookPixelId
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

  return (
    <Fragment>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{seo.title}</title>
        <link rel='icon' href='/favicon-picaso.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap'
          rel='stylesheet'
        />
        <meta name='description' content={seo.description} key='description' />
        <meta name='keywords' content={seo.keywords} />

        <meta
          name='twitter:card'
          content='summary_large_image'
          key='twitter:card'
        />
        <meta property='og:url' content={seo.url} key='og:url' />
        <meta property='og:title' content={seo.title} key='og:title' />
        <meta
          property='og:description'
          content={seo.description}
          key='og:description'
        />
        <meta property='og:image' content={seo.image} key='og:image' />
        <link rel='canonical' href={seo.url} />
        {seo.noIndex && (
          <>
            <meta name='robots' content='noindex'></meta>
            <meta name='googlebot' content='noindex'></meta>
          </>
        )}

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-8ZB5BDKM9K`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', 'G-8ZB5BDKM9K');
            `,
          }}
        />
      </Head>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCHV4ZH" height="0" width="0" style="display: none; visibility: hidden;" />`,
        }}
      />
      <div className={isHome ? "site site--home" : "site"} id='top'>
        <main role='main'>{children}</main>
      </div>
    </Fragment>
  );
};

export default Site;
