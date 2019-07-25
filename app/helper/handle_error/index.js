const ERROR_KEYS = {
	HKID_INVALID: {
		status: 400,
		metaCode: 4001,
		message: 'Invalid HKID'
	},
	ALREADY_VOTED: {
		status: 400,
		metaCode: 4002,
		message: 'The HKID had already voted this campaign'
	},
	CAMPAIGN_NOT_FOUND: {
		status: 404,
		metaCode: 4041,
		message: 'Campaign not found'
	}
};

function appendErrorMessage(ctx, errorKey) {
	const { status, metaCode: code, message } = errorKey;
	ctx.body = {
		meta: {
			code,
			message
		},
		data: {}
	};
	ctx.status = status;
}

module.exports = { ERROR_KEYS, appendErrorMessage };
