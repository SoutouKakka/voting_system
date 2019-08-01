const Router = require('koa-router');
const { validation } = require('swagger-ajv').middlewares.koa;

const { backendRateLimit } = require('./helper/rate_limiter');
const schemas = require('./schemas');
const commonController = require('./controllers/common');
const adminCampaignsController = require('./controllers/admin/campaigns');
const adminVotes = require('./controllers/admin/votes');
const campaignsController = require('./controllers/campaigns');

const router = new Router();

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
