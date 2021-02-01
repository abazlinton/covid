const csvtojson = require('csvtojson')
const addMovingAverage = require('./addMovingAverage')


function getData() {
  return csvtojson()
    .fromFile('agesex.csv')
    .then(dates => dates.filter(date => date.Sex === 'Total' && date.AgeGroup === '85plus'))
    .then(dates => dates.map(date => {
      const year = date.Date.slice(0, 4)
      const month = date.Date.slice(4, 6)
      const day = date.Date.slice(6, 8)
      if (new Date(year, month, day) < new Date(2020, 8, 18)) return {}
      return {
        date: `${year}-${month}-${day}`,
        positiveTests: Number(date.DailyPositive)
      }

    }))
    .then(dates => addMovingAverage(dates, 'positiveTests'))
    .then(dates => dates.slice(0, (dates.length - 5)))
    // ^ chop off some date due to specimen data lagging
}

module.exports = getData