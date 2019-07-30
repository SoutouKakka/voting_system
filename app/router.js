const Router = require('koa-router');
const { validation } = require('swagger-ajv').middlewares.koa;
const { RateLimit, Stores } = require('koa2-ratelimit');

const config = require('../config');
const schemas = require('./schemas');
const commonController = require('./controllers/common');
const adminCampaignsController = require('./controllers/admin/campaigns');
const adminVotes = require('./controllers/admin/votes');
const campaignsController = require('./controllers/campaigns');

const router = new Router();

// rate limiting options
RateLimit.defaultOptions({
	store: new Stores.Redis({
		host: config.redis.address,
		port: config.redis.port,
		db: 1
	})
});
// rate limit for backend endpoints
const backendRateLimit = RateLimit.middleware({
	windowMs: 60000, // 1 min
	max: 10
});

// view endpoints
router
	.get('/campaigns', campaignsController.findMultiple)
	.get('/campaigns/new', campaignsController.create)
	.get('/campaigns/:id', campaignsController.find)
	.get('/campaigns/:id/result', campaignsController.getResult);

// only enable swagger for API endpoints
router.use(validation(schemas.ajv));

router
	.get('/whoami', commonController.whoami) // health check, no rate limit
	.post('/admin/campaigns', backendRateLimit, adminCampaignsController.create)
	.get('/admin/campaigns', backendRateLimit, adminCampaignsController.findMultiple)
	.get('/admin/campaigns/:id', backendRateLimit, adminCampaignsController.find)
	.patch('/admin/campaigns/:id', backendRateLimit, adminCampaignsController.update)
	.delete('/admin/campaigns/:id', backendRateLimit, adminCampaignsController.remove)
	.get('/admin/campaigns/:id/result', backendRateLimit, adminCampaignsController.getResult)

	.post('/admin/votes', adminVotes.create);


module.exports = router;
