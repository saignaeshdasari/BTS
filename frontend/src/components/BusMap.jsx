import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapCenter({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      map.setView([latitude, longitude], 16);
    }
  }, [latitude, longitude, map]);

  return null;
}

function BusMap({ location }) {
  if (!location) {
    return <div className="map-placeholder">Waiting for bus location...</div>;
  }

  const { latitude, longitude, locationName, speed, satellites, timestamp } =
    location;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCenter latitude={latitude} longitude={longitude} />

      <Marker position={[latitude, longitude]}>
        <Popup>
          <strong>College Bus</strong>
          <br />
          Location:
          <br />
          {locationName || "Unknown"}
          <br />
          <br />
          Latitude:
          {latitude}
          <br />
          Longitude:
          {longitude}
          <br />
          Speed:
          {speed || 0} km/h
          <br />
          Satellites:
          {satellites || 0}
          <br />
          Updated:
          {timestamp ? new Date(timestamp).toLocaleTimeString() : "Unknown"}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default BusMap;
