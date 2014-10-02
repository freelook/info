'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../server/controllers/core');
	app.route('/').get(core.index);
};