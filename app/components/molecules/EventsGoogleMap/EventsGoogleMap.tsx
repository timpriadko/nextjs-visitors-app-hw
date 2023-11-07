import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Image from "next/image";
import useAxios from "axios-hooks";
import styles from "./eventsGoogleMap.module.scss";

const containerStyle = {
  width: "90vw",
  height: "80vh",
  margin: "1rem auto",
};

const center = {
  lat: 48.42016458091108,
  lng: 32.48360307695922,
};

export interface EventData {
  name: string;
  position: google.maps.LatLngLiteral;
  img: string;
  city: string;
  date: string;
  time: string;
  price: string;
}

function EventsGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC-fl9YOaEjs8eGV3vBfBYcJVOnuvCLmLE",
  });

  const [map, setMap] = useState(null);
  const zoom = 6;
  const [activeMarker, setActiveMarker] = useState(null);

  const [
    { data: mapFetchData, loading: mapFetchLoading, error: mapFetchError },
    executeMap,
  ] = useAxios(
    {
      url: "/api/events-map-data",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    { manual: true }
  );

  const handleEventsMapFetch = async () => {
    await executeMap().then((res) => res);
  };

  useEffect(() => {
    handleEventsMapFetch();
  }, []);

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

  if (mapFetchLoading)
    return (
      <p className='h-[256px] flex items-center justify-center font-bold text-3xl'>
        Loading...
      </p>
    );
  if (mapFetchError)
    return (
      <p className='h-[256px] flex items-center justify-center font-bold text-3xl text-red-600 text-center'>
        Error!
        <br />
        <br />
        Please, try again later
      </p>
    );

  return isLoaded && mapFetchData ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={() => setActiveMarker(null)}
    >
      {mapFetchData?.eventsData?.map((markerData, i) => {
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
