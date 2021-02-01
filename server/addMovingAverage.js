module.exports = function addMovingAverage(dates, field){
  return dates.map((date, index, origDates) => {
      if (index < 6){
          return {...date, sevenDayMovingAverage: null}
      }
      return {...date, sevenDayMovingAverage: getAverage(origDates.slice(index - 6, index + 1).map(date => date[field]))}

  })
}

function getAverage(numbers) {
  const sum = numbers.reduce((number, sum) => sum + number)
  return sum / numbers.length
}