/**
 * Created by Dima Kostrub on 24.12.15.
 */

(function () {
    'use strict';

    var root = angular.element(document);

    root.injector().invoke(function timeApply($rootScope) {

        console.clear();
        console.profile('Performance:');

        var started = performance.now(),
            nbDigest = 0,
            watchers = [];

        var unwatch = $rootScope.$watch(function () {
            nbDigest++;
        });

        (function f(element) {
            angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
                if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                    angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                        if (watchers.indexOf(watcher) < 0) {
                            watchers.push(watcher);
                        }
                    });
                }
            });

            angular.forEach(element.children(), function (childElement) {
                f(angular.element(childElement));
            });

        })(root);

        $rootScope.$apply();

        var takes = performance.now() - started;
        console.log('- $apply takes', takes, 'ms');
        console.log('- $digest', nbDigest, 'time');
        if (watchers.length) {
            console.log('Watchers elements: ' + watchers.length);
        }
        if ($rootScope.$$watchersCount) {
            console.log('Root watchers: ' + $rootScope.$$watchersCount);
        }

        unwatch();
        console.profileEnd();
        return takes;

    });

}());
