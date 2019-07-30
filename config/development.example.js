module.exports = {
	server: {
		port: 1234 // default port used in readme
	},
	mongodb: {
		// example 1, localhost MongoDB: mongodb://localhost:27017
		// example 2, MongoDB Atlas: mongodb+srv://[monbodb_atlas_connection_string]
		address: '<YOUR_MONGODB_ADDRESS>',
		database: '<YOUR_DATABASE_NAME>'
	},
	redis: {
		address: '<YOUR_REDIS_ADDRESS>',
		port: '<YOUR_REDIS_PORT>'
	}
};
