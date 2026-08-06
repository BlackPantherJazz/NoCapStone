import { useState, useEffect } from "react";

function Venues() {
  const [venues, setVenues] = useState([]);

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

  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map((venue) => (
          <li key={venue._id}>
            {venue.name} — {venue.city} (capacity: {venue.capacity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Venues;