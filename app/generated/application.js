'use strict';

// Init the application configuration module for AngularJS application
var app = (function () {
    // Init module configuration options
    var name = 'app';
    var vendors = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngRoute',
        'ngTouch',
        'ngSanitize',
        'pascalprecht.translate',
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
        angular.module(name).requires.push(moduleName);
    };

    return {
        name: name,
        vendors: vendors,
        registerModule: registerModule,
        addModule: addModule
    };
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(app.name, app.vendors);

// Setting HTML5 Location Mode
angular.module(app.name).config(
    ["$locationProvider", "$translateProvider", function ($locationProvider, $translateProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $translateProvider.useStaticFilesLoader({
            prefix: '/i18n/resources-locale_',
            suffix: '.json'
        });

        $translateProvider.useLocalStorage();
        $translateProvider.preferredLanguage('en');

    }]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {

    //Then init the app
    angular.bootstrap(document, [app.name]);
});
'use strict';

// Use Applicaion configuration module to register a new module
app.registerModule('articles');
'use strict';

// Use Applicaion configuration module to register a new module
app.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
app.registerModule('users');

'use strict';

//Configuring the Articles module
angular
    .module('articles')
    .run(function () {

    });
'use strict';

// Setting up route
angular
    .module('articles')
    .config(
    ["$routeProvider", function ($routeProvider) {
        // Articles state routing

    }]);
'use strict';

angular.
    module('articles').
    controller('ArticlesController',
    ["$scope", function ($scope) {

    }]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular
    .module('articles')
    .factory('Articles',
    ["$resource", function ($resource) {
        return $resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
'use strict';
angular
    .module('core')
    .run(
    ["$rootScope", "$translate", "LocalStorage", "VK", "Auth", "Config", function ($rootScope, $translate, LocalStorage, VK, Auth, Config) {

        // Init data
        $rootScope.auth = Auth;
        $rootScope.conf = Config;
        $rootScope.route = {};
        $rootScope.vk = {};
        $rootScope.google = {};

        $translate.use(LocalStorage.getLocale());
        VK.init();
    }]);

'use strict';
angular
    .module('core')
    .constant('VKONTAKTE', {
        name: 'vk',
        APP_ID: 4588210,
        uid: 'user_id'
    })
    .constant('FACEBOOK', {
        name: 'facebook',
        APP_ID: '846841298681206',
        uid: 'id'
    })
    .constant('GOOGLE', {
        name: 'google',
        EXT_ID: 'dlliipgdjogiifieihjpfoccjnnmjild',
        APP_ID: '',
        uid: 'id'
    });

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
            })
            .when('/oauth/:social', {
                template: '',
                controller: 'AuthController'

            });
    }]
);
'use strict';

angular
    .module('core')
    .controller('AuthController',
    ["$rootScope", "$scope", "$routeParams", "$location", "Services", "Auth", function ($rootScope, $scope, $routeParams, $location, Services, Auth) {
        var hash = $location.hash(),
            social = $routeParams.social;
        $scope.url2json = function (url) {
            return JSON.parse('{"' + decodeURI(url).replace(/#/g, '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        };
        if (hash && social) {
            Auth.setUser(social, $scope.url2json(hash));
            Services[social].getSocialInfo();
            $location.hash('');
            $location.path('/look');
        }

    }]);

'use strict';

angular
    .module('core')
    .controller('FreeLookController',
    ["$rootScope", "$scope", "$route", "$location", "$routeParams", "VK", "Google", "FB", function ($rootScope, $scope, $route, $location, $routeParams, VK, Google,FB) {

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
                case 'facebook':
                    FB.search(input, function(data){
                        $rootScope.facebook = {
                            data: data
                        };
                    });
                    break;
            }
        };

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
    .controller('LangController', ["$scope", "$translate", function ($scope, $translate) {

        $scope.lang = $translate.use();
        $scope.setLang = function () {
            $translate.use($scope.lang);
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
    .controller('StartController', ["$rootScope", "$scope", "Auth", "Services", function ($rootScope, $scope, Auth, Services) {
        $scope.oauth = function (socialName) {
            var oauthURl = Services[socialName].getAuthURL();
            Auth.oauth(oauthURl);
        };
        $scope.clear = function (profile) {
            Auth.clearUser(profile);
        };
        $scope.add = function () {
            var url = 'https://chrome.google.com/webstore/detail/dlliipgdjogiifieihjpfoccjnnmjild';
            var callBack = function () {
                console.dir(arguments);
            };
            window.chrome.webstore.install(url, callBack, callBack);
        };
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
    .factory('Config', ["Constants", function (Constants) {

        function ready() {
        return window.chrome && window.chrome.app && window.chrome.app.isInstalled;
        }

        return {
            ready: ready
        };
    }]);

'use strict';
angular
    .module('core')
    .factory('Constants', ["VKONTAKTE", "FACEBOOK", function (VKONTAKTE, FACEBOOK) {
        return {
            vk: VKONTAKTE,
            facebook: FACEBOOK
        };
    }]);

'use strict';
angular
    .module('core')
    .factory('FB', ["$window", "$http", "LocalStorage", "Auth", "FACEBOOK", function ($window, $http, LocalStorage, Auth, FACEBOOK) {
        var FB = {};

        FB.getAvatar = function () {
            var fbr = 'https://graph.facebook.com/me/picture?&access_token=' + FB.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (r) {
                if (r && r.data) {
                    FB.setSocialInfo(r.data);
                }
            });
        };

        FB.setSocialInfo = function (data) {
            if (data) {
                var value = angular.extend(Auth.getUser(FACEBOOK.name), data);
                Auth.setUser(FACEBOOK.name, value);
            }
        };

        FB.getSocialInfo = function (callBack) {
            if (!callBack) {
                callBack = FB.setSocialInfo;
                FB.getAvatar();
            }
            var fbr = 'https://graph.facebook.com/me?&access_token=' + FB.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data);
                }
            });
        };

        FB.getToken = function () {
            return Auth.getUser(FACEBOOK.name).access_token;
        };

        FB.getID = function () {
            return Auth.getUID(FACEBOOK.name);
        };

        FB.search = function (input, callBack) {
            var fbr = 'https://graph.facebook.com/me/feed?&access_token=' + FB.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data);
                }
            });
        };

        FB.getAuthURL = function () {
            return 'https://www.facebook.com/dialog/oauth?client_id=' + FACEBOOK.APP_ID + '&display=popup&scope=email,read_stream&response_type=token&redirect_uri=' + $window.location.origin + '/oauth/facebook/';
        };

        return FB;
    }]);
'use strict';
angular
    .module('core')
    .factory('Google', ["$http", function ($http) {
        var Google = {};

        Google.search = function (data, callBack) {
            if (data) {
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
        var LOCALE_KEY = 'NG_TRANSLATE_LANG_KEY';

        function _getItem(key, defaultValue, noParse) {
            var localStorageValue = noParse ?
                $window.localStorage.getItem(key) :
                JSON.parse($window.localStorage.getItem(key));

            if (!defaultValue) {
                defaultValue = null;
            }

            return (localStorageValue) ? localStorageValue : defaultValue;
        }

        function _setItem(key, value, noParse) {
            var localStorageValue = noParse ?
                value :
                JSON.stringify(value);
            $window.localStorage.setItem(key, localStorageValue);
        }

        function getLocale() {
            var lang = ($window.navigator.userLanguage || $window.navigator.language || 'EN_US').toLowerCase().split('-')[0];
            if (lang && lang !== 'ru') {
                lang = 'en';
            }

            return _getItem(LOCALE_KEY, lang, true);
        }

        function setLocale(lang) {
            _setItem(LOCALE_KEY, lang, true);
        }

        function getUser(socialName) {
            return _getItem(socialName);
        }

        function setUser(socialName, user) {
            _setItem(socialName, user);
        }

        return {
            getLocale: getLocale,
            setLocale: setLocale,
            getUser: getUser,
            setUser: setUser
        };
    }]);
'use strict';
angular
    .module('core')
    .factory('Services', ["VK", "VKONTAKTE", "FB", "FACEBOOK", function (VK, VKONTAKTE, FB, FACEBOOK) {
        return {
            vk: VK,
            facebook: FB
        };
    }]);

'use strict';
angular
    .module('core')
    .factory('VK',
    ["$window", "$location", "$http", "$rootScope", "Auth", "VKONTAKTE", "toaster", function ($window, $location, $http, $rootScope, Auth, VKONTAKTE, toaster) {


        var VK = {};

        VK.init = function () {};

        VK.getSocialInfo = function (callBack) {
            if(Auth.is(VKONTAKTE.name)) {
                if (!callBack) {
                    callBack = function (data) {
                        if (data) {
                            var value = angular.extend(Auth.getUser(VKONTAKTE.name), data);
                            Auth.setUser(VKONTAKTE.name, value);
                        }
                    };
                }
                var vkr = 'http://api.vk.com/method/users.get?user_ids=' + VK.getID() + '&fields=photo_50&callback=JSON_CALLBACK';
                $http.jsonp(vkr).success(function (data) {
                    if (data) {
                        callBack(data.response[0]);
                    }
                });
            } else {
                toaster.pop('error', 'Sorry error', ':(');
            }

        };

        VK.search = function (data, callBack) {
            var vkr = 'http://api.vk.com/method/newsfeed.search?q=' + data + '&count=10&extended=1&v=5.25&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data && data.response) {
                    callBack(data.response);
                }
            });
        };

        VK.getAuthURL = function () {
            return 'https://oauth.vk.com/authorize?client_id=' + VKONTAKTE.APP_ID + '&scope=notes,wall,friends,email,offline,notifications&redirect_uri=' + $window.location.origin + '/oauth/vk' + '&display=popup&v=5.25&response_type=token';
        };

        VK.getToken = function () {
            return Auth.getUser(VKONTAKTE.name).access_token;
        };

        VK.getID = function () {
            return Auth.getUID(VKONTAKTE.name);
        };

        VK.addNote = function () {
            var vkr = 'https://api.vk.com/method/notes.add?title=' + VK.getID() + '&text=ok&privacy=0&access_token=' + VK.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data) {
                    console.log(data);
                }
            });
        };

        VK.getNews = function () {
            var vkr = 'https://api.vk.com/method/newsfeed.get?filters=post&access_token=' + VK.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data) {
                    console.log(data);
                }
            });
        };

        VK.addWall = function () {
            var vkr = 'https://api.vk.com/method/wall.post?owner_id=' + VK.getID() + 'message=test&access_token=' + VK.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data) {
                    console.log(data);
                }
            });
        };

        $window.addNote = VK.addNote;
        $window.getNews = VK.getNews;
        $window.addWall = VK.addWall;

        return VK;
    }]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Auth',
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

// Authentication service for user variables
angular
    .module('users')
    .factory('Auth',
    ["$window", "LocalStorage", "Constants", function ($window, LocalStorage, Constants) {
        var Auth = {};

        Auth.getUser = function(socialName) {
            return LocalStorage.getUser(Constants[socialName].name) || {};
        };
        Auth.setUser = function (socialName, user) {
            Auth.user[socialName] = user;
            LocalStorage.setUser(socialName, user);
        };
        Auth.clearUser = function (socialName) {
            LocalStorage.setUser(socialName, {});
            Auth.user[socialName] = {};
        };
        Auth.is = function (socialName) {
            return !!Auth.getUID(socialName);
        };

        Auth.oauth = function (authURL) {
            $window.location = authURL;
        };

        Auth.getUID = function(socialName) {
            return Auth.getUser(socialName)[Constants[socialName].uid];
        };

        Auth.user = {
            vk:  Auth.getUser('vk'),
            facebook: Auth.getUser('facebook')
        };

        return Auth;
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
    "<div class=\"scrollable\"><div class=\"scrollable-content\"><div class=\"list-group\" toggle=\"off\" bubble=\"\" target=\"right-sidebar\"></div></div></div><span></span>"
  );

  $templateCache.put("modules/core/views/main.client.view.html",
    "<div data-ng-if=\"route.social\"><div data-ng-if=\"route.social === 'vk'\"><ul class=\"list-group\"><li class=\"list-group-item media\" data-ng-repeat=\"msg in vk.data.items\" data-ng-if=\"msg.text\"><div class=\"media-body\"><h4 class=\"media-heading\"><span data-translate=\"Date\"></span><span class=\"space-left-5\">{{ msg.date | date:'medium'}}</span></h4><p data-ng-bind=\"msg.text\"></p></div></li></ul></div><div data-ng-if=\"route.social === 'google'\"><ul class=\"list-group\"><li class=\"list-group-item media\" data-ng-repeat=\"msg in google.data.results\" data-ng-if=\"msg.content\"><div class=\"media-body\"><h4 class=\"media-heading\" data-ng-bind-html=\"msg.title\"></h4><p data-ng-bind-html=\"msg.content\"></p></div></li></ul></div><div data-ng-if=\"route.social !== 'vk' && route.social !== 'google'\"><span data-i18n=\"soon\"></span></div></div>"
  );

  $templateCache.put("modules/core/views/start.client.view.html",
    "<h1 class=\"app-name upper-text text-center\" data-translate=\"freelook\"></h1><div class=\"scrollable\" data-ng-controller=\"StartController\"><div class=\"scrollable-content\"><div><div class=\"page-signin\"><div class=\"signin-body\"><div class=\"form-container\"><section class=\"text-center\" data-ng-if=\"!conf.ready()\"><button data-ng-click=\"add()\" id=\"install-button\">Add to Chrome</button></section><section class=\"text-center\" data-ng-if=\"conf.ready()\"><span data-ng-if=\"!auth.is('vk')\" class=\"btn-vk-round\" data-ng-click=\"oauth('vk')\"><i class=\"fa fa-vk\"></i></span> <img data-ng-if=\"auth.is('vk')\" ng-src=\"{{auth.user.vk.photo_50}}\" title=\"vkontakte\" class=\"img-circle img50_50\" data-ng-click=\"go({profile:'vk'})\"><div class=\"space\"></div><span data-ng-if=\"!auth.is('facebook')\" class=\"btn-facebook-round\" data-ng-click=\"oauth('facebook')\"><i class=\"fa fa-facebook\"></i></span> <img data-ng-if=\"auth.is('facebook')\" ng-src=\"{{auth.user.facebook.url}}\" title=\"facebook\" class=\"img-circle img50_50\" data-ng-click=\"go({profile:'facebook'})\"><div class=\"space\"></div><span class=\"btn-twitter-round\" data-ng-click=\"go({profile:'twitter'})\"><i class=\"fa fa-twitter\"></i></span><div class=\"space\"></div><span class=\"btn-google-plus-round\" data-ng-click=\"go({profile:'google'})\"><i class=\"fa fa-google-plus\"></i></span><div class=\"space\"></div><span class=\"btn-google-plus-round\" data-ng-click=\"go({profile:'instagram'})\"><i class=\"fa fa-instagram\"></i></span></section><span class=\"line-thru upper-text\" data-translate=\"Info\"></span><section><div class=\"panel panel-default\" data-ng-show=\"route.profile\"><div class=\"panel-heading\"><strong><span class=\"glyphicon glyphicon-th\"></span> <span data-translate=\"Profile_\"></span><span>{{route.profile}}</span></strong><div class=\"pull-right\"><a data-ng-if=\"auth.is('vk') && route.profile === 'vk'\n" +
    "                                        || auth.is('facebook') && route.profile === 'facebook'\" data-ng-click=\"clear(route.profile)\" data-translate=\"sign out\"></a> <span data-ng-if=\"!auth.is('vk') && route.profile === 'vk'\n" +
    "                                        || !auth.is('facebook') && route.profile === 'facebook'\" data-translate=\"sign in\"></span></div></div><div class=\"panel-body\"><div class=\"media\"><div class=\"media-body\" data-ng-if=\"auth.is('vk') && route.profile === 'vk'\"><ul class=\"list-unstyled list-info\"><li><span class=\"icon glyphicon glyphicon-user\"></span><label>User name</label>{{auth.user.vk.email}}</li><li><span class=\"icon glyphicon glyphicon-globe\"></span><label>ID</label>{{auth.user.vk.user_id}}</li></ul></div><div class=\"media-body\" data-ng-if=\"auth.is('facebook') && route.profile === 'facebook'\"><ul class=\"list-unstyled list-info\"><li><span class=\"icon glyphicon glyphicon-user\"></span><label>User name</label>{{auth.user.facebook.email}}</li><li><span class=\"icon glyphicon glyphicon-globe\"></span><label>ID</label>{{auth.user.facebook.id}}</li></ul></div></div></div></div></section></div></div></div></div></div></div>"
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
