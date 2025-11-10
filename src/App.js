import React, { useEffect, useState } from 'react';

function App() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://8b5d0od9de.execute-api.us-east-1.amazonaws.com/dev/results', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Include Authorization here if needed (e.g. Cognito ID token or IAM SigV4)
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('API response:', data);
        setResults(data);
      })
      .catch((err) => {
        console.error('API call failed:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Simulation Results</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {results ? (
        <pre>{JSON.stringify(results, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
