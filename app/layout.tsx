import type { JSXElementConstructor, ReactElement } from "react";
import GoogleAnalytics from "./components/atoms/GoogleAnalytics/GoogleAnalytics";
import Footer from "./components/molecules/Footer/Footer";
import "../styles/globals.css";

type LayoutProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html>
      <head>
        <title>Next.js - Visitors app</title>
      </head>
      <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
      <body className='min-h-screen flex flex-col'>
        <section>
          <header></header>
          <main>{children}</main>
        </section>
        <Footer />
      </body>
    </html>
  );
}
