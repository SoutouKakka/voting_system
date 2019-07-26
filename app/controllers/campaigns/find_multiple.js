const _ = require('lodash');
const moment = require('moment');
const campaignModel = require('../../models/campaigns');

async function findMultiple(ctx) {
	const { query: { start_time: startTime, end_time: endTime } } = ctx;
	const searchResults = await campaignModel.findByStartTimeEndTime(startTime, endTime);
	// prettify campaigns array
	const campaigns = _.map(searchResults, (searchResult) => {
		const timeFormat = 'MMM D, YYYY';
		return {
			id: searchResult._id.toString(),
			name: searchResult.name,
			startTime: moment.utc(searchResult.start_time).format(timeFormat),
			endTime: moment.utc(searchResult.end_time).format(timeFormat)
		};
	});
	ctx.render('campaigns/home', { campaigns });
	ctx.status = 200;
}

module.exports = findMultiple;
