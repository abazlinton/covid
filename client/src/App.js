import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [dates, setDates] = useState([])


  useEffect(()=>{
    fetch('http://localhost:8080/dates')
      .then(res => res.json())
      .then(dates => setDates(dates))
  }, [])

  return (
    <div className="App">
      <pre>
        {JSON.stringify(dates, null, 2)}
      </pre>
    </div>
  );
}

export default App;
