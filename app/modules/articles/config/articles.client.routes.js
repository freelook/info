'use strict';

// Setting up route
angular
	.module('articles')
	.config(
	function($routeProvider) {
		// Articles state routing
		$routeProvider.
			when('/articles', {
				templateUrl: 'modules/articles/views/list-articles.client.view.html'
			}).
			when('/articles/create', {
				templateUrl: 'modules/articles/views/create-article.client.view.html'
			}).
			when('/articles/:articleId', {
				templateUrl: 'modules/articles/views/view-article.client.view.html'
			}).
			when('/articles/:articleId/edit', {
				templateUrl: 'modules/articles/views/edit-article.client.view.html'
			});
	}
);