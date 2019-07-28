const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');

async function remove(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.removeByID(campaignID);
	if (!campaign) {
		// no campaign
		throw new CustomError(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
	}
	ctx.body = campaign;
	ctx.status = 200;
}

module.exports = remove;
