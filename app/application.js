'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(app.name, app.vendors);

// Setting HTML5 Location Mode
angular.module(app.name).config(
    function ($locationProvider, $translateProvider) {

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

    });

//Then define the init function for starting up the application
angular.element(document).ready(function () {

    //Then init the app
    angular.bootstrap(document, [app.name]);
});