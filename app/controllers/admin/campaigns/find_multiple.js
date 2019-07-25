const campaignModel = require('../../../models/compaigns');

async function findMultiple(ctx) {
	const { query: { start_time: startTime, end_time: endTime } } = ctx;
	const campaigns = await campaignModel.findByStartTimeEndTime(startTime, endTime);
	ctx.body = campaigns;
	ctx.status = 200;
}

module.exports = findMultiple;
