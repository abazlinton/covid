import './App.css';
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import AgeChart from './AgeChart';

function App() {

  const [dates, setDates] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/dates')
      .then(res => res.json())
      .then(dates => setDates(dates))
  }, [])

  const options = {
    title: {
      text: 'Percentage of positive tests',
      
    },
    xAxis: {
      type: 'datetime',
      labels: {
        rotation: 300
      },
      tickInterval: 1000 * 60 * 60 * 24 * 7
    },
    yAxis: {
      title: false,
      tickInterval: 2
    },
    series: [{
      showInLegend: false,
      name: "Positivity Rate",
      data: dates.map(date => [Date.parse(date.date), date.positivityRate])
    },
    {
      showInLegend: false,
      name: "WHO measure",
      color: "orange",
      data: dates.map(date => [Date.parse(date.date), 5])
    },
    {
      showInLegend: false,
      name: "Seven-day average",
      color: "red",
      data: dates.map(date => [Date.parse(date.date), date.sevenDayMovingAverage])
    }],

  }

  return (
    <>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
    <AgeChart/>
    </>
  )
}

export default App;
