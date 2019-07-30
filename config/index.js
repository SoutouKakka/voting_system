const _ = require('lodash');

const defaultConfig = require('./default');
const development = require('./development');
const production = require('./production');

const developmentConfig = _.merge(_.cloneDeep(defaultConfig), development);
const productionConfig = _.merge(_.cloneDeep(developmentConfig), production);

const config = {
	development: developmentConfig,
	production: productionConfig
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
