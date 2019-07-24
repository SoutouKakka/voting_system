const mongoose = require('mongoose');

const config = require('../../config');

const { address, database } = config.mongodbAtlas;
const connectionString = `${address}/${database}?retryWrites=true&w=majority`;

async function createMongooseConnection() {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	await mongoose.connect(connectionString);
}

module.exports = createMongooseConnection;
