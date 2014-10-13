'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'app';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngRoute',
        'ngTouch',
        'ngSanitize',
        'mobile-angular-ui',
        'toaster'
    ];

    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        addModule(moduleName);
    };

    var addModule = function(moduleName){
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule,
        addModule: addModule
    };
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

'use strict';

// Configuring the Articles module
//angular.module('articles').run(['Menus',
//	function(Menus) {
//		// Set top bar menu items
//		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
//		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
//		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
//	}
//]);
'use strict';

// Setting up route
angular
	.module('articles')
	.config(
	["$routeProvider", function($routeProvider) {
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
	}]);
'use strict';

angular.
	module('articles').
	controller('ArticlesController',
	["$scope", "$routeParams", "$location", "Authentication", "Articles", function ($scope, $routeParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function () {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function (response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function (article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function () {
					$location.path('articles');
				});
			}
		};

		$scope.update = function () {
			var article = $scope.article;

			article.$update(function () {
				$location.path('articles/' + article._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function () {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function () {
			$scope.article = Articles.get({
				articleId: $routeParams.articleId
			});
		};
	}]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';
angular
    .module('core')
    .run(
    ["$rootScope", "Localize", "VK", function ($rootScope, Localize, VK) {

        // Init data
        $rootScope.route = {};
        $rootScope.vk = {};
        $rootScope.google = {};

        Localize.initLocalizedResources();
        VK.init();
    }]);

'use strict';
angular
    .module('core')
    .constant('key', 'value');

'use strict';

// Setting up route
angular
    .module('core')
    .config(
    ["$routeProvider", function ($routeProvider) {
        // Redirect to home view when route not found
        $routeProvider.otherwise('/look');

        // Home state routing
        $routeProvider.
            when('/:action', {
                templateUrl: 'modules/core/views/main.client.view.html',
                controller: 'MainController'
            });
    }]
);
'use strict';

angular
    .module('core')
    .controller('FreeLookController',
    ["$rootScope", "$scope", "$route", "$location", "$routeParams", "VK", "Google", "Authentication", function ($rootScope, $scope, $route, $location, $routeParams, VK, Google, Authentication) {

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });

        $rootScope.go = function (params) {
            $route.updateParams(params);
        };

        $rootScope.do = function (input) {
            $route.updateParams({input: input});
            switch ($rootScope.route.social) {
                case 'vk':
                    VK.search(input, function (data) {
                        $rootScope.vk = {
                            data: data
                        };
                    });
                    break;
                case 'google':
                    Google.search(input, function (data) {
                        $rootScope.google = {
                            data: data
                        };
                    });
                    break;
            }
        };

        $rootScope.auth = Authentication;

        VK.onLiked(
            function () {
                VK.signIn();
            }
        );
    }]);
'use strict';

angular.
    module('core').
    controller('HeaderController',
	["$scope", "Authentication", function($scope, Authentication) {
		$scope.authentication = Authentication;

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}]);


'use strict';
angular
    .module('core')
    .controller('InputController', ["$rootScope", "$scope", "$route", "VK", function ($rootScope, $scope, $route, VK) {
        $scope.submit = function(form) {
            if(form.data && form.data.$viewValue) {
                $rootScope.do(form.data.$viewValue);
            }
        };
    }]);

'use strict';
angular
    .module('core')
    .controller('LangController', ["$scope", "Localize", "LocalStorage", function ($scope, Localize, LocalStorage) {
        if (LocalStorage.getLocale() === 'ru') {
            $scope.lang = 'ru';
        } else {
            $scope.lang = 'en';
        }
        $scope.setLang = function () {
            switch ($scope.lang) {
                case 'ru':
                    Localize.setLanguage('RU-RU');
                    break;
                default:
                    Localize.setLanguage('EN-US');
            }
        };
    }]);

'use strict';

angular
    .module('core')
    .controller('MainController',
    ["$rootScope", "$routeParams", function ($rootScope, $routeParams) {
        $rootScope.route = $routeParams;

        if ($routeParams.input) {
            $rootScope.do($routeParams.input);
        }

    }]);
'use strict';

angular
    .module('core')
    .controller('StartController', ["$rootScope", "$scope", function ($rootScope, $scope) {

    }]);

'use strict';
angular
    .module('core')
    .directive('i18n', ["Localize", function (Localize) {
        var i18nDirective = {
            restrict: 'EA',
            updateText: function (ele, input, placeholder) {
                var result;
                return result = void 0,
                        'i18n-placeholder' === input ?
                            (result = Localize.getLocalizedString(placeholder), ele.attr('placeholder', result))
                            : input.length >= 1 ?
                            (result = Localize.getLocalizedString(input), ele.text(result))
                            : void 0;
            },
            link: function (scope, ele, attrs) {
                return scope.$on('localizeResourcesUpdated', function () {
                    return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder);
                }), attrs.$observe('i18n', function (value) {
                    return i18nDirective.updateText(ele, value, attrs.placeholder);
                });
            }};
        return i18nDirective;
    }]);

'use strict';
angular
    .module('core')
    .filter('unixtime', function () {
        return function (unixtime) {
            return new Date(unixtime);
        };
    });

'use strict';
angular
    .module('core')
    .factory('Google', ["$http", function ($http) {
        var Google = {};

        Google.search = function(data, callBack) {
            if(data) {
                var gp = 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + data + '&callback=JSON_CALLBACK';
                $http.jsonp(gp).success(function (data) {
                    if (data && data.responseData) {
                        callBack(data.responseData);
                    }
                });
            }

        };

        return Google;

    }]);

'use strict';
angular
    .module('core')
    .factory('LocalStorage',
    ["$window", function ($window) {
        var LOCALE_KEY = 'locale',
            VK_KEY = 'vk';

        function _getItem(key, defaultValue) {
            var localStorageValue = JSON.parse($window.localStorage.getItem(key));

            if (!defaultValue) {
                defaultValue = null;
            }

            return (localStorageValue) ? localStorageValue : defaultValue;
        }

        function _setItem(key, value) {
            $window.localStorage.setItem(key, JSON.stringify(value));
        }

        function getLocale() {
            var lang = ($window.navigator.userLanguage || $window.navigator.language || 'EN_US').toLowerCase().split('-')[0];
            if (lang && lang !== 'ru') {
                lang = 'en';
            }

            return _getItem(LOCALE_KEY, lang);
        }

        function setLocale(lang) {
            _setItem(LOCALE_KEY, lang);
        }

        function getVK() {
            return _getItem(VK_KEY);
        }

        function setVK(vk) {
            _setItem(VK_KEY, vk);
        }

        return {
            getLocale: getLocale,
            setLocale: setLocale,
            getVK: getVK,
            setVK: setVK
        };
    }]);
'use strict';
angular
    .module('core')
    .factory('Localize',
        ["$http", "$rootScope", "$window", "LocalStorage", function ($http, $rootScope, $window, LocalStorage) {
            var localize = {
                language: 'en',
                url: null,
                resourceFileLoaded: !1,
                successCallback: function (data) {
                    return localize.dictionary = data, localize.resourceFileLoaded = !0, $rootScope.$broadcast('localizeResourcesUpdated');
                },
                setLanguage: function (value) {
                    return LocalStorage.setLocale(value.toLowerCase().split('-')[0]), localize.initLocalizedResources();
                },
                setUrl: function (value) {
                    return localize.url = value, localize.initLocalizedResources();
                },
                buildUrl: function () {
                    return 'i18n/resources-locale_' + localize.language + '.json';
                },
                initLocalizedResources: function () {
                    var url;
                    localize.language = LocalStorage.getLocale();
                    return url = localize.url || localize.buildUrl(), $http({method: 'GET', url: url, cache: !0}).success(localize.successCallback).error(function () {
                        return $rootScope.$broadcast('localizeResourcesUpdated');
                    });
                },
                getLocalizedString: function (value) {
                    var result;
                    return result = void 0, localize.dictionary && value ? ( result = !localize.dictionary[value] ? value : localize.dictionary[value]) : result = value, result;
                }};
            return localize;
        }]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';
angular
    .module('core')
    .factory('VK',
    ["$window", "$location", "$http", "$rootScope", "Authentication", "LocalStorage", "toaster", function ($window, $location, $http, $rootScope, Authentication, LocalStorage, toaster) {
        // TODO use constant!
        var VK = {};
        VK.init = function () {
            if ($window.VK && $window.VK.Widgets) {
                var loc = $location.host() + '/' + Authentication.date;
                console.dir(loc);
                $window.VK.init({apiId: 3520312, onlyWidgets: true});
                if (!Authentication.user && !Authentication.user.vk) {
                    $window.VK.Widgets.Like('vk_signin', {type: 'vertical', verb: 1, height: 24, pageUrl: loc});
                }
                $window.VK.Widgets.Post('vk_post', -50609732, 124, 'hWNjwJubCJ69XFWPH_s0GcVXSnI');
                if (VK.user()) {
                    $rootScope.vk.user = VK.user();
                } else {
                    VK.getSocialInfo();
                }
            }

        };

        VK.subscribe = function (event, callback) {
            if ($window.VK && $window.VK.Observer && $window.VK.Observer.subscribe) {
                $window.VK.Observer.subscribe(event, callback);
            }
        };
        VK.onLiked = function (callback) {
            VK.subscribe('widgets.like.liked', callback);
        };
        VK.onUnLiked = function (callback) {
            VK.subscribe('widgets.like.unliked', callback);
        };
        VK.signIn = function () {
            $http.post('/auth/vk').then(function (response) {
                var usr = response.data.user;
                if (response.data.success) {
                    if (usr) {
                        Authentication.setUser(usr);
                        VK.getSocialInfo();
                        toaster.pop('success', 'Wellcome', usr.username);
                    }
                } else {
                    console.log(response);
                    toaster.pop('error', 'Sorry error', response.data.message || response.statusText || ':(');
                }
            }).catch(function(response) {
                console.log(response);
                toaster.pop('error', 'Sorry error', response.statusText || ':(');
            });
        };
        VK.getSocialInfo = function (callBack) {
            if (Authentication.isVK()) {
                if (!callBack) {
                    callBack = function (data) {
                        if (data) {
                            LocalStorage.setVK(data);
                            $rootScope.vk.user = data;
                        }
                    };
                }
                var vkr = 'http://api.vk.com/method/users.get?user_ids=' + Authentication.user.vk.uid + '&fields=photo_50&callback=JSON_CALLBACK';
                $http.jsonp(vkr).success(function (data) {
                    if (data) {
                        callBack(data.response[0]);
                    }
                });
            }
        };
        VK.user = function () {
            return LocalStorage.getVK() || VK.getSocialInfo();
        };

        VK.search = function (data, callBack) {
            var vkr = 'http://api.vk.com/method/newsfeed.search?q=' + data + '&count=10&extended=1&v=5.25&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data && data.response) {
                    callBack(data.response);
                }
            });
        };


        return VK;
    }]
);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular
	.module('users')
	.config(
	["$routeProvider", function($routeProvider) {
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
	}]
);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Authentication',
    ["$window", function ($window) {
        var Authentication = {
            user: $window.user,
            date: $window.date || (new Date()).getTime(),
            setUser: function(user) {
                $window.user = user;
                Authentication.user = user;
            },
            isVK: function() {
                return Authentication.user && Authentication.user.vk;
            }
        };

        return Authentication;
    }]
);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("modules/articles/views/create-article.client.view.html",
    "<section data-ng-controller=\"ArticlesController\"><div class=\"page-header\"><h1>New Article</h1></div><div class=\"col-md-12\"><form name=\"articleForm\" class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error': articleForm.title.$dirty && articleForm.title.$invalid }\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"content\">Content</label><div class=\"controls\"><textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Content\"></textarea></div></div><div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/articles/views/edit-article.client.view.html",
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Article</h1></div><div class=\"col-md-12\"><form name=\"articleForm\" class=\"form-horizontal\" data-ng-submit=\"update(articleForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && articleForm.title.$invalid}\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"article.title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div><div ng-show=\"submitted && articleForm.title.$invalid\" class=\"help-block\"><p ng-show=\"articleForm.title.$error.required\" class=\"text-danger\">Title is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && articleForm.content.$invalid}\"><label class=\"control-label\" for=\"content\">Content</label><div class=\"controls\"><textarea name=\"content\" data-ng-model=\"article.content\" id=\"content\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Content\" required=\"\"></textarea></div><div ng-show=\"submitted && articleForm.content.$invalid\" class=\"help-block\"><p ng-show=\"articleForm.content.$error.required\" class=\"text-danger\">Content is required</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/articles/views/list-articles.client.view.html",
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"find()\"><div class=\"page-header\"><h1>Articles</h1></div><div class=\"list-group\"><a data-ng-repeat=\"article in articles\" data-ng-href=\"#!/articles/{{article._id}}\" class=\"list-group-item\"><small class=\"list-group-item-text\">Posted on <span data-ng-bind=\"article.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"article.user.displayName\"></span></small><h4 class=\"list-group-item-heading\" data-ng-bind=\"article.title\"></h4><p class=\"list-group-item-text\" data-ng-bind=\"article.content\"></p></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"articles.$resolved && !articles.length\">No articles yet, why don't you <a href=\"/#!/articles/create\">create one</a>?</div></section>"
  );

  $templateCache.put("modules/articles/views/view-article.client.view.html",
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1 data-ng-bind=\"article.title\"></h1></div><div class=\"pull-right\" data-ng-show=\"authentication.user._id == article.user._id\"><a class=\"btn btn-primary\" href=\"/#!/articles/{{article._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><small><em class=\"text-muted\">Posted on <span data-ng-bind=\"article.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"article.user.displayName\"></span></em></small><p class=\"lead\" data-ng-bind=\"article.content\"></p></section>"
  );

  $templateCache.put("modules/core/views/google-search-demo.html",
    "<html><head><script src=\"https://www.google.com/jsapi\"></script><script>google.load(\"search\", \"1\");\n" +
    "\n" +
    "        // Call this function when the page has been loaded\n" +
    "        function initialize() {\n" +
    "            var searchControl = new google.search.SearchControl();\n" +
    "            searchControl.addSearcher(new google.search.WebSearch());\n" +
    "            //searchControl.addSearcher(new google.search.NewsSearch());\n" +
    "            searchControl.draw(document.getElementById(\"searchcontrol\"));\n" +
    "        }\n" +
    "        google.setOnLoadCallback(initialize);</script></head><body><div id=\"searchcontrol\"></div></body></html>"
  );

  $templateCache.put("modules/core/views/header.client.view.html",
    "<div class=\"container\" data-ng-controller=\"HeaderController\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" data-ng-click=\"toggleCollapsibleMenu()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a href=\"/#!/\" class=\"navbar-brand\">freelook</a></div><nav class=\"collapse navbar-collapse\" collapse=\"!isCollapsed\" role=\"navigation\"><ul class=\"nav navbar-nav\" data-ng-if=\"menu.shouldRender(authentication.user);\"><li data-ng-repeat=\"item in menu.items | orderBy: 'position'\" data-ng-if=\"item.shouldRender(authentication.user);\" ng-switch=\"item.menuItemType\" ui-route=\"{{item.uiRoute}}\" class=\"{{item.menuItemClass}}\" ng-class=\"{active: ($uiRoute)}\" dropdown=\"item.menuItemType === 'dropdown'\"><a ng-switch-when=\"dropdown\" class=\"dropdown-toggle\"><span data-ng-bind=\"item.title\"></span> <b class=\"caret\"></b></a><ul ng-switch-when=\"dropdown\" class=\"dropdown-menu\"><li data-ng-repeat=\"subitem in item.items | orderBy: 'position'\" data-ng-if=\"subitem.shouldRender(authentication.user);\" ui-route=\"{{subitem.uiRoute}}\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/{{subitem.link}}\" data-ng-bind=\"subitem.title\"></a></li></ul><a ng-switch-default=\"\" href=\"/#!/{{item.link}}\" data-ng-bind=\"item.title\"></a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=\"authentication.user\"><li ui-route=\"/signup\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signup\">Sign Up</a></li><li class=\"divider-vertical\"></li><li ui-route=\"/signin\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signin\">Sign In</a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=\"authentication.user\"><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span data-ng-bind=\"authentication.user.displayName\"></span> <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"/#!/settings/profile\">Edit Profile</a></li><li><a href=\"/#!/settings/accounts\">Manage Social Accounts</a></li><li data-ng-show=\"authentication.user.provider === 'local'\"><a href=\"/#!/settings/password\">Change Password</a></li><li class=\"divider\"></li><li><a href=\"/auth/signout\">Signout</a></li></ul></li></ul></nav></div>"
  );

  $templateCache.put("modules/core/views/info.client.view.html",
    "<div class=\"scrollable\"><div class=\"scrollable-content\"><div class=\"list-group\" toggle=\"off\" bubble=\"\" target=\"right-sidebar\"></div></div></div>"
  );

  $templateCache.put("modules/core/views/main.client.view.html",
    "<div data-ng-if=\"route.social\"><div data-ng-if=\"route.social === 'vk'\"><ul class=\"list-group\"><li class=\"list-group-item media\" data-ng-repeat=\"msg in vk.data.items\" data-ng-if=\"msg.text\"><div class=\"media-body\"><h4 class=\"media-heading\"><span data-i18n=\"Date\"></span><span class=\"space-left-5\">{{ msg.date | date:'medium'}}</span></h4><p data-ng-bind=\"msg.text\"></p></div></li></ul></div><div data-ng-if=\"route.social === 'google'\"><ul class=\"list-group\"><li class=\"list-group-item media\" data-ng-repeat=\"msg in google.data.results\" data-ng-if=\"msg.content\"><div class=\"media-body\"><h4 class=\"media-heading\" data-ng-bind-html=\"msg.title\"></h4><p data-ng-bind-html=\"msg.content\"></p></div></li></ul></div><div data-ng-if=\"route.social !== 'vk' && route.social !== 'google'\"><span data-i18n=\"soon\"></span></div></div>"
  );

  $templateCache.put("modules/core/views/start.client.view.html",
    "<h1 class=\"app-name upper-text text-center\" data-i18n=\"freelook\"></h1><div class=\"scrollable\" data-ng-controller=\"StartController\"><div class=\"scrollable-content\"><div><div class=\"page-signin\"><div class=\"signin-body\"><div class=\"form-container\"><section class=\"text-center\"><span data-ng-if=\"!auth.isVK()\" class=\"btn-vk-round\" data-ng-click=\"go({profile:'vk'})\"><i class=\"fa fa-vk\"></i></span> <img data-ng-if=\"auth.isVK()\" ng-src=\"{{vk.user.photo_50}}\" title=\"VK\" class=\"img-circle img50_50\" data-ng-click=\"go({profile:'vk'})\"><div class=\"space\"></div><span class=\"btn-facebook-round\" data-ng-click=\"go({profile:'facebook'})\"><i class=\"fa fa-facebook\"></i></span><div class=\"space\"></div><span class=\"btn-twitter-round\" data-ng-click=\"go({profile:'twitter'})\"><i class=\"fa fa-twitter\"></i></span><div class=\"space\"></div><span class=\"btn-google-plus-round\" data-ng-click=\"go({profile:'google'})\"><i class=\"fa fa-google-plus\"></i></span><div class=\"space\"></div><span class=\"btn-google-plus-round\" data-ng-click=\"go({profile:'instagram'})\"><i class=\"fa fa-instagram\"></i></span></section><span class=\"line-thru upper-text\" data-i18n=\"Info\"></span><section><div data-ng-show=\"!route.profile\" id=\"vk_post\"></div><div class=\"panel panel-default\" data-ng-show=\"route.profile\"><div class=\"panel-heading\"><strong><span class=\"glyphicon glyphicon-th\"></span> <span data-i18n=\"Profile_\"></span><span>{{route.profile}}</span></strong><div class=\"pull-right\"><a data-ng-if=\"auth.isVK()\" href=\"/auth/signout\" data-i18n=\"sign out\"></a> <span data-ng-if=\"!auth.isVK()\" data-i18n=\"sign in\"></span></div></div><div class=\"panel-body\"><div class=\"media\"><div class=\"media-body center\" data-ng-if=\"!auth.isVK()\"><div class=\"btn btn-signin\"><div id=\"vk_signin\" data-ng-show=\"route.profile === 'vk'\" class=\"auto\"></div><div class=\"auto\" data-ng-show=\"route.profile !== 'vk'\" data-i18n=\"soon\"></div></div></div><div class=\"media-body\" data-ng-if=\"auth.isVK()\"><ul class=\"list-unstyled list-info\"><li><span class=\"icon glyphicon glyphicon-user\"></span><label>User name</label>{{vk.user.first_name + ' ' + vk.user.last_name}}</li><li><span class=\"icon glyphicon glyphicon-globe\"></span><label>UID</label>{{vk.user.uid}}</li></ul></div></div></div></div></section></div></div></div></div><div ng-if=\"false\" class=\"panel-group\" id=\"accordion\"><div class=\"panel panel-default\"><div class=\"panel-heading\" toggle=\"\" target=\"collapseOne\"><h4 class=\"panel-title\">Collapsible Group Item #1</h4></div><div id=\"collapseOne\" toggleable=\"\" active-class=\"in\" exclusion-group=\"accordion1\" default=\"active\" class=\"panel-collapse collapse\"><div class=\"panel-body\">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\" toggle=\"\" target=\"collapseTwo\"><h4 class=\"panel-title\">Collapsible Group Item #2</h4></div><div id=\"collapseTwo\" toggleable=\"\" active-class=\"in\" exclusion-group=\"accordion1\" class=\"panel-collapse collapse\"><div class=\"panel-body\">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\" toggle=\"\" target=\"collapseThree\"><h4 class=\"panel-title\">Collapsible Group Item #3</h4></div><div id=\"collapseThree\" toggleable=\"\" active-class=\"in\" exclusion-group=\"accordion1\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><ul class=\"list-group\" toggle=\"off\" bubble=\"\" target=\"left-sidebar\"><li><a class=\"list-group-item\" href=\"#!/\"><span data-i18n=\"Home\"></span><i class=\"fa fa-chevron-right pull-right\"></i></a></li><li><a class=\"list-group-item\" href=\"#!/profile\"><span data-i18n=\"Users\"></span><i class=\"fa fa-chevron-right pull-right\"></i></a></li><li><a class=\"list-group-item\" href=\"#!/articles\"><span data-i18n=\"Articles\"></span><i class=\"fa fa-chevron-right pull-right\"></i></a></li></ul></div></div></div></div></div></div>"
  );

  $templateCache.put("modules/users/views/authentication/signin.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\">Sign in using your social accounts</h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div><h3 class=\"col-md-12 text-center\">Or with your account</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"signin()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"username\">Username</label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"Username\"></div><div class=\"form-group\"><label for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-primary\">Sign in</button>&nbsp; or&nbsp; <a href=\"/#!/signup\">Sign up</a></div><div class=\"forgot-password\"><a href=\"/#!/password/forgot\">Forgot your password?</a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/authentication/signup.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\">Sign up using your social accounts</h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div><h3 class=\"col-md-12 text-center\">Or with your email</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"signup()\" class=\"signin form-horizontal\" novalidate=\"\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" required=\"\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"credentials.firstName\" placeholder=\"First Name\"></div><div class=\"form-group\"><label for=\"lastName\">Last Name</label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"credentials.lastName\" placeholder=\"Last Name\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"credentials.email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"username\">Username</label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"Username\"></div><div class=\"form-group\"><label for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Sign up</button>&nbsp; or&nbsp; <a href=\"/#!/signin\" class=\"show-signup\">Sign in</a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/password/forgot-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"PasswordController\"><h3 class=\"col-md-12 text-center\">Restore your password</h3><p class=\"small text-center\">Enter your account username.</p><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"askForPasswordReset()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"Username\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-primary\">Submit</button></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password-invalid.client.view.html",
    "<section class=\"row text-center\"><h3 class=\"col-md-12\">Password reset is invalid</h3><a href=\"/#!/password/forgot\" class=\"col-md-12\">Ask for a new password reset</a></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password-success.client.view.html",
    "<section class=\"row text-center\"><h3 class=\"col-md-12\">Password successfully reset</h3><a href=\"/#!/\" class=\"col-md-12\">Continue to home page</a></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"PasswordController\"><h3 class=\"col-md-12 text-center\">Reset your password</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"resetUserPassword()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"newPassword\">New Password</label><input type=\"password\" id=\"newPassword\" name=\"newPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.newPassword\" placeholder=\"New Password\"></div><div class=\"form-group\"><label for=\"verifyPassword\">Verify Password</label><input type=\"password\" id=\"verifyPassword\" name=\"verifyPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.verifyPassword\" placeholder=\"Verify Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Update Password</button></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/change-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\">Change your password</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"changeUserPassword()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"currentPassword\">Current Password</label><input type=\"password\" id=\"currentPassword\" name=\"currentPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.currentPassword\" placeholder=\"Current Password\"></div><div class=\"form-group\"><label for=\"newPassword\">New Password</label><input type=\"password\" id=\"newPassword\" name=\"newPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.newPassword\" placeholder=\"New Password\"></div><div class=\"form-group\"><label for=\"verifyPassword\">Verify Password</label><input type=\"password\" id=\"verifyPassword\" name=\"verifyPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.verifyPassword\" placeholder=\"Verify Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Save Password</button></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>Password Changed Successfully</strong></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/edit-profile.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\">Edit your profile</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"updateUserProfile(userForm.$valid)\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"user.firstName\" placeholder=\"First Name\"></div><div class=\"form-group\"><label for=\"lastName\">Last Name</label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"user.lastName\" placeholder=\"Last Name\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"user.email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"username\">Username</label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"user.username\" placeholder=\"Username\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Save Profile</button></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>Profile Saved Successfully</strong></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/social-accounts.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\" data-ng-show=\"hasConnectedAdditionalSocialAccounts()\">Connected social accounts:</h3><div class=\"col-md-12 text-center\"><div data-ng-repeat=\"(providerName, providerData) in user.additionalProvidersData\" class=\"remove-account-container\"><img ng-src=\"/modules/users/img/buttons/{{providerName}}.png\"> <a class=\"btn btn-danger btn-remove-account\" data-ng-click=\"removeUserSocialAccount(providerName)\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><h3 class=\"col-md-12 text-center\">Connect other social accounts:</h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" data-ng-hide=\"isConnectedSocialAccount('facebook')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" data-ng-hide=\"isConnectedSocialAccount('twitter')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" data-ng-hide=\"isConnectedSocialAccount('google')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" data-ng-hide=\"isConnectedSocialAccount('linkedin')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" data-ng-hide=\"isConnectedSocialAccount('github')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div></section>"
  );

}]);
