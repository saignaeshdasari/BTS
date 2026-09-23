import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">College Bus Tracker</div>

      <div className="nav-links">
        {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}

        {user?.role === "driver" && <Link to="/driver">Driver Dashboard</Link>}

        {user?.role === "student" && (
          <Link to="/student">Student Dashboard</Link>
        )}

        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
