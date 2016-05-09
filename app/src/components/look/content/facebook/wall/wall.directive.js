'use strict';
angular.module('fli.look')
    .directive('fliLookContentFacebookWall', function () {
        return {
            controller: 'look.content.facebook.wall.ctrl',
            controllerAs: 'fbWall',
            templateUrl: 'components/look/content/facebook/wall/wall.html'
        };
    });
