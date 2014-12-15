'use strict';

// Setting up route
angular
	.module('users')
	.config(
	function($routeProvider) {
		// Users state routing
		$routeProvider.
			when('/settings/profile', {
				templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
			}).
			when('/settings/password', {
				templateUrl: 'modules/users/views/settings/change-password.client.view.html'
			}).
			when('/settings/accounts', {
				templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
			}).
			when('/signup', {
				templateUrl: 'modules/users/views/authentication/signup.client.view.html'
			}).
			when('/signin', {
				templateUrl: 'modules/users/views/authentication/signin.client.view.html'
			}).
			when('/password/forgot', {
				templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
			}).
			when('/password/reset/invalid', {
				templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
			}).
			when('/password/reset/success', {
				templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
			}).
			when('/password/reset/:token', {
				templateUrl: 'modules/users/views/password/reset-password.client.view.html'
			});
	}
);