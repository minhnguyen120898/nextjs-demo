import '../styles/globals.scss';
// Import css files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { EmptyLayoutComponent } from '@/layout/empty';
import { AppPropsWithLayout } from '@/models/common';

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const Layout = Component.Layout ?? EmptyLayoutComponent;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
