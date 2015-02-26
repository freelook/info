'use strict';
angular.module('fli.look')
  .directive('fliLookFull', function ($rootScope, $sce, prerender) {
    return {
      templateUrl: 'components/look/full/full.html',
      link: function (scope, element) {

        function _prepareHtml(html) {
          var dom = (new window.DOMParser()).parseFromString(html, 'text/html');
          $(dom).find('link').each(function (i, e) {
            $(e).attr('href', function (i, value) {
              if (value) {
                switch (value.substr(0, 2)) {
                  case 'ht':
                  case '//':
                    return value;
                  case '/':
                    return $rootScope.fli.route.url + value;
                  default:
                    return $rootScope.fli.route.url + '/' + value;
                }
              }
            });
          });

          return dom.documentElement ? dom.documentElement.innerHTML : '';
        }

        if ($rootScope.fli.route.url) {
          prerender.get($rootScope.fli.route.url).then(function (html) {
            scope.html = $sce.trustAsHtml(_prepareHtml(html));
          });
        }

      }
    };

  });
