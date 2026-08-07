import { useState, useEffect } from "react";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // Load venues once on page load
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/venues");
        const data = await res.json();
        setVenues(data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };
    fetchVenues();
  }, []);

  // CREATE a venue (manager only) — flashes the token
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, city, capacity }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      setVenues([...venues, data]); // new array with the added venue
      setName("");
      setCity("");
      setCapacity("");
    } catch (error) {
      console.error("Failed to add venue:", error);
    }
  };

  // DELETE a venue (manager only) — flashes the token
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/venues/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        console.error(data.message);
        return;
      }
      setVenues(venues.filter((venue) => venue._id !== id)); // new array without it
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
  };

  return (
    <div>
        <p className="kicker">Roster // Venues</p>
      <h1>Venues</h1>

      {role === "manager" && (
        <form onSubmit={handleAdd}>
          <input placeholder="Venue name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input placeholder="Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          <button type="submit">Add Venue</button>
        </form>
      )}

      <ul>
        {venues.map((venue) => (
          <li key={venue._id}>
            {venue.name} — {venue.city} (capacity: {venue.capacity})
            {role === "manager" && (
              <button onClick={() => handleDelete(venue._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Venues;