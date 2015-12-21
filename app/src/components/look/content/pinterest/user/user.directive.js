'use strict';
angular.module('fli.look')
    .directive('fliLookContentPinterestUser', function () {
        return {
            controller: 'look.content.pinterest.user.ctrl',
            controllerAs: 'pintUser',
            templateUrl: 'components/look/content/pinterest/user/user.html'
        };
    });
