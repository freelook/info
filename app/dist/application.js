"use strict";var ApplicationConfiguration=function(){var applicationModuleName="freelook",applicationModuleVendorDependencies=["ngResource","ngCookies","ngAnimate","ngRoute","ngTouch","ngSanitize","mobile-angular-ui"],registerModule=function(moduleName,dependencies){angular.module(moduleName,dependencies||[]),angular.module(applicationModuleName).requires.push(moduleName)};return{applicationModuleName:applicationModuleName,applicationModuleVendorDependencies:applicationModuleVendorDependencies,registerModule:registerModule}}();angular.module(ApplicationConfiguration.applicationModuleName,ApplicationConfiguration.applicationModuleVendorDependencies),angular.module(ApplicationConfiguration.applicationModuleName).config(["$locationProvider",function($locationProvider){$locationProvider.hashPrefix("!")}]),angular.element(document).ready(function(){"#_=_"===window.location.hash&&(window.location.hash="#!"),angular.bootstrap(document,[ApplicationConfiguration.applicationModuleName])}),ApplicationConfiguration.registerModule("articles"),ApplicationConfiguration.registerModule("core"),ApplicationConfiguration.registerModule("users"),angular.module("articles").config(["$routeProvider",function($routeProvider){$routeProvider.when("/articles",{templateUrl:"modules/articles/views/list-articles.client.view.html"}).when("/articles/create",{templateUrl:"modules/articles/views/create-article.client.view.html"}).when("/articles/:articleId",{templateUrl:"modules/articles/views/view-article.client.view.html"}).when("/articles/:articleId/edit",{templateUrl:"modules/articles/views/edit-article.client.view.html"})}]),angular.module("articles").controller("ArticlesController",["$scope","$routeParams","$location","Authentication","Articles",function($scope,$routeParams,$location,Authentication,Articles){$scope.authentication=Authentication,$scope.create=function(){var article=new Articles({title:this.title,content:this.content});article.$save(function(response){$location.path("articles/"+response._id),$scope.title="",$scope.content=""},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.remove=function(article){if(article){article.$remove();for(var i in $scope.articles)$scope.articles[i]===article&&$scope.articles.splice(i,1)}else $scope.article.$remove(function(){$location.path("articles")})},$scope.update=function(){var article=$scope.article;article.$update(function(){$location.path("articles/"+article._id)},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.find=function(){$scope.articles=Articles.query()},$scope.findOne=function(){$scope.article=Articles.get({articleId:$routeParams.articleId})}}]),angular.module("articles").factory("Articles",["$resource",function($resource){return $resource("articles/:articleId",{articleId:"@_id"},{update:{method:"PUT"}})}]),angular.module("core").run(["Localize","VK",function(Localize,VK){Localize.initLocalizedResources(),VK.init()}]),angular.module("core").config(["$routeProvider",function($routeProvider){$routeProvider.otherwise("/"),$routeProvider.when("/",{templateUrl:"modules/core/views/home.client.view.html"})}]),angular.module("core").controller("HeaderController",["$scope","Authentication",function($scope,Authentication){$scope.authentication=Authentication,$scope.$on("$stateChangeSuccess",function(){$scope.isCollapsed=!1})}]),angular.module("core").controller("HomeController",["$scope","Authentication",function($scope,Authentication){$scope.authentication=Authentication}]),angular.module("core").directive("carouselExampleItem",["$rootScope","$swipe",function($rootScope,$swipe){return function(scope,element){var startX=null,startY=null,endAction="cancel",carouselId=element.parent().parent().attr("id"),translateAndRotate=function(x,y,z,deg){element[0].style["-webkit-transform"]="translate3d("+x+"px,"+y+"px,"+z+"px) rotate("+deg+"deg)",element[0].style["-moz-transform"]="translate3d("+x+"px,"+y+"px,"+z+"px) rotate("+deg+"deg)",element[0].style["-ms-transform"]="translate3d("+x+"px,"+y+"px,"+z+"px) rotate("+deg+"deg)",element[0].style["-o-transform"]="translate3d("+x+"px,"+y+"px,"+z+"px) rotate("+deg+"deg)",element[0].style.transform="translate3d("+x+"px,"+y+"px,"+z+"px) rotate("+deg+"deg)"};$swipe.bind(element,{start:function(coords){endAction=null,startX=coords.x,startY=coords.y},cancel:function(e){endAction=null,translateAndRotate(0,0,0,0),e.stopPropagation()},end:function(coords,e){"prev"===endAction?$rootScope.carouselPrev(carouselId):"next"===endAction&&$rootScope.carouselNext(carouselId),translateAndRotate(0,0,0,0),e.stopPropagation()},move:function(coords){if(null!==startX){var deltaX=coords.x-startX,deltaXRatio=deltaX/element[0].clientWidth;endAction=deltaXRatio>.3?"next":-.3>deltaXRatio?"prev":null,translateAndRotate(200*deltaXRatio,0,0,15*deltaXRatio)}}})}}]),angular.module("core").controller("LangController",["$scope","Localize","LocalStorage",function($scope,Localize,LocalStorage){$scope.lang="ru"===LocalStorage.getLocale()?"ru":"en",$scope.setLang=function(){switch($scope.lang){case"ru":Localize.setLanguage("RU-RU");break;default:Localize.setLanguage("EN-US")}}}]),angular.module("core").controller("MainController",["$rootScope","$scope","VK","Authentication",function($rootScope,$scope,VK,Authentication){$rootScope.$on("$routeChangeStart",function(){$rootScope.loading=!0}),$rootScope.$on("$routeChangeSuccess",function(){$rootScope.loading=!1}),$scope.authentication=Authentication,VK.onLiked(function(){VK.signIn()})}]),angular.module("core").directive("i18n",["Localize",function(Localize){var i18nDirective={restrict:"EA",updateText:function(ele,input,placeholder){var result;return result=void 0,"i18n-placeholder"===input?(result=Localize.getLocalizedString(placeholder),ele.attr("placeholder",result)):input.length>=1?(result=Localize.getLocalizedString(input),ele.text(result)):void 0},link:function(scope,ele,attrs){return scope.$on("localizeResourcesUpdated",function(){return i18nDirective.updateText(ele,attrs.i18n,attrs.placeholder)}),attrs.$observe("i18n",function(value){return i18nDirective.updateText(ele,value,attrs.placeholder)})}};return i18nDirective}]),angular.module("core").factory("LocalStorage",["$window",function($window){function _getItem(key,defaultValue){var localStorageValue=JSON.parse($window.localStorage.getItem(key));return void 0===defaultValue&&(defaultValue=null),null!==localStorageValue?localStorageValue:defaultValue}function _setItem(key,value){$window.localStorage.setItem(key,JSON.stringify(value))}function getLocale(){var lang=($window.navigator.userLanguage||$window.navigator.language||"EN_US").toLowerCase().split("-")[0];return lang&&"ru"!==lang&&(lang="en"),_getItem(LOCALE_KEY,lang)}function setLocale(lang){_setItem(LOCALE_KEY,lang)}var LOCALE_KEY="locale";return{getLocale:getLocale,setLocale:setLocale}}]),angular.module("core").factory("Localize",["$http","$rootScope","$window","LocalStorage",function($http,$rootScope,$window,LocalStorage){var localize={language:"en",url:null,resourceFileLoaded:!1,successCallback:function(data){return localize.dictionary=data,localize.resourceFileLoaded=!0,$rootScope.$broadcast("localizeResourcesUpdated")},setLanguage:function(value){return LocalStorage.setLocale(value.toLowerCase().split("-")[0]),localize.initLocalizedResources()},setUrl:function(value){return localize.url=value,localize.initLocalizedResources()},buildUrl:function(){return"i18n/resources-locale_"+localize.language+".json"},initLocalizedResources:function(){var url;return localize.language=LocalStorage.getLocale(),url=localize.url||localize.buildUrl(),$http({method:"GET",url:url,cache:!0}).success(localize.successCallback).error(function(){return $rootScope.$broadcast("localizeResourcesUpdated")})},getLocalizedString:function(value){var result;return result=void 0,result=localize.dictionary&&value&&localize.dictionary[value]?localize.dictionary[value]:value}};return localize}]),angular.module("core").service("Menus",[function(){this.defaultRoles=["*"],this.menus={};var shouldRender=function(user){if(!user)return this.isPublic;if(~this.roles.indexOf("*"))return!0;for(var userRoleIndex in user.roles)for(var roleIndex in this.roles)if(this.roles[roleIndex]===user.roles[userRoleIndex])return!0;return!1};this.validateMenuExistance=function(menuId){if(menuId&&menuId.length){if(this.menus[menuId])return!0;throw new Error("Menu does not exists")}throw new Error("MenuId was not provided")},this.getMenu=function(menuId){return this.validateMenuExistance(menuId),this.menus[menuId]},this.addMenu=function(menuId,isPublic,roles){return this.menus[menuId]={isPublic:isPublic||!1,roles:roles||this.defaultRoles,items:[],shouldRender:shouldRender},this.menus[menuId]},this.removeMenu=function(menuId){this.validateMenuExistance(menuId),delete this.menus[menuId]},this.addMenuItem=function(menuId,menuItemTitle,menuItemURL,menuItemType,menuItemUIRoute,isPublic,roles,position){return this.validateMenuExistance(menuId),this.menus[menuId].items.push({title:menuItemTitle,link:menuItemURL,menuItemType:menuItemType||"item",menuItemClass:menuItemType,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].roles:roles,position:position||0,items:[],shouldRender:shouldRender}),this.menus[menuId]},this.addSubMenuItem=function(menuId,rootMenuItemURL,menuItemTitle,menuItemURL,menuItemUIRoute,isPublic,roles,position){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===rootMenuItemURL&&this.menus[menuId].items[itemIndex].items.push({title:menuItemTitle,link:menuItemURL,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].items[itemIndex].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].items[itemIndex].roles:roles,position:position||0,shouldRender:shouldRender});return this.menus[menuId]},this.removeMenuItem=function(menuId,menuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===menuItemURL&&this.menus[menuId].items.splice(itemIndex,1);return this.menus[menuId]},this.removeSubMenuItem=function(menuId,submenuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)for(var subitemIndex in this.menus[menuId].items[itemIndex].items)this.menus[menuId].items[itemIndex].items[subitemIndex].link===submenuItemURL&&this.menus[menuId].items[itemIndex].items.splice(subitemIndex,1);return this.menus[menuId]},this.addMenu("topbar")}]),angular.module("core").factory("VK",["$window","$location","$http","Authentication",function($window,$location,$http,Authentication){var VK={};return VK.init=function(){if($window.VK&&$window.VK.Widgets){var loc=$location.host()+"/"+Authentication.date;console.dir(loc),$window.VK.init({apiId:3520312,onlyWidgets:!0}),Authentication.user||Authentication.user.vk||$window.VK.Widgets.Like("vk_signin",{type:"vertical",verb:1,height:24,pageUrl:loc}),$window.VK.Widgets.Post("vk_post",-50609732,124,"hWNjwJubCJ69XFWPH_s0GcVXSnI")}},VK.subscribe=function(event,callback){$window.VK&&$window.VK.Observer&&$window.VK.Observer.subscribe&&$window.VK.Observer.subscribe(event,callback)},VK.onLiked=function(callback){VK.subscribe("widgets.like.liked",callback)},VK.onUnLiked=function(callback){VK.subscribe("widgets.like.unliked",callback)},VK.signIn=function(){$http.post("/auth/vk").then(function(response){console.dir(response),response.data.success&&response.data.user?Authentication.setUser(response.data.user):console.log("error")})},VK}]),angular.module("users").config(["$httpProvider",function($httpProvider){$httpProvider.interceptors.push(["$q","$location","Authentication",function($q,$location,Authentication){return{responseError:function(rejection){switch(rejection.status){case 401:Authentication.user=null,$location.path("signin");break;case 403:}return $q.reject(rejection)}}}])}]),angular.module("users").config(["$routeProvider",function($routeProvider){$routeProvider.when("/settings/profile",{templateUrl:"modules/users/views/settings/edit-profile.client.view.html"}).when("/settings/password",{templateUrl:"modules/users/views/settings/change-password.client.view.html"}).when("/settings/accounts",{templateUrl:"modules/users/views/settings/social-accounts.client.view.html"}).when("/signup",{templateUrl:"modules/users/views/authentication/signup.client.view.html"}).when("/signin",{templateUrl:"modules/users/views/authentication/signin.client.view.html"}).when("/password/forgot",{templateUrl:"modules/users/views/password/forgot-password.client.view.html"}).when("/password/reset/invalid",{templateUrl:"modules/users/views/password/reset-password-invalid.client.view.html"}).when("/password/reset/success",{templateUrl:"modules/users/views/password/reset-password-success.client.view.html"}).when("/password/reset/:token",{templateUrl:"modules/users/views/password/reset-password.client.view.html"})}]),angular.module("users").controller("AuthenticationController",["$scope","$http","$location","Authentication",function($scope,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.signup=function(){$http.post("/auth/signup",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})},$scope.signin=function(){$http.post("/auth/signin",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("PasswordController",["$scope","$stateParams","$http","$location","Authentication",function($scope,$stateParams,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.askForPasswordReset=function(){$scope.success=$scope.error=null,$http.post("/auth/forgot",$scope.credentials).success(function(response){$scope.credentials=null,$scope.success=response.message}).error(function(response){$scope.credentials=null,$scope.error=response.message})},$scope.resetUserPassword=function(){$scope.success=$scope.error=null,$http.post("/auth/reset/"+$stateParams.token,$scope.passwordDetails).success(function(response){$scope.passwordDetails=null,Authentication.user=response,$location.path("/password/reset/success")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("SettingsController",["$scope","$http","$location","Users","Authentication",function($scope,$http,$location,Users,Authentication){$scope.user=Authentication.user,$scope.user||$location.path("/"),$scope.hasConnectedAdditionalSocialAccounts=function(){for(var i in $scope.user.additionalProvidersData)return!0;return!1},$scope.isConnectedSocialAccount=function(provider){return $scope.user.provider===provider||$scope.user.additionalProvidersData&&$scope.user.additionalProvidersData[provider]},$scope.removeUserSocialAccount=function(provider){$scope.success=$scope.error=null,$http.delete("/users/accounts",{params:{provider:provider}}).success(function(response){$scope.success=!0,$scope.user=Authentication.user=response}).error(function(response){$scope.error=response.message})},$scope.updateUserProfile=function(isValid){if(isValid){$scope.success=$scope.error=null;var user=new Users($scope.user);user.$update(function(response){$scope.success=!0,Authentication.user=response},function(response){$scope.error=response.data.message})}else $scope.submitted=!0},$scope.changeUserPassword=function(){$scope.success=$scope.error=null,$http.post("/users/password",$scope.passwordDetails).success(function(){$scope.success=!0,$scope.passwordDetails=null}).error(function(response){$scope.error=response.message})}}]),angular.module("users").factory("Authentication",["$window",function($window){var Authentication={user:$window.user,date:$window.date||(new Date).getTime(),setUser:function(user){$window.user=user,Authentication.user=user}};return Authentication}]),angular.module("users").factory("Users",["$resource",function($resource){return $resource("users",{},{update:{method:"PUT"}})}]);