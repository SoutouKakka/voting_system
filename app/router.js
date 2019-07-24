const Router = require('koa-router');

const common = require('./controllers/common');
const viewer = require('./controllers/viewer');
const api = require('./controllers/api');

const router = new Router();

// health check
router.get('/whoami', common.whoami);

// view endpoints
router
	.get('/campaigns', viewer.debug)
	.get('/campaigns/:id', viewer.debug)
	.get('/campaigns/:id/results', viewer.debug);

// admin endpoints
router
	.post('/admin/campaigns', api.debug)
	.get('/admin/campaigns', api.debug)
	.get('/admin/campaigns/:id', api.debug)
	.put('/admin/campaigns/:id', api.debug)

	.post('/admin/votes', api.debug)
	.get('/admin/votes', api.debug)

	.put('/admin/choices/:id', api.debug);


module.exports = router;
