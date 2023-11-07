"use client";

import EventsGoogleMap from "../components/molecules/EventsGoogleMap";

export default async function EventsPage({ params }) {
  return (
    <>
      <h1 className='text-center'>Events page</h1>
      <EventsGoogleMap />
    </>
  );
}
