const campaignModel = require('../../../models/compaigns');

async function find(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	ctx.body = campaign;
	ctx.status = 200;
}

module.exports = find;
