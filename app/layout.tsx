import type { JSXElementConstructor, ReactElement } from 'react';

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
      <body>{children}</body>
    </html>
  );
}
