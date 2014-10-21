'use strict';

(function () {
    // Articles Controller Spec
    describe('ArticlesController', function () {
        // Initialize global variables
        var ArticlesController,
            scope;


        beforeEach(module(ApplicationConfiguration.applicationModuleName));


        beforeEach(inject(function ($controller, $rootScope) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Initialize the Articles controller.
            ArticlesController = $controller('ArticlesController', {
                $scope: scope
            });

        }));

        it('should have scope', function () {
            expect(scope).toBeDefined();
        });
    });
}());