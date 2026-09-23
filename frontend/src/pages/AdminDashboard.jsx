import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
 

  const [students, setStudents] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);

 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  const [driverForm, setDriverForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });


  const [busForm, setBusForm] = useState({
    busNumber: "",
    registrationNumber: "",
    routeName: "",
    status: "active",
  });

  

  const [selectedBus, setSelectedBus] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  

  useEffect(() => {
    loadAllData();
  }, []);

  

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("================================");
      console.log("LOADING ADMIN DATA");
      console.log("================================");

      

      const studentsResponse = await api.get("/admin/students");

      console.log("STUDENTS RESPONSE:", studentsResponse.data);

      const studentsData = studentsResponse.data;

      const studentsList = getArrayFromResponse(studentsData, [
        "students",
        "data",
        "results",
        "users",
      ]);

      setStudents(studentsList);

     

      const driversResponse = await api.get("/drivers");

      console.log("DRIVERS RESPONSE:", driversResponse.data);

      const driversData = driversResponse.data;

      const driversList = getArrayFromResponse(driversData, [
        "drivers",
        "data",
        "results",
        "users",
      ]);

      setDrivers(driversList);

      

      const busesResponse = await api.get("/buses");

      console.log("BUSES RESPONSE:", busesResponse.data);

      const busesData = busesResponse.data;

      const busesList = getArrayFromResponse(busesData, [
        "buses",
        "data",
        "results",
      ]);

      setBuses(busesList);

      console.log("FINAL STUDENTS:", studentsList);

      console.log("FINAL DRIVERS:", driversList);

      console.log("FINAL BUSES:", busesList);
    } catch (error) {
      console.error("ADMIN DASHBOARD ERROR:", error);

      console.error("SERVER RESPONSE:", error.response?.data);

      setError(error.response?.data?.message || "Unable to load admin data");
    } finally {
      setLoading(false);
    }
  };



  const getArrayFromResponse = (response, possibleKeys) => {
   

    if (Array.isArray(response)) {
      return response;
    }

    if (!response) {
      return [];
    }

   

    for (const key of possibleKeys) {
      if (Array.isArray(response[key])) {
        return response[key];
      }
    }

    return [];
  };

 

  const handleDriverChange = (event) => {
    setDriverForm({
      ...driverForm,

      [event.target.name]: event.target.value,
    });
  };

  const createDriver = async (event) => {
    event.preventDefault();

    try {
      if (!driverForm.name || !driverForm.email || !driverForm.password) {
        alert("Name, email and password are required");

        return;
      }

      await api.post("/drivers", driverForm);

      alert("Driver created successfully");

      setDriverForm({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      await loadAllData();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to create driver");
    }
  };

 

  const handleBusChange = (event) => {
    setBusForm({
      ...busForm,

      [event.target.name]: event.target.value,
    });
  };

  const createBus = async (event) => {
    event.preventDefault();

    try {
      if (
        !busForm.busNumber ||
        !busForm.registrationNumber ||
        !busForm.routeName
      ) {
        alert("Please fill all bus fields");

        return;
      }

      await api.post("/buses", busForm);

      alert("Bus created successfully");

      setBusForm({
        busNumber: "",
        registrationNumber: "",
        routeName: "",
        status: "active",
      });

      await loadAllData();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to create bus");
    }
  };

  

  const assignDriver = async () => {
    try {
      if (!selectedBus || !selectedDriver) {
        alert("Please select both bus and driver");

        return;
      }

      await api.put(
        `/buses/${selectedBus}/assign-driver`,

        {
          driverId: selectedDriver,
        },
      );

      alert("Driver assigned successfully");

      setSelectedBus("");
      setSelectedDriver("");

      await loadAllData();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to assign driver");
    }
  };



  const unassignDriver = async (busId) => {
    try {
      const confirmDelete = window.confirm("Remove the driver from this bus?");

      if (!confirmDelete) {
        return;
      }

      await api.put(`/buses/${busId}/unassign-driver`);

      alert("Driver unassigned");

      await loadAllData();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to unassign driver");
    }
  };

 

  const deleteDriver = async (driverId) => {
    try {
      const confirmed = window.confirm("Delete this driver?");

      if (!confirmed) {
        return;
      }

      await api.delete(`/drivers/${driverId}`);

      alert("Driver deleted successfully");

      await loadAllData();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to delete driver");
    }
  };

  

  const deleteBus = async (busId) => {
    try {
      const confirmed = window.confirm("Delete this bus?");

      if (!confirmed) {
        return;
      }

      await api.delete(`/buses/${busId}`);

      alert("Bus deleted successfully");

      await loadAllData();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to delete bus");
    }
  };

  

  const deleteStudent = async (studentId) => {
    try {
      const confirmed = window.confirm("Delete this student?");

      if (!confirmed) {
        return;
      }

      await api.delete(`/admin/students/${studentId}`);

      alert("Student deleted successfully");

      await loadAllData();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to delete student");
    }
  };


  const totalStudents = students.length;

  const totalDrivers = drivers.length;

  const totalBuses = buses.length;

  const activeBuses = buses.filter((bus) => bus.status === "active").length;

  const onlineBuses = buses.filter((bus) => bus.isOnline === true).length;

  const offlineBuses = buses.filter(
    (bus) => bus.status === "active" && bus.isOnline !== true,
  ).length;

  

  if (loading) {
    return (
      <div className="dashboard">
        <h1>Admin Dashboard</h1>

        <section className="panel">
          <h2>Loading...</h2>
        </section>
      </div>
    );
  }

 

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>Manage students, drivers and buses</p>
        </div>

        <button className="refresh-button" onClick={loadAllData}>
          ↻ Refresh
        </button>
      </div>

    

      {error && <div className="error">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <span>Students</span>

          <strong>{totalStudents}</strong>
        </div>

        <div className="stat-card">
          <span>Drivers</span>

          <strong>{totalDrivers}</strong>
        </div>

        <div className="stat-card">
          <span>Buses</span>

          <strong>{totalBuses}</strong>
        </div>

        <div className="stat-card">
          <span>Active Buses</span>

          <strong>{activeBuses}</strong>
        </div>

        <div className="stat-card">
          <span>Online Buses</span>

          <strong>{onlineBuses}</strong>
        </div>

        <div className="stat-card">
          <span>Offline Buses</span>

          <strong>{offlineBuses}</strong>
        </div>
      </div>

    

      <section className="panel">
        <h2>Create Driver</h2>

        <form className="admin-form" onSubmit={createDriver}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={driverForm.name}
            onChange={handleDriverChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={driverForm.email}
            onChange={handleDriverChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={driverForm.password}
            onChange={handleDriverChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={driverForm.phone}
            onChange={handleDriverChange}
          />

          <button type="submit">Create Driver</button>
        </form>
      </section>

     

      <section className="panel">
        <h2>Create Bus</h2>

        <form className="admin-form" onSubmit={createBus}>
          <input
            type="text"
            name="busNumber"
            placeholder="Bus Number"
            value={busForm.busNumber}
            onChange={handleBusChange}
          />

          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            value={busForm.registrationNumber}
            onChange={handleBusChange}
          />

          <input
            type="text"
            name="routeName"
            placeholder="Route Name"
            value={busForm.routeName}
            onChange={handleBusChange}
          />

          <select
            name="status"
            value={busForm.status}
            onChange={handleBusChange}
          >
            <option value="active">Active</option>

            <option value="maintenance">Maintenance</option>

            <option value="inactive">Inactive</option>
          </select>

          <button type="submit">Create Bus</button>
        </form>
      </section>


      <section className="panel">
        <h2>Assign Driver to Bus</h2>

        <div className="assign-form">
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
          >
            <option value="">Select Bus</option>

            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>
                {bus.busNumber}
              </option>
            ))}
          </select>

          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">Select Driver</option>

            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
                {" - "}
                {driver.email}
              </option>
            ))}
          </select>

          <button onClick={assignDriver}>Assign Driver</button>
        </div>
      </section>

   

      <section className="panel">
        <div className="section-title">
          <h2>Students</h2>

          <span>{students.length} students</span>
        </div>

        {students.length === 0 ? (
          <div className="empty-state">No students found.</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>

                  <th>Student ID</th>

                  <th>Email</th>

                  <th>Department</th>

                  <th>Year</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>

                    <td>{student.studentId || "-"}</td>

                    <td>{student.email}</td>

                    <td>{student.department || "-"}</td>

                    <td>{student.year || "-"}</td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

     

      <section className="panel">
        <div className="section-title">
          <h2>Drivers</h2>

          <span>{drivers.length} drivers</span>
        </div>

        {drivers.length === 0 ? (
          <div className="empty-state">No drivers found.</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Assigned Bus</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {drivers.map((driver) => {
                  const assignedBus = buses.find((bus) => {
                    const busDriver = bus.driver;

                    if (!busDriver) {
                      return false;
                    }

                    if (typeof busDriver === "string") {
                      return busDriver === driver._id;
                    }

                    return busDriver._id === driver._id;
                  });

                  return (
                    <tr key={driver._id}>
                      <td>{driver.name}</td>

                      <td>{driver.email}</td>

                      <td>{driver.phone || "-"}</td>

                      <td>
                        {assignedBus ? assignedBus.busNumber : "Not assigned"}
                      </td>

                      <td>
                        <button
                          className="delete-button"
                          onClick={() => deleteDriver(driver._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

    
      <section className="panel">
        <div className="section-title">
          <h2>Buses</h2>

          <span>{buses.length} buses</span>
        </div>

        {buses.length === 0 ? (
          <div className="empty-state">No buses found.</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Bus</th>

                  <th>Registration</th>

                  <th>Route</th>

                  <th>Driver</th>

                  <th>Status</th>

                  <th>GPS</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {buses.map((bus) => (
                  <tr key={bus._id}>
                    <td>
                      <strong>🚌 {bus.busNumber}</strong>
                    </td>

                    <td>{bus.registrationNumber || "-"}</td>

                    <td>{bus.routeName || "-"}</td>

                    <td>
                      {bus.driver
                        ? typeof bus.driver === "object"
                          ? bus.driver.name
                          : drivers.find((d) => d._id === bus.driver)?.name ||
                            "Assigned"
                        : "Not assigned"}
                    </td>

                    <td>
                      <span
                        className={
                          bus.status === "active"
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {bus.status}
                      </span>
                    </td>

                    <td>
                      {bus.isOnline ? (
                        <span className="online">● Online</span>
                      ) : (
                        <span className="offline">● Offline</span>
                      )}
                    </td>

                    <td>
                      {bus.driver && (
                        <button
                          className="small-button"
                          onClick={() => unassignDriver(bus._id)}
                        >
                          Unassign
                        </button>
                      )}

                      <button
                        className="delete-button"
                        onClick={() => deleteBus(bus._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;

