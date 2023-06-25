import Image from 'next/image';
import Link from 'next/link';
import { lora, sourceCodePro700 } from '../../../styles/fonts/fonts';
import type { Metadata } from 'next';
import cx from 'classnames';

import styles from './board.module.scss';

export const metadata: Metadata = {
  title: 'Board page with Visitors',
  description: 'Welcome to Next.js',
};

export async function getVisitorsData() {
  const res = await fetch('https://reqres.in/api/users');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json() || {};
}

export default async function Page({ params }) {
  const { slug } = params;
  // console.log(slug);
  // TODO#1 add fetch
  // 1. Add fetch here
  // 2. Use a new next/image
  // 3. @next/font
  // 4. next/link
  // https://nextjs.org/blog/next-13#new-app-directory-beta
  // 5. https://www.patterns.dev/posts/react-server-components

  // TODO#2
  // 1. Add metadata to the visitor's page: title, description, image
  // https://nextjs.org/blog/next-13-2#built-in-seo-support-with-new-metadata-api0
  // 2. add to metatags open graph images: title, description, image
  // 3. add svg via svg/webpack loader
  // https://nextjs.org/blog/next-13-2#custom-file-transformation-with-webpack-loaders
  // 4. add sitemap
  // https://nextjs.org/blog/next-13-3#file-based-metadata-api
  // 5. add container-queries to the styles
  // https://developer.chrome.com/blog/whats-new-css-ui-2023/#container-queries

  // TODO#3
  // 1. add custom 404 page
  // 2. add sitemap to the app folder with links to the pages
  // 3. add 'cross-env' to the dependencies -> add .env (or .env.local)
  // https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
  // 4. add ':has()' css
  // https://developer.chrome.com/blog/whats-new-css-ui-2023/#has
  // 5. add 'nth-of syntax' css
  // 6. add Dynamic viewport units to the separate codepen
  // https://developer.chrome.com/blog/whats-new-css-ui-2023
  // https://web.dev/viewport-units/
  // stackBlitz for Dynamic viewport units - https://stackblitz.com/edit/stackblitz-starters-oioqio?description=The%20React%20framework%20for%20production&file=components%2FDynamicViewportUnitsComponent%2FDynamicViewportUnitsComponent.js,components%2FDynamicViewportUnitsComponent%2FDynamicViewportUnitsComponent.module.css,pages%2Findex.js,styles%2FHome.module.css,styles%2Fglobals.css&title=Next.js%20Starter

  // TODO#4
  // 1. move next to 13.4.2 (or try the latest)
  // 2. add sitemap to the app folder with links to the pages (according to the 13.4.2)
  // 3. add Dynamic viewport units - try in BrowserStack via NGroc
  // https://developer.chrome.com/blog/whats-new-css-ui-2023
  // https://web.dev/viewport-units/
  // stackBlitz for Dynamic viewport units - https://stackblitz.com/edit/stackblitz-starters-oioqio?description=The%20React%20framework%20for%20production&file=components%2FDynamicViewportUnitsComponent%2FDynamicViewportUnitsComponent.js,components%2FDynamicViewportUnitsComponent%2FDynamicViewportUnitsComponent.module.css,pages%2Findex.js,styles%2FHome.module.css,styles%2Fglobals.css&title=Next.js%20Starter
  // 4. connect to the Githab repo
  // 5. register personal Vercel account

  // BACKLOG
  // - Formik and work with form validations
  // - Wide-gamut color spaces - https://developer.chrome.com/blog/whats-new-css-ui-2023/#wide-gamut-color-spaces

  const data = await getVisitorsData();
  const visitorsData = data.data;

  console.log('Page', {
    visitorsData,
    env: process.env.HOST,
  });

  return (
    <div className={styles.container}>
      <h1>Hello, {slug}!</h1>
      <div className={styles.wrapper}>
        {visitorsData.length &&
          visitorsData.map((visitor) => (
            <Link
              href={`visitors/${visitor.id}`}
              key={visitor.id}
              // className={styles.card}
              className={cx(styles.card, {
                [styles.card__odd]: +visitor.id % 2 === 1,
              })}
            >
              <div>
                <Image
                  key={visitor.id}
                  src={visitor.avatar}
                  alt={`${visitor.first_name} ${visitor.last_name} avatar`}
                  width={50}
                  height={50}
                />

                <h3
                  style={lora.style}
                >{`${visitor.first_name} ${visitor.last_name}`}</h3>
                {+visitor.id % 2 === 1 ? (
                  <div className={sourceCodePro700.className}>
                    <span>{`${visitor.email}`}</span>
                  </div>
                ) : (
                  <p className={sourceCodePro700.className}>
                    {`${visitor.email}`}
                  </p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
