'use strict';

/*
 * Export the proper config
 */
switch (process.env.NODE_ENV) {
	case 'production':
		module.exports = require('./production.json');
		break;

	case 'development':
		module.exports = require('./development.json');
		break;

	default:
		module.exports = require('./local.json');
		break;
}
