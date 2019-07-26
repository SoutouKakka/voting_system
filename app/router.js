const Router = require('koa-router');

const commonController = require('./controllers/common');
const adminCampaignsController = require('./controllers/admin/campaigns');
const adminVotes = require('./controllers/admin/votes');
const campaignsController = require('./controllers/campaigns');

const router = new Router();

// health check
router.get('/whoami', commonController.whoami);

// view endpoints
router
	.get('/campaigns', campaignsController.findMultiple)
	.get('/campaigns/new', commonController.viewDebug)
	.get('/campaigns/:id', campaignsController.find)
	.get('/campaigns/:id/result', campaignsController.getResult);

// admin endpoints
router
	.post('/admin/campaigns', adminCampaignsController.create)
	.get('/admin/campaigns', adminCampaignsController.findMultiple)
	.get('/admin/campaigns/:id', adminCampaignsController.find)
	.put('/admin/campaigns/:id', adminCampaignsController.update)
	.delete('/admin/campaigns/:id', adminCampaignsController.remove)
	.get('/admin/campaigns/:id/result', adminCampaignsController.getResult)

	.post('/admin/votes', adminVotes.create)
	.get('/admin/votes/count', adminVotes.getCount)

	.put('/admin/choices/:id', commonController.apiDebug);


module.exports = router;
