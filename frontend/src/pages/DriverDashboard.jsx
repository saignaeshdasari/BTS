import { useEffect, useState } from "react";
import api from "../services/api";

function DriverDashboard() {
  const [driver, setDriver] = useState(null);
  const [bus, setBus] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDriver();
  }, []);

  const loadDriver = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Loading driver profile...");

      const response = await api.get("/drivers/me");

      console.log("DRIVER API RESPONSE:", response.data);

      const data = response.data;

    

      const driverData = data.driver || data.user || data.data || data;

      setDriver(driverData);

     

      const assignedBus =
        data.bus ||
        data.assignedBus ||
        driverData.bus ||
        driverData.assignedBus ||
        null;

      setBus(assignedBus);
    } catch (error) {
      console.error("DRIVER DASHBOARD ERROR:", error);

      console.error("SERVER RESPONSE:", error.response?.data);

      setError(
        error.response?.data?.message || "Failed to load driver information",
      );
    } finally {
      setLoading(false);
    }
  };

 

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Driver Dashboard</h1>

        <section className="panel">
          <h2>Loading driver information...</h2>
        </section>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Driver Dashboard</h1>



      {error && <div className="error">{error}</div>}


      <section className="panel">
        <h2>My Profile</h2>

        <div className="profile-info">
          <p>
            <strong>Name:</strong> {driver?.name || "Not available"}
          </p>

          <p>
            <strong>Email:</strong> {driver?.email || "Not available"}
          </p>

          <p>
            <strong>Phone:</strong> {driver?.phone || "Not available"}
          </p>

          <p>
            <strong>Role:</strong> {driver?.role || "Driver"}
          </p>
        </div>
      </section>

      
      <section className="panel">
        <h2>Assigned Bus</h2>

        {bus ? (
          <div className="bus-card">
            <div className="bus-header">
              <h3>🚌 {bus.busNumber}</h3>

              <span className={bus.isOnline ? "online" : "offline"}>
                {bus.isOnline ? "● Online" : "● Offline"}
              </span>
            </div>

            <p>
              <strong>Registration:</strong> {bus.registrationNumber || "-"}
            </p>

            <p>
              <strong>Route:</strong> {bus.routeName || "-"}
            </p>

            <p>
              <strong>Status:</strong> {bus.status || "-"}
            </p>

            <p>
              <strong>Last Seen:</strong>{" "}
              {bus.lastSeen
                ? new Date(bus.lastSeen).toLocaleString()
                : "No GPS data"}
            </p>
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Bus Assigned</h3>

            <p>The administrator has not assigned a bus to you yet.</p>
          </div>
        )}
      </section>

    

      <section className="panel">
        <h2>GPS Status</h2>

        <div className="gps-status">
          {bus?.isOnline ? (
            <>
              <div className="gps-icon online">●</div>

              <div>
                <h3>GPS Connected</h3>

                <p>Your bus is currently sending location data.</p>
              </div>
            </>
          ) : (
            <>
              <div className="gps-icon offline">●</div>

              <div>
                <h3>GPS Offline</h3>

                <p>Waiting for GPS location data.</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default DriverDashboard;
