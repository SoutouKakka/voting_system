async function logger(ctx, next) {
	// log request
	ctx.log.info({
		from: ctx.request.ip,
		// request: ctx.request,
		path: ctx.path,
		query: ctx.query
	});
	await next();
	// log response
	ctx.log.info({
		// response_body: ctx.body,
		response_status: ctx.status
	});
}

module.exports = () => logger;
