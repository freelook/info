'use strict';

angular
  .module('adf')
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('linklist', {
        title: 'Links',
        description: 'Displays a list of links',
        templateUrl: 'components/adf/widgets/linklist/view.html',
        edit: {
          templateUrl: 'components/adf/widgets/linklist/edit.html',
          controller: 'linklistEditCtrl'
        }
      });
  }).controller('linklistEditCtrl', function ($scope) {

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
  });
