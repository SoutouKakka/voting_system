function whoami(ctx) {
	const version = process.env.npm_package_version || 'unknown';
	const body = {
		service: 'voting-system',
		version
	};
	ctx.body = body;
}

function apiDebug(ctx) {
	const { params, request: { body } } = ctx;
	ctx.body = { params, body };
}

function viewDebug(ctx) {
	const { params } = ctx;
	ctx.render('debug', { params });
}

const common = {
	whoami,
	apiDebug,
	viewDebug
};

module.exports = common;
