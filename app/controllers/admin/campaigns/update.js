const { ERROR_KEYS, appendErrorMessage } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');

async function update(ctx) {
	const { params: { id: campaignID }, request: { body } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	if (!campaign) {
		// no campaign
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		return;
	}
	ctx.body = await campaignModel.updateByID(campaignID, body);
	ctx.status = 200;
}

module.exports = update;
