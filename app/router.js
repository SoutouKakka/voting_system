const Router = require('koa-router');
const { validation } = require('swagger-ajv').middlewares.koa;

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

// admin endpoints
router
	.get('/whoami', commonController.whoami) // health check
	.post('/admin/campaigns', adminCampaignsController.create)
	.get('/admin/campaigns', adminCampaignsController.findMultiple)
	.get('/admin/campaigns/:id', adminCampaignsController.find)
	.patch('/admin/campaigns/:id', adminCampaignsController.update)
	.delete('/admin/campaigns/:id', adminCampaignsController.remove)
	.get('/admin/campaigns/:id/result', adminCampaignsController.getResult)

	.post('/admin/votes', adminVotes.create);


module.exports = router;
