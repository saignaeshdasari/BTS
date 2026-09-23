import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { io } from "socket.io-client";

import api from "../services/api";

import BusMap from "../components/BusMap";

function TrackBus() {
  const { busId } = useParams();

  const [bus, setBus] = useState(null);
  const [location, setLocation] = useState(null);

  const [connected, setConnected] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    let socket;

    const loadBus = async () => {
      try {
        const response = await api.get(`/students/buses/${busId}`);

        setBus(response.data.bus || response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load bus");
      }
    };

    const loadLatestLocation = async () => {
      try {
        const response = await api.get(`/students/buses/${busId}/location`);

        setLocation(response.data.location || response.data);
      } catch (error) {
        console.log("No location available");
      }
    };

    loadBus();
    loadLatestLocation();

    // Connect Socket.IO

    socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("connect", () => {
      setConnected(true);

      socket.emit("joinBus", busId);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("busLocation", (data) => {
      // Make sure update belongs
      // to current bus

      if (data.busMongoId === busId || data.busId === busId) {
        setLocation(data);
      }
    });

    return () => {
      if (socket) {
        socket.emit("leaveBus", busId);

        socket.disconnect();
      }
    };
  }, [busId]);

  return (
    <div className="dashboard">
      <Link to="/student">← Back to Dashboard</Link>

      <h1>Live Bus Tracking</h1>

      {error && <div className="error">{error}</div>}

      {bus && (
        <section className="panel">
          <h2>🚌 {bus.busNumber}</h2>

          <p>Route: {bus.routeName}</p>

          <p>Registration: {bus.registrationNumber}</p>

          <p>Socket: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>
        </section>
      )}

      <section className="panel">
        <h2>Live Location</h2>

        <BusMap location={location} />
      </section>

      {location && (
        <section className="location-details">
          <div>
            <strong>📍 Location</strong>

            <p>{location.locationName || "Getting location..."}</p>
          </div>

          <div>
            <strong>Latitude</strong>

            <p>{location.latitude}</p>
          </div>

          <div>
            <strong>Longitude</strong>

            <p>{location.longitude}</p>
          </div>

          <div>
            <strong>Speed</strong>

            <p>{location.speed || 0} km/h</p>
          </div>

          <div>
            <strong>Satellites</strong>

            <p>{location.satellites || 0}</p>
          </div>

          <div>
            <strong>Last Updated</strong>

            <p>
              {location.timestamp
                ? new Date(location.timestamp).toLocaleString()
                : "-"}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default TrackBus;
