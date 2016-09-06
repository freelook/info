'use strict';

angular
  .module('fli.board')
  .config(function(boardProvider) {
    boardProvider
      .widget('linklist', {
        title: 'Links',
        description: 'Displays a list of links',
        view: {
          name: 'test',
          style: 'body{ background:#ccc;}',
          template: '<h3 ng-bind="ctrl.total"></h3><button ng-click="ctrl.update()">Update</button>',
          service: function() {
            return {log: console.log};
          },
          controller: function(service) {
            var ctrl = this;
            ctrl.total = 0;
            ctrl.update = function() {
              ctrl.total += 1;
              service.log(ctrl.total);
            };
          }
        },
        edit: {
          templateUrl: 'components/adf/widgets/linklist/edit.html',
          controller: function($scope) {

            function getLinks() {
              if (!$scope.config.links) {
                $scope.config.links = [];
              }
              return $scope.config.links;
            }

            $scope.addLink = function() {
              getLinks().push({});
            };

            $scope.removeLink = function(index) {
              getLinks().splice(index, 1);
            };
          }
        }
      });
  });
