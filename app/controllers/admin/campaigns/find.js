const { ERROR_KEYS, appendErrorMessage } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');

async function find(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	if (!campaign) {
		// no campaign
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		return;
	}
	ctx.body = campaign;
	ctx.status = 200;
}

module.exports = find;
