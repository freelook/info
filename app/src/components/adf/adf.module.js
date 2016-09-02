'use strict';

angular.module('adf', ['adf.provider', 'adf.locale'])
  .value('adfTemplatePath', 'components/adf/')
  .config(function (dashboardProvider) {
    dashboardProvider
      .structure('50-50', {
        columns: [{
          flex: '50'
        }, {
          flex: '50'
        }]
      });
  });
