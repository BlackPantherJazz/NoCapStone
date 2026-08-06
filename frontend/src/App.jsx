import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Venues from "./pages/Venues.jsx";
import Tours from "./pages/Tours.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;                 