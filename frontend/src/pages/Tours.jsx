import { useState, useEffect } from "react";

function Tours() {
  const [tours, setTours] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [venue, setVenue] = useState(""); // holds a venue's _id

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // Load tours once on page load
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/tours");
        const data = await res.json();
        setTours(data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };
    fetchTours();
  }, []);

  // CREATE a tour (manager only)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, startDate, venue }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      setTours([...tours, data]);
      setName("");
      setStartDate("");
      setVenue("");
    } catch (error) {
      console.error("Failed to add tour:", error);
    }
  };

  // DELETE a tour (manager only)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/tours/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        console.error(data.message);
        return;
      }
      setTours(tours.filter((tour) => tour._id !== id));
    } catch (error) {
      console.error("Failed to delete tour:", error);
    }
  };

  return (
    <div>
        <p className="kicker">Roster // Tours</p>
      <h1>Tours</h1>

      {role === "manager" && (
        <form onSubmit={handleAdd}>
          <input placeholder="Tour name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input placeholder="Venue ID" value={venue} onChange={(e) => setVenue(e.target.value)} />
          <button type="submit">Add Tour</button>
        </form>
      )}

      <ul>
        {tours.map((tour) => (
          <li key={tour._id}>
            {tour.name} — {tour.startDate?.slice(0, 10)}
            {tour.venue ? ` @ ${tour.venue.name}` : ""}
            {role === "manager" && (
              <button onClick={() => handleDelete(tour._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tours;