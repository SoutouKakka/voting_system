function whoami(ctx) {
	const version = process.env.npm_package_version || 'unknown';
	const body = {
		service: 'voting-system',
		version
	};
	ctx.body = body;
}

const common = {
	whoami
};

module.exports = common;
