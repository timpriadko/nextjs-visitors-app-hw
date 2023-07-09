import { getVisitorsData } from './board/[[...slug]]/page';

const URL = process.env.HOST;

export default async function sitemap() {
  const data = await getVisitorsData();
  const visitorsData = data.data;
  const visitors = visitorsData.map(({ id, date }) => ({
    url: `${URL}/visitors/${id}`,
    lastModified: date,
  }));

  const routes = ['', '/board', '/visitors'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...visitors];
}
