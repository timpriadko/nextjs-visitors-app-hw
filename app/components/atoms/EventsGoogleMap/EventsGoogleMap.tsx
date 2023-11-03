import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import MeetupMarker from "../../../../public/assets/images/meetup-1875502.svg";

const containerStyle = {
  width: "90vw",
  height: "80vh",
  margin: "1rem auto",
};

const center = {
  lat: 50.468,
  lng: 30.532,
};

// 44.94195257139778, 34.09606933593751 - bada boom
// 45.160829788113546, 30.893554687500004 - jaga jaga
// 50.468840749498966, 30.53241466647382 - Kyiv

const eventsData = [
  {
    name: "Salesforce Community Meetup",
    position: { lat: 49.81181722138225, lng: 24.038837281402685 },
    date: "02 November (Thursday)",
    time: "19:00",
    price: "free",
  },
  {
    name: "Trainual <> Everlabs Hackathon 2023",
    position: { lat: 49.43106359131095, lng: 32.068750139051666 },
    date: "04 November (Saturday)",
    time: "11:00",
    price: "Donate",
  },
  {
    name: "SKELAR Meetup: product edition",
    position: { lat: 50.47211972458061, lng: 30.503063408592315 },
    date: "09 November (Thursday)",
    time: "19:00",
    price: "donation for the Ukrainian Armed Forces — from 400 hryvnias",
  },
  {
    name: "Мітап Recruiting Dnipro Community #4",
    position: { lat: 48.45602403972232, lng: 35.05020569666684 },
    date: "23 November (Thursday)",
    time: "18:30",
    price: "300 hrn",
  },
];

function EventsGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: process.env.GMAP_API_KEY || "",
    googleMapsApiKey: "AIzaSyC-fl9YOaEjs8eGV3vBfBYcJVOnuvCLmLE",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info cwindows, et. */}
      {/* <> */}
      <Marker
        // onLoad={onLoad}
        position={eventsData[0].position}
        options={{
          // icon: MeetupMarker,
          icon: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/a8e2f797fd158714fdbab7a26c247098a4739bd4/public/assets/images/reshot-icon-map-marker-TDJ2KX5LNA.svg",
        }}
      />
      {/* </> */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(EventsGoogleMap);
