const addMovingAverage = require('./addMovingAverage');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('./daily.xlsx');
const rows = XLSX.utils.sheet_to_json(workbook.Sheets['Table 5 - Testing'])
const datesWithValidData = rows.filter(row => !isNaN(row.__EMPTY_10))
let dates = datesWithValidData.map(getDateAndPositivityRate)
dates = addMovingAverage(dates, "positivityRate")


function getDateAndPositivityRate(row) {
    return {
        date: SerialDateToJSDate(Object.values(row)[0], -24),
        positivityRate: Math.round((row.__EMPTY_10 * 100) * 10) / 10,
    }   
}

function SerialDateToJSDate(serialDate, offsetUTC) {
    return new Date(Date.UTC(0, 0, serialDate, offsetUTC)).toISOString();
}


module.exports = dates