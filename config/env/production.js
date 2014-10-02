'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/freelook',
	assets: {
		lib: {
			css: [
				'app/lib/bootstrap/dist/css/bootstrap.min.css',
				'app/lib/bootstrap/dist/css/bootstrap-theme.min.css'
			],
			js: [
				'app/lib/angular/angular.min.js',
				'app/lib/angular-resource/angular-resource.js',
				'app/lib/angular-cookies/angular-cookies.js',
				'app/lib/angular-animate/angular-animate.js',
				'app/lib/angular-touch/angular-touch.js',
				'app/lib/angular-sanitize/angular-sanitize.js',
				'app/lib/angular-ui-router/release/angular-ui-router.min.js',
				'app/lib/angular-ui-utils/ui-utils.min.js',
				'app/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
			]
		},
		css: 'app/dist/application.min.css',
		js: 'app/dist/application.min.js'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};