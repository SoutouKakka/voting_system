const _ = require('lodash');
const { ERROR_KEYS } = require('../helper/handle_error');

const getErrorKey = (err) => {
	if (err.isSwaggerAjvValidationError) {
		return ERROR_KEYS.SchemaValidationError;
	}
	if (err.ERROR_KEY) {
		return err.ERROR_KEY;
	}
	return ERROR_KEYS.INTERNAL;
};

const getErrorKeysAndDetailsForHttpResponse = (err) => {
	const errorKey = getErrorKey(err);
	return { errorKey };
};

async function handleError(ctx, next) {
	try {
		await next();
	} catch (err) {
		const { errorKey } = getErrorKeysAndDetailsForHttpResponse(err);
		const details = _.get(err, 'details[0].info');
		ctx.status = errorKey.status;
		ctx.body = {
			meta: {
				code: errorKey.metaCode,
				message: errorKey.message,
				details
			},
			data: {}
		};

		if (errorKey === ERROR_KEYS.INTERNAL) {
			console.log('==========INTERNAL ERROR==========');
			console.log(err);
			console.log('==================================');
		}
	}
}

module.exports = () => handleError;
