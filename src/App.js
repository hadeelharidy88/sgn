import { useEffect, useState } from 'react';


function App() {
const [data, setData] = useState([]);


useEffect(() => {
fetch('https://gq0y8m7fpd.execute-api.us-east-1.amazonaws.com/dev/results')
.then(res => res.json())
.then(json => setData(json.body))
.catch(console.error);
}, []);


return (
<div>
<h1>Simulation Results</h1>
<ul>
{data.map((row, index) => (
<li key={index}>{row.map(cell => cell.VarCharValue).join(', ')}</li>
))}
</ul>
</div>
);
}
export default App;