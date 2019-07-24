const httpStatus = require('http-status-codes');

async function decorateBody(ctx, next) {
	try {
		await next();
	} finally {
		if (ctx.body && typeof ctx.body === 'object' && !ctx.body.meta) {
			ctx.body = {
				meta: {
					code: ctx.status,
					message: ctx.message || httpStatus.getStatusText(ctx.status)
				},
				data: ctx.body
			};
		}
	}
}

module.exports = () => decorateBody;
