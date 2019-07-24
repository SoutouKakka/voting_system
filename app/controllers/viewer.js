function debug(ctx) {
	const { params } = ctx;
	ctx.render('debug', { params });
}

const viewer = {
	debug
};

module.exports = viewer;
