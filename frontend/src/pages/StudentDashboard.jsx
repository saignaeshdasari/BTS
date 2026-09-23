import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [buses, setBuses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Loading student dashboard...");

   

      const profileResponse = await api.get("/students/profile");

      console.log("PROFILE RESPONSE:", profileResponse.data);

      const profileData = profileResponse.data;

    

      const student =
        profileData.student ||
        profileData.user ||
        profileData.data ||
        profileData;

      setProfile(student);

    

      const busesResponse = await api.get("/students/buses");

      console.log("BUSES RESPONSE:", busesResponse.data);

      const busesData = busesResponse.data;

      

      const busList = Array.isArray(busesData)
        ? busesData
        : busesData.buses || busesData.data || busesData.results || [];

      setBuses(busList);
    } catch (error) {
      console.error("DASHBOARD ERROR:", error);

      console.error("SERVER RESPONSE:", error.response?.data);

      setError(
        error.response?.data?.message || "Failed to load student dashboard",
      );
    } finally {
      setLoading(false);
    }
  };

 

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Student Dashboard</h1>

        <div className="panel">
          <h2>Loading student information...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>

  

      {error && <div className="error">{error}</div>}

      

      <section className="panel">
        <h2>Welcome, {profile?.name || "Student"}</h2>

        <div className="profile-info">
          <p>
            <strong>Student ID:</strong> {profile?.studentId || "Not available"}
          </p>

          <p>
            <strong>Email:</strong> {profile?.email || "Not available"}
          </p>

          <p>
            <strong>Phone:</strong> {profile?.phone || "Not available"}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {profile?.department || "Not available"}
          </p>

          <p>
            <strong>Year:</strong> {profile?.year || "Not available"}
          </p>
        </div>
      </section>

      
      <section className="panel">
        <h2>Available Buses</h2>

        {buses.length === 0 ? (
          <div className="empty-state">
            <p>No buses available.</p>

            <small>Ask the administrator to create and activate a bus.</small>
          </div>
        ) : (
          <div className="bus-grid">
            {buses.map((bus) => (
              <div className="bus-card" key={bus._id}>
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

                {bus.driver && (
                  <p>
                    <strong>Driver:</strong> {bus.driver.name || "-"}
                  </p>
                )}

                <Link to={`/student/track/${bus._id}`} className="track-button">
                  Track Bus
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentDashboard;
