XLSX = require('xlsx');

const workbook = XLSX.readFile('./daily.xlsx');
const rows = XLSX.utils.sheet_to_json(workbook.Sheets['Table 5 - Testing'])
const datesWithValidData = rows.filter(row => !isNaN(row.__EMPTY_10))
const dates = datesWithValidData.map(getDateAndPositivityRate)

function getDateAndPositivityRate(row) {
    return {
        date: SerialDateToJSDate(Object.values(row)[0], -24),
        positivityRate: row.__EMPTY_10
    }   
}

function SerialDateToJSDate(serialDate, offsetUTC) {
    return new Date(Date.UTC(0, 0, serialDate, offsetUTC)).toISOString();
}

module.exports = dates