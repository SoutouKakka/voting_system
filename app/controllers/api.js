function debug(ctx) {
	const { params, request: { body } } = ctx;
	ctx.body = { params, body };
}

const api = {
	debug
};

module.exports = api;
