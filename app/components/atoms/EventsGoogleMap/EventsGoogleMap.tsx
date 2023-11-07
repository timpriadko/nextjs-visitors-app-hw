import React, { useState, useCallback, memo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Image from "next/image";
import styles from "./eventsGoogleMap.module.scss";

const containerStyle = {
  width: "90vw",
  height: "80vh",
  margin: "1rem auto",
};

const center = {
  lat: 47.72016458091108,
  lng: 32.48360307695922,
};

// 44.94195257139778, 34.09606933593751 - bada boom // todo - mb rm
// 45.160829788113546, 30.893554687500004 - jaga jaga // todo - mb rm
// 50.468840749498966, 30.53241466647382 - Kyiv // todo - mb rm

interface EventData {
  name: string;
  position: google.maps.LatLngLiteral;
  img: string;
  city: string;
  date: string;
  time: string;
  price: string;
}

const eventsData: Array<EventData> = [
  {
    name: "Salesforce Community Meetup",
    position: { lat: 49.81181722138225, lng: 24.038837281402685 },
    img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/Salesforce_Community_Meetup.png",
    city: "Lviv",
    date: "02 November (Thursday)",
    time: "19:00",
    price: "free",
  },
  {
    name: "Trainual <> Everlabs Hackathon 2023",
    position: { lat: 49.43106359131095, lng: 32.068750139051666 },
    img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/Trainual_Everlabs_Hackathon-2023.png",
    city: "Cherkasy",
    date: "04 November (Saturday)",
    time: "11:00",
    price: "Donate",
  },
  {
    name: "SKELAR Meetup: product edition",
    position: { lat: 50.47211972458061, lng: 30.503063408592315 },
    img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/SKELAR_Meetup_product_edition.png",
    city: "Kyiv",
    date: "09 November (Thursday)",
    time: "19:00",
    price: "donation for the Ukrainian Armed Forces — from 400 hryvnias",
  },
  {
    name: "Мітап Recruiting Dnipro Community #4",
    position: { lat: 48.45602403972232, lng: 35.05020569666684 },
    img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/Recruiting_Dnipro_Community.png",
    city: "Dnipro",
    date: "23 November (Thursday)",
    time: "18:30",
    price: "300 hrn",
  },
];

function EventsGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC-fl9YOaEjs8eGV3vBfBYcJVOnuvCLmLE",
  });

  const [map, setMap] = useState(null);
  const zoom = 6;
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = useCallback(function callback(map) {
    map.setZoom(zoom);
    map.setCenter(center);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={() => setActiveMarker(null)}
    >
      {eventsData.map((markerData, i) => {
        const id = `${markerData.name}-${i}`;

        return (
          <Marker
            key={id}
            position={markerData.position}
            onClick={() => handleActiveMarker(id)}
            options={{
              icon: {
                url: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/b66b5323be30e9d4658b8a846c20ca3157962d6c/public/assets/images/reshot-icon-laptop-pin.svg",
                scaledSize: new google.maps.Size(35, 45),
              },
            }}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className={styles.infoWindow}>
                  <div className={styles.infoWindow__img}>
                    <Image
                      src={markerData.img as string}
                      fill={true}
                      alt='Picture of the author'
                    />
                  </div>
                  <div className={styles.infoWindow__header}>
                    <span>{markerData.city}</span>
                    <h4>{markerData.name}</h4>
                  </div>
                  <div className={styles.infoWindow__body}>
                    <div className={styles.infoWindow__body__textColumns}>
                      <span
                        className={styles.infoWindow__body__textColumns__left}
                      >
                        Date:
                      </span>
                      <span
                        className={styles.infoWindow__body__textColumns__right}
                      >
                        {markerData.date}
                      </span>
                    </div>
                    <div className={styles.infoWindow__body__textColumns}>
                      <span
                        className={styles.infoWindow__body__textColumns__left}
                      >
                        Time:
                      </span>
                      <span
                        className={styles.infoWindow__body__textColumns__right}
                      >
                        {markerData.time}
                      </span>
                    </div>
                    <div className={styles.infoWindow__body__textColumns}>
                      <span
                        className={styles.infoWindow__body__textColumns__left}
                      >
                        Price:
                      </span>
                      <span
                        className={styles.infoWindow__body__textColumns__right}
                      >
                        {markerData.price}
                      </span>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(EventsGoogleMap);
