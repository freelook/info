'use strict';
angular
    .module('core')
    .factory('Localize',
        function ($http, $rootScope, $window, LocalStorage) {
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
                    return result = void 0, localize.dictionary && value ? ( result = '' === localize.dictionary[value] ? value : localize.dictionary[value]) : result = value, result;
                }};
            return localize;
        });
