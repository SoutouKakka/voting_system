const moment = require('moment');

function validateDateFormat(timeString) {
	const dateFormat = 'YYYY-MM-DD';
	const time = moment.utc(timeString, dateFormat);
	return time.isValid();
}

module.exports = validateDateFormat;
