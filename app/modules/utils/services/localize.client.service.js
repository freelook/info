'use strict';
angular
    .module('utils')
    .factory('localize', ['$http', '$rootScope', '$window',
        function ($http, $rootScope, $window) {
            var localize = {
                language: '',
                url: void 0,
                resourceFileLoaded: !1,
                successCallback: function (data) {
                    return localize.dictionary = data, localize.resourceFileLoaded = !0, $rootScope.$broadcast('localizeResourcesUpdated');
                },
                setLanguage: function (value) {
                    return localize.language = value.toLowerCase().split('-')[0], localize.initLocalizedResources();
                },
                setUrl: function (value) {
                    return localize.url = value, localize.initLocalizedResources();
                },
                buildUrl: function () {
                    return localize.language || (localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase(), localize.language = localize.language.split('-')[0]), 'i18n/resources-locale_' + localize.language + '.js';
                },
                initLocalizedResources: function () {
                    var url;
                    return url = localize.url || localize.buildUrl(), $http({method: 'GET', url: url, cache: !1}).success(localize.successCallback).error(function () {
                        return $rootScope.$broadcast('localizeResourcesUpdated');
                    });
                },
                getLocalizedString: function (value) {
                    var result, valueLowerCase;
                    return result = void 0, localize.dictionary && value ? (valueLowerCase = value.toLowerCase(), result = '' === localize.dictionary[valueLowerCase] ? value : localize.dictionary[valueLowerCase]) : result = value, result;
                }};
            return localize;
        }]);
