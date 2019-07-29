const mockdate = require('mockdate');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const { ERROR_KEYS } = require('../../../../helper/handle_error');

const campaignSchema = require('../../../../models/schema/campaigns');
const voteSchema = require('../../../../models/schema/votes');

const CampaignModel = mongoose.model('Campaign', campaignSchema);
const VoteModel = mongoose.model('Vote', voteSchema);

const voteController = require('../index');
const voteModel = require('../../../../models/votes');

describe('/admin/votes endpoints', () => {
	afterEach(() => {
		mockingoose.resetAll();
		mockdate.reset();
	});
	describe('POST /admin/campaigns', () => {
		it('should throw HKID_INVALID Error if hkid is invalid', async () => {
			const ctx = {
				request: {
					body: {
						hkid: 'invalid_hkid',
						campaign_id: 'campaign_id',
						choice_id: 'choice_id'
					}
				}
			};
			const mockReturn = null;
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			let error;
			try {
				await voteController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.HKID_INVALID);
		});

		it('should throw CAMPAIGN_NOT_FOUND Error if campaign cannot be found', async () => {
			const ctx = {
				request: {
					body: {
						hkid: 'Q1126314',
						campaign_id: 'campaign_id',
						choice_id: 'choice_id'
					}
				}
			};
			const mockReturn = null;
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			let error;
			try {
				await voteController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		});

		it('should throw CAMPAIGN_EXPIRED Error if campaign cannot be found', async () => {
			const ctx = {
				request: {
					body: {
						hkid: 'Q1126314',
						campaign_id: 'campaign_id',
						choice_id: 'choice_id'
					}
				}
			};
			const mockReturn = {
				start_time: '2019-01-01',
				end_time: '2019-01-01'
			};
			mockdate.set(1546387200000); // 2019-01-02
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			let error;
			try {
				await voteController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CAMPAIGN_EXPIRED);
		});

		it('should throw CHOICE_NOT_FOUND Error if campaign cannot be found', async () => {
			const ctx = {
				request: {
					body: {
						hkid: 'Q1126314',
						campaign_id: 'campaign_id',
						choice_id: '5c2bff00f0f2d739bb48bd09'
					}
				}
			};
			const mockReturn = {
				start_time: '2019-01-01',
				end_time: '2019-02-01',
				choices: [{
					_id: 'some_other_choice_id'
				}]
			};
			mockdate.set(1546387200000); // 2019-01-02
			mockingoose(CampaignModel).toReturn(mockReturn, 'findOne');
			let error;
			try {
				await voteController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.CHOICE_NOT_FOUND);
		});

		it('should throw ALREADY_VOTED Error if campaign cannot be found', async () => {
			const ctx = {
				request: {
					body: {
						hkid: 'Q1126314',
						campaign_id: 'campaign_id',
						choice_id: '5c2bff00f0f2d739bb48bd09'
					}
				}
			};
			const mockCampaignReturn = {
				start_time: '2019-01-01',
				end_time: '2019-02-01',
				choices: [{
					_id: '5c2bff00f0f2d739bb48bd09'
				}]
			};
			mockdate.set(1546387200000); // 2019-01-02
			mockingoose(CampaignModel).toReturn(mockCampaignReturn, 'findOne');
			const mockVoteReturn = {
				hkid_hash: voteModel.hash(ctx.request.body.hkid),
				campaign_id: ctx.request.body.campaign_id
			};
			mockingoose(VoteModel).toReturn(mockVoteReturn, 'findOne');
			let error;
			try {
				await voteController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(error).toBe(ERROR_KEYS.ALREADY_VOTED);
		});

		it('should return 201 when vote success', async () => {
			const ctx = {
				request: {
					body: {
						hkid: 'Q1126314',
						campaign_id: '5c2bff00f0f2d739bb48bd09',
						choice_id: '5c2bff00f0f2d739bb48bd09'
					}
				}
			};
			const mockCampaignReturn = {
				start_time: '2019-01-01',
				end_time: '2019-02-01',
				choices: [{
					_id: '5c2bff00f0f2d739bb48bd09'
				}]
			};
			mockdate.set(1546387200000); // 2019-01-02
			mockingoose(CampaignModel).toReturn(mockCampaignReturn, 'findOne');
			const mockVoteReturn = null;
			mockingoose(VoteModel).toReturn(mockVoteReturn, 'findOne');
			mockingoose(VoteModel).toReturn(mockVoteReturn, 'save');
			let error;
			try {
				await voteController.create(ctx);
			} catch (e) {
				error = e.ERROR_KEY;
			}
			expect(ctx.status).toBe(201);
			expect(error).toBe(undefined);
		});
	});
});
