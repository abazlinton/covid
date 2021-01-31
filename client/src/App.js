import './App.css';
import {useEffect, useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function App() {

  const [dates, setDates] = useState([])

  useEffect(()=>{
    fetch('http://localhost:8080/dates')
      .then(res => res.json())
      .then(dates => setDates(dates))
  }, [])

  const options = {
    title: {
      text: 'Positivity Rate'
    },
    xAxis:{
      type: 'datetime'
    },
    series: [{
      name: "Date",
      data: dates.map(date => [Date.parse(date.date), date.positivityRate])
    }]
  }
   
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default App;
