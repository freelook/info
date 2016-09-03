'use strict';

angular
  .module('adf')
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('linklist', {
        title: 'Links',
        description: 'Displays a list of links',
        view: {
          name: "test",
          style: "body { background:#ccc;}",
          template: "<h3>{{total}}</h3><button ng-click=\"update()\">Update</button>",
          factory: function () {
            return {log: console.log};
          },
          controller: function ($scope, factory) {
            $scope.total = 0;
            $scope.update = function () {
              $scope.total += 1;
              factory.log($scope.total);
            };
          }
        },
        edit: {
          templateUrl: 'components/adf/widgets/linklist/edit.html',
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
