const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const { ERROR_KEYS } = require('../../../../helper/handle_error');

const campaignSchema = require('../../../../models/schema/campaigns');
const voteSchema = require('../../../../models/schema/votes');

const CampaignModel = mongoose.model('Campaign', campaignSchema);
const VoteModel = mongoose.model('Vote', voteSchema);

const campaignController = require('../index');

describe('/admin/campaigns endpoints', () => {
	afterEach(() => {
		mockingoose.resetAll();
	});
	describe('/POST /admin/campaigns', () => {
		it('should response 201', async () => {
			const ctx = {
				request: {
					body: {
						name: 'name',
						start_time: '2019-01-01',
						end_time: '2019-01-01'
					}
				}
			};
			const mockReturn = {};
			mockingoose(CampaignModel).toReturn(mockReturn, 'save');
			let error;
			try {
				await campaignController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(ctx.status).toBe(201);
			expect(error).toBe(undefined);
		});

		it('should throw CAMPAIGN_TIME_INVALID Error if time is invalid', async () => {
			const ctx = {
				request: {
					body: {
						name: 'name',
						start_time: 'invalid',
						end_time: 'invalid'
					}
				}
			};
			let error;
			try {
				await campaignController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_TIME_INVALID);
		});
	});

	describe('GET /admin/campaigns', () => {
		it('should response 200', async () => {
			const ctx = {
				query: {
					start_time: '2019-01-01',
					end_time: '2019-01-01'
				}
			};
			const mockReturn = {};
			mockingoose(CampaignModel).toReturn(mockReturn, 'find');
			let error;
			try {
				await campaignController.findMultiple(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(ctx.status).toBe(200);
			expect(error).toBe(undefined);
		});

		it('should throw CAMPAIGN_TIME_INVALID Error if time is invalid', async () => {
			const ctx = {
				query: {
					start_time: 'invalid',
					end_time: 'invalid'
				}
			};
			let error;
			try {
				await campaignController.findMultiple(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_TIME_INVALID);
		});
	});

	describe('GET /admin/campaigns/:id', () => {
		it('should throw CAMPAIGN_NOT_FOUND Error if time is invalid', async () => {
			const ctx = {
				params: {
					id: 'campaign_id'
				}
			};
			const mockReturn = null;
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			let error;
			try {
				await campaignController.find(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		});
	});

	describe('PATCH /admin/campaigns/:id', () => {
		it('should throw CAMPAIGN_NOT_FOUND Error if time is invalid', async () => {
			const ctx = {
				params: {
					id: 'campaign_id'
				},
				request: {
					body: {}
				}
			};
			const mockReturn = null;
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOneAndUpdate');
			let error;
			try {
				await campaignController.update(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		});
	});

	describe('DELETE /admin/campaigns/:id', () => {
		it('should throw CAMPAIGN_NOT_FOUND Error if time is invalid', async () => {
			const ctx = {
				params: {
					id: 'campaign_id'
				}
			};
			const mockReturn = null;
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			let error;
			try {
				await campaignController.remove(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		});
	});

	describe('GET /admin/campaigns/:id/result', () => {
		it('should throw CAMPAIGN_NOT_FOUND Error if time is invalid', async () => {
			const ctx = {
				params: {
					id: 'campaign_id'
				}
			};
			const mockReturn = null;
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			let error;
			try {
				await campaignController.getResult(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		});
		it('should return choice with vote count', async () => {
			const ctx = {
				params: {
					id: 'campaign_id'
				}
			};
			const mockCampaignReturn = {
				_id: 'id',
				name: 'name',
				description: 'description',
				choices: [{ _id: 'id ', name: 'name' }, { _id: 'id ', name: 'name' }]
			};
			mockingoose(CampaignModel).toReturn(mockCampaignReturn, 'findOne');
			const mockVoteReturn = 5;
			mockingoose(VoteModel).toReturn(mockVoteReturn, 'countDocuments');
			let error;
			try {
				await campaignController.getResult(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(ctx.body.choices[0].count).toBe(mockVoteReturn);
			expect(error).toBe(undefined);
		});
	});
});
