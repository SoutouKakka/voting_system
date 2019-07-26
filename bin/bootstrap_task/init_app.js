const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Pug = require('koa-pug');

const config = require('../../config');
const router = require('../../app/router');
const decorateBody = require('../../app/middleware/decorate_body');

async function initApp() {
	const app = new Koa();
	app
		.use(bodyParser())
		.use(decorateBody())
		.use(router.routes())
		.use(router.allowedMethods());

	const pug = new Pug({
		viewPath: '../app/views',
		basedir: '../app/views',
		noCache: true
	});
	pug.use(app);

	app.listen(config.server.port);
	console.log('Listening port:', config.server.port);
}

module.exports = initApp;
