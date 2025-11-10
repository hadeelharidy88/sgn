
import React, { useState } from "react";

const API_URL = "https://8b5d0od9de.execute-api.us-east-1.amazonaws.com/dev/results";

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const runQuery = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
      } else {
        setError("No results found or query failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Error running query");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Simulation Results</h1>
      <button
        onClick={runQuery}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        {loading ? "Running..." : "Run Simulation"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              {Object.keys(results[0]).map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, idy) => (
                  <td key={idy}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
