const { RateLimit, Stores } = require('koa2-ratelimit');

const config = require('../../../config');

// rate limiting options
RateLimit.defaultOptions({
	store: new Stores.Redis({
		host: config.redis.address,
		port: config.redis.port,
		db: config.redis.db.rate_limiter
	})
});
// rate limit for backend endpoints
const backendRateLimit = RateLimit.middleware({
	windowMs: 60000, // 1 min
	max: 10
});

module.exports = { backendRateLimit };
