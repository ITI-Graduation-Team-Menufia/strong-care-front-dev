import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// const center = { lat: 24.774265, lng: 24.774265 };

const ReverseGeocode = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const address = response.data?.address;
    if (address) {
      if (address.town) {
        return address.town;
      } else if (address.city) {
        return address.city;
      } else if (address.village) {
        return address.village;
      } else if (address.county) {
        return address.county;
      } else if (address.state) {
        return address.state;
      } else if (address.sea) {
        return address.sea;
      }
    }
    return "Unknown Place";
  } catch (error) {
    console.log("Error:", error);
    return "Unknown Place";
  }
};

const Map = ({ onCoordinatesChange, center }) => {
  // const [markerPosition, setMarkerPosition] = useState([24.774265, 46.738586]);
  const [markerPosition, setMarkerPosition] = useState(center);
  const markerRef = useRef(null);
  const [placeName, setPlaceName] = useState("");

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setMarkerPosition([lat, lng]);
          onCoordinatesChange(lat, lng);
          ReverseGeocode(lat, lng).then((place) => setPlaceName(place));
        }
      },
    }),
    [onCoordinatesChange]
  );

  useEffect(() => {
    const [lat, lng] = markerPosition;
    onCoordinatesChange(lat, lng);
  }, [markerPosition, onCoordinatesChange]);

  return (
    <div>
      <MapContainer
        center={markerPosition}
        zoom={5}
        style={{ height: "300px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={markerPosition}
          draggable={true}
          eventHandlers={eventHandlers}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [20, 30],
              iconAnchor: [12, 41],
            })
          }
          ref={markerRef}
        />
      </MapContainer>
      <div id="current-location">
        <p>{placeName && `- Your Company Location is: ${placeName}`}</p>
      </div>
    </div>
  );
};

export default Map;
