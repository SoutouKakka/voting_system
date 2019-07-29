const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBunyanLogger = require('koa-bunyan-logger');
const Pug = require('koa-pug');
const { docs } = require('swagger-ajv').middlewares.koa;

const schemas = require('../../app/schemas');
const config = require('../../config');
const router = require('../../app/router');
const decorateBody = require('../../app/middleware/decorate_body');
const handleError = require('../../app/middleware/handler_error');
const handleNotFound = require('../../app/middleware/not_found');
const logger = require('../../app/middleware/logger');

async function initApp() {
	const app = new Koa();
	app
		.use(koaBunyanLogger())
		.use(koaBunyanLogger.requestIdContext())
		.use(logger())
		.use(bodyParser())
		.use(docs(schemas.swagger))
		.use(decorateBody())
		.use(handleError())
		.use(router.routes())
		.use(router.allowedMethods())
		.use(handleNotFound());

	const pug = new Pug({
		viewPath: './app/views',
		basedir: './app/views',
		noCache: true
	});
	pug.use(app);

	app.listen(config.server.port);
	console.log('Listening port:', config.server.port);
}

module.exports = initApp;
