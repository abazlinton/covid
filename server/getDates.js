XLSX = require('xlsx');

const workbook = XLSX.readFile('./daily.xlsx');
const rows = XLSX.utils.sheet_to_json(workbook.Sheets['Table 5 - Testing'])
const datesWithValidData = rows.filter(row => !isNaN(row.__EMPTY_10))
let dates = datesWithValidData.map(getDateAndPositivityRate)
dates = addMovingAverage(dates)


function getDateAndPositivityRate(row) {
    return {
        date: SerialDateToJSDate(Object.values(row)[0], -24),
        positivityRate: Math.round((row.__EMPTY_10 * 100) * 10) / 10,
    }   
}

function SerialDateToJSDate(serialDate, offsetUTC) {
    return new Date(Date.UTC(0, 0, serialDate, offsetUTC)).toISOString();
}

function addMovingAverage(dates){
    return dates.map((date, index, origDates) => {
        if (index < 7){
            return {...date, sevenDayMovingAverage: null}
        }
        return {...date, sevenDayMovingAverage: getAverage(origDates.slice(index -7, index).map(date => date.positivityRate))}

    })
}

function getAverage(numbers) {
    const sum = numbers.reduce((number, sum) => sum + number)
    return sum / numbers.length
}

module.exports = dates