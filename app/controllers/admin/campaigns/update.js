const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');

async function update(ctx) {
	const { params: { id: campaignID }, request: { body } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	if (!campaign) {
		// no campaign
		throw new CustomError(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
	}
	ctx.body = await campaignModel.updateByID(campaignID, body);
	ctx.status = 200;
}

module.exports = update;
