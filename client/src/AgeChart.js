import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const AgeChart = function () {

  const [dates, setDates] = useState([])


  useEffect(() => {
    fetch('http://localhost:8080/85plus')
      .then(res => res.json())
      .then(dates => setDates(dates))
  }, [])

  const options = {
    title: {
      text: 'Positive Tests 85+',

    },
    xAxis: {
      type: 'datetime',
      labels: {
        rotation: 300
      },
      tickInterval: 1000 * 60 * 60 * 24 * 7
    },
    yAxis: {
      title: false
    },
    series: [{
      showInLegend: false,
      name: "Positive Tests",
      data: dates.map(date => [Date.parse(date.date), date.positiveTests])
    },
    {
      showInLegend: false,
      name: "Seven-day average",
      color: "red",
      data: dates.map(date => [Date.parse(date.date), date.sevenDayMovingAverage])
    }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default AgeChart
