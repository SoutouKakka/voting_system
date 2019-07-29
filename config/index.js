const _ = require('lodash');

const developmentConfig = require('./development');
const productionConfig = require('./production');

const config = {
	development: developmentConfig,
	production: _.merge(_.cloneDeep(developmentConfig), productionConfig)
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
