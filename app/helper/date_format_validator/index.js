const moment = require('moment');

function validateDate(timeString) {
	const dateFormat = 'YYYY-MM-DD';
	const time = moment.utc(timeString, dateFormat);
	return time.isValid();
}

module.exports = validateDate;
