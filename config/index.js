const _ = require('lodash');

const developmentConfig = require('./development');
const production = require('./production');

const productionConfig = _.merge(_.cloneDeep(developmentConfig), production);

const config = {
	development: developmentConfig,
	production: productionConfig
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
