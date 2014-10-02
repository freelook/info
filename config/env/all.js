'use strict';

module.exports = {
	app: {
		title: 'freelook',
		description: 'freelook.info',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'app/lib/bootstrap/dist/css/bootstrap.css',
				'app/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'app/lib/angular/angular.js',
				'app/lib/angular-resource/angular-resource.js',
				'app/lib/angular-cookies/angular-cookies.js',
				'app/lib/angular-animate/angular-animate.js',
				'app/lib/angular-touch/angular-touch.js',
				'app/lib/angular-sanitize/angular-sanitize.js',
				'app/lib/angular-ui-router/release/angular-ui-router.js',
				'app/lib/angular-ui-utils/ui-utils.js',
				'app/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [
			'app/modules/**/css/*.css'
		],
		js: [
			'app/config.js',
			'app/application.js',
			'app/modules/*/*.js',
			'app/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'app/lib/angular-mocks/angular-mocks.js',
			'app/modules/*/tests/*.js'
		]
	}
};