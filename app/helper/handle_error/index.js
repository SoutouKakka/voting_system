const ERROR_KEYS = {
	HKID_INVALID: {
		status: 400,
		metaCode: 4001,
		message: 'Invalid HKID'
	},
	CAMPAIGN_TIME_INVALID: {
		status: 400,
		metaCode: 4002,
		message: 'Start time or end time for this campaign is invalid'
	},
	ALREADY_VOTED: {
		status: 400,
		metaCode: 4003,
		message: 'The HKID had already voted this campaign'
	},
	CAMPAIGN_EXPIRED: {
		status: 400,
		metaCode: 4004,
		message: 'This campaign is expired'
	},
	CAMPAIGN_NOT_FOUND: {
		status: 404,
		metaCode: 4041,
		message: 'Campaign not found'
	},
	CHOICE_NOT_FOUND: {
		status: 404,
		metaCode: 4042,
		message: 'Campaign choice not found'
	},
	SchemaValidationError: {
		status: 422,
		metaCode: 422,
		message: 'Schema Validation Error'
	},
	INTERNAL: {
		status: 500,
		metaCode: 5000,
		message: 'Internal Error.'
	}
};

class CustomError extends Error {
	constructor(key) {
		super(key.toString());
		this.ERROR_KEY = key;
		this.details = [];
	}
}

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

module.exports = { ERROR_KEYS, appendErrorMessage, CustomError };
