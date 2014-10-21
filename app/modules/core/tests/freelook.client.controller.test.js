'use strict';

describe('FreeLookController', function () {
    //Initialize global variables
    var scope, rootScope;

    // Load the main application module
    beforeEach(module('app'));
    beforeEach(module('core'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        rootScope = $rootScope;

        $controller('FreeLookController', {
            $rootScope: rootScope,
            $scope: scope
        });

    }));

    it('should loaded', function () {
        expect(scope).toBeDefined();
    });
});