const _ = require('lodash');
const moment = require('moment');
const campaignModel = require('../../models/campaigns');
const voteModel = require('../../models/votes');
const validateDateFormat = require('../../helper/date_format_validator');


async function findMultiple(ctx) {
	let { query: { start_time: startTime, end_time: endTime } } = ctx;
	if (!validateDateFormat(startTime)) {
		startTime = '';
	}
	if (!validateDateFormat(endTime)) {
		endTime = '';
	}
	const searchResults = await campaignModel.findByStartTimeEndTime(startTime, endTime);
	const campaigns = [];
	// prettify campaigns array
	for (let i = 0; i < searchResults.length; i++) {
		const searchResult = searchResults[i];
		const timeFormat = 'MMM D, YYYY';
		const startTimeMoment = moment.utc(searchResult.start_time);
		const endTimeMoment = moment.utc(searchResult.end_time);
		const now = moment.utc();
		const active = now.isSameOrBefore(endTimeMoment);
		const campaignId = searchResult._id.toString();
		const voteCount = await voteModel.getCountByCampaignID(campaignId)
		campaigns.push({
			id: campaignId,
			name: searchResult.name,
			startTime: startTimeMoment.format(timeFormat),
			endTime: endTimeMoment.format(timeFormat),
			active,
			voteCount
		});
	}
	// order by number of votes
	const sortedCampaigns = _.sortBy(campaigns, ['voteCount']).reverse();
	ctx.render('campaigns/home', { campaigns: sortedCampaigns });
	ctx.status = 200;
}

module.exports = findMultiple;
