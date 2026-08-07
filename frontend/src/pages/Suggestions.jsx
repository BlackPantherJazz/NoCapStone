import { useState, useEffect } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Pulled out so we can re-run it after any change
  const fetchSuggestions = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestions`);
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  // ARTIST creates a suggestion
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      setText("");
      fetchSuggestions();
    } catch (error) {
      console.error("Failed to add suggestion:", error);
    }
  };

  // MANAGER approves or rejects
  const handleStatus = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      fetchSuggestions();
    } catch (error) {
      console.error("Failed to update suggestion:", error);
    }
  };

  // Managers see all; artists see only their own
  const visibleSuggestions =
    role === "manager"
      ? suggestions
      : suggestions.filter((s) => s.artist?._id === userId);

  return (
    <div>
      <p className="kicker">Inbox // Suggestions</p>
      <h1>Suggestions</h1>

      {/* Not signed in — prompt to log in or register */}
      {!token && (
        <div
          style={{
            background: "var(--base-2)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "2rem",
            color: "var(--muted)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "14px",
          }}
        >
          You need to be signed in to submit a suggestion.{" "}
          <a href="/login" style={{ color: "var(--pink)" }}>Log in</a> or{" "}
          <a href="/register" style={{ color: "var(--amber)" }}>register</a>.
        </div>
      )}

      {/* Artist — the create form */}
      {role === "artist" && (
        <form onSubmit={handleAdd}>
          <input
            placeholder="Write a suggestion..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <ul>
        {visibleSuggestions.map((s) => (
          <li key={s._id}>
            {s.text} — <strong>{s.status}</strong>
            {role === "manager" && (
              <>
                {" "}(by {s.artist?.name || "unknown"}){" "}
                <button onClick={() => handleStatus(s._id, "approved")}>Approve</button>
                <button onClick={() => handleStatus(s._id, "rejected")}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;