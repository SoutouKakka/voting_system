const campaignModel = require('../../../models/compaigns');

async function update(ctx) {
	const { params: { id: campaignID }, request: { body } } = ctx;
	const campaign = await campaignModel.updateByID(campaignID, body);
	ctx.body = campaign;
	ctx.status = 200;
}

module.exports = update;
