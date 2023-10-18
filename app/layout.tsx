import type { JSXElementConstructor, ReactElement } from "react";
import GoogleAnalytics from "./components/atoms/GoogleAnalytics/GoogleAnalytics";
import "../styles/globals.css";

type LayoutProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
    ? process.env.NEXT_PUBLIC_GA_ID
    : "";

  return (
    <html>
      <head>
        <title>Next.js - Visitors app</title>
      </head>
      <GoogleAnalytics GA_MEASUREMENT_ID={GA_ID} />
      <body>{children}</body>
    </html>
  );
}
