'use strict';
angular.module('fli.look')
    .directive('fliLookContentFacebook', function () {
        return {
            controller: 'look.content.facebook.ctrl',
            templateUrl: 'components/look/content/facebook/facebook.html'
        };

    });