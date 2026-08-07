import { Link } from "react-router-dom";

function Navbar() {
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
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
