'use strict';

/* global angular */
angular.module('adf')
  .directive('adfStructurePreview', function (adfTemplatePath) {

    function adjustRowHeight(container) {
      if (container.rows && container.rows.length > 0) {
        var height = 100 / container.rows.length;
        angular.forEach(container.rows, function (row) {
          row.style = {
            height: height + '%'
          };

          if (row.columns) {
            angular.forEach(row.columns, function (column) {
              adjustRowHeight(column);
            });
          }
        });
      }
    }

    function prepareStructure($scope) {
      var structure = angular.copy($scope.structure);
      adjustRowHeight(structure);
      $scope.preview = structure;
    }

    return {
      restrict: 'E',
      replace: true,
      scope: {
        name: '=',
        structure: '=',
        selected: '='
      },
      templateUrl: adfTemplatePath + 'dashboard/structure-preview.html',
      link: prepareStructure
    };
  });
