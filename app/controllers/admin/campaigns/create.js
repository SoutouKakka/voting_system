const campaignModel = require('../../../models/campaigns');

async function create(ctx) {
	const { request: { body } } = ctx;
	const campaign = await campaignModel.create(body);
	ctx.body = campaign;
	ctx.status = 201;
}

module.exports = create;
