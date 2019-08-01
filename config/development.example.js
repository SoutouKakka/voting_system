module.exports = {
	server: {
		port: 1234 // default port used in readme
	},
	mongodb: {
		// example 1, localhost MongoDB: mongodb://localhost:27017
		// example 2, MongoDB Atlas: mongodb+srv://[monbodb_atlas_connection_string]
		address: 'mongodb://localhost:27017',
		database: 'voting_system'
	},
	redis: {
		address: '127.0.0.1',
		port: 6379,
		db: {
			rate_limiter: 1
		}
	}
};
