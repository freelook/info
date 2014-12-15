'use strict';

module.exports = {
	app: {
		title: 'freelook.info',
		description: 'api',
		keywords: 'free look at info'
	},
	port: process.env.PORT || 4000,
	templateEngine: 'swig',
	sessionSecret: 'freelook.info',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};