import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Trans } from 'react-i18next';

export default function CompaniesMap() {
  const [markers, setMarkers] = useState([
    { id: 1, lat: 24, lng: 40 },
    { id: 2, lat: 28, lng: 35 },
    { id: 3, lat: 17, lng: 44 },
    { id: 4, lat: 2, lng: 2.3522 },
  ]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleMarkerClick = (markerId) => {
    const marker = markers.find((marker) => marker.id === markerId);
    setCurrentLocation(marker);
  };

  return (
    <div className='text-center w-100'>
      <h1><Trans i18nKey='our-parteners-on-map'/></h1>
      <MapContainer center={[24.774265, 46.738586]} zoom={5} className='mx-auto my-4' style={{ height: '600px', width:'80%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(marker.id),
            }}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [20, 30], iconAnchor: [12, 41] })}
          />
        ))}

        {currentLocation && (
          <Popup position={[currentLocation.lat, currentLocation.lng]}>
            <div>
              <h2>Marker ID: {currentLocation.id}</h2>
              <p>Latitude: {currentLocation.lat}</p>
              <p>Longitude: {currentLocation.lng}</p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}