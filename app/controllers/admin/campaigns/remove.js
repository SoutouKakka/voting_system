const { ERROR_KEYS, appendErrorMessage } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/compaigns');

async function remove(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.removeByID(campaignID);
	if (!campaign) {
		// no campaign
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		return;
	}
	ctx.body = campaign;
	ctx.status = 200;
}

module.exports = remove;
