import Image from 'next/image';
import { lora, sourceCodePro700 } from '../../../styles/fonts/fonts';
import Email from '../../assets/email.svg';

import styles from './visitors.module.css';

// Dynamic metadata
export async function generateMetadata({ params }) {
  const { id } = params;

  const singleDataItem = await getDataItem(id);
  const visitorsData = singleDataItem.data;

  return {
    title: `${visitorsData.first_name} ${visitorsData.last_name}`,
    description: 'Single Visitor page description',
    openGraph: {
      title: `${visitorsData.first_name} ${visitorsData.last_name}`,
      description: 'Single Visitor page description',
      images: [
        {
          url: `${visitorsData.avatar}`,
          width: 50,
          height: 50,
        },
      ],
    },
  };
}

async function getDataItem(id) {
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page({ params }) {
  const { id } = params;

  const singleDataItem = await getDataItem(id);
  const visitorsData = singleDataItem.data;

  console.log('singleDataItem', {
    singleDataItem,
    visitorsData,
  });

  return (
    <>
      <h1>Hello, {id}!</h1>
      {visitorsData && (
        <div>
          <Image
            key={visitorsData.id}
            src={visitorsData.avatar}
            alt={`${visitorsData.first_name} ${visitorsData.last_name} avatar`}
            width={50}
            height={50}
          />

          <h3
            style={lora.style}
          >{`${visitorsData.first_name} ${visitorsData.last_name}`}</h3>
          <p className={(sourceCodePro700.className, styles.email)}>
            <Email />
            <span>{`${visitorsData.email}`}</span>
          </p>
        </div>
      )}
    </>
  );
}
