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
