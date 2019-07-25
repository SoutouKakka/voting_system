const campaignModel = require('../../../models/compaigns');

async function remove(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.removeByID(campaignID);
	ctx.body = campaign;
	ctx.status = 200;
}

module.exports = remove;
