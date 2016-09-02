'use strict';

angular
  .module('adf')
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('linklist', {
        title: 'Links',
        description: 'Displays a list of links',
        view: {
          templateUrl: 'components/adf/filters/linklist/view.html'
        },
        edit: {
          templateUrl: 'components/adf/filters/linklist/edit.html',
          controller: function ($scope) {

            function getLinks() {
              if (!$scope.config.links) {
                $scope.config.links = [];
              }
              return $scope.config.links;
            }

            $scope.addLink = function () {
              getLinks().push({});
            };

            $scope.removeLink = function (index) {
              getLinks().splice(index, 1);
            };
          }
        }
      });
  });
