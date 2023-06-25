import { getVisitorsData } from '../board/[[...slug]]/page';

const URL =
  'https://nextjseje7ut-lkbq--3000--1df59e15.local-credentialless.webcontainer.io';

function generateSiteMap(visitors) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       <url>
         <loc>${URL}</loc>
       </url>
       <url>
         <loc>${URL}/portfolio</loc>
       </url>
        <url>
         <loc>${URL}/blog</loc>
       </url>
       ${visitors
         .map(({ id }) => {
           return `
             <url>
                 <loc>${`${URL}/blog/${id}`}</loc>
             </url>
           `;
         })
         .join('')}
     </urlset>
   `;
}

export function GET() {
  const visitors = getVisitorsData();
  const body = generateSiteMap(visitors);

  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
