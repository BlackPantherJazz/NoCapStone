import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav>
      <span className="brand">
        <span className="j">J</span>
        <span className="amp">&amp;</span>
        <span className="l">L</span>
        <span className="amp">&amp;</span>
        <span className="b">B</span>
      </span>
      <Link to="/">Home</Link>
      <Link to="/venues">Venues</Link>
      <Link to="/tours">Tours</Link>
      <Link to="/suggestions">Suggestions</Link>
      {token ? (
        <a onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;