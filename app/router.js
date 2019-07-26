const Router = require('koa-router');

const common = require('./controllers/common');
const adminCampaigns = require('./controllers/admin/campaigns');
const adminVotes = require('./controllers/admin/votes');

const router = new Router();

// health check
router.get('/whoami', common.whoami);

// view endpoints
router
	.get('/campaigns', common.viewDebug)
	.get('/campaigns/:id', common.viewDebug)
	.get('/campaigns/:id/results', common.viewDebug);

// admin endpoints
router
	.post('/admin/campaigns', adminCampaigns.create)
	.get('/admin/campaigns', adminCampaigns.findMultiple)
	.get('/admin/campaigns/:id', adminCampaigns.find)
	.put('/admin/campaigns/:id', adminCampaigns.update)
	.delete('/admin/campaigns/:id', adminCampaigns.remove)
	.get('/admin/campaigns/:id/result', adminCampaigns.getResult)

	.post('/admin/votes', adminVotes.create)
	.get('/admin/votes/count', adminVotes.getCount)

	.put('/admin/choices/:id', common.apiDebug);


module.exports = router;
