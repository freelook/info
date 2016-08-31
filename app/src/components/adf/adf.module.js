'use strict';

angular.module('adf', ['adf.provider', 'adf.locale'])
  .value('adfTemplatePath', 'components/adf/templates/')
  .value('rowTemplate', '<adf-dashboard-row row="row" adf-model="adfModel" options="options" edit-mode="editMode" ng-repeat="row in column.rows" />')
  .value('columnTemplate', '<adf-dashboard-column column="column" adf-model="adfModel" options="options" edit-mode="editMode" ng-repeat="column in row.columns" />')
  .config(function (dashboardProvider) {
    dashboardProvider
      .structure('6-6', {
        rows: [{
          columns: [{
            styleClass: 'col-md-6'
          }, {
            styleClass: 'col-md-6'
          }]
        }]
      });
  });
