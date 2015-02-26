'use strict';
angular.module('fli.look')
  .directive('fliLookShort', function ($rootScope, $sce, $window, prerender) {
    return {
      templateUrl: 'components/look/short/short.html',
      link: function (scope) {

        var dom = '',
          body = '';
        scope.shortData = [];

        function fixLinks(html) {
          html.find('a').each(function (i, e) {
            $(e).attr('href', function (i, value) {
              if (value) {
                switch (value.substr(0, 1)) {
                  case 'h':
                    break;
                  case '/':
                    value = $rootScope.fli.route.url + value;
                    break;
                  case 'm':
                    return value;
                  default:
                    value = $rootScope.fli.route.url + '/' + value;
                }
              }
              return 'http://' + $window.location.host + '/look?url=' + value + '&input=' + $rootScope.fli.route.input + '&type=short';
            });
          });
        }

        function findHtml(dom, by) {
          var div = null;
          if (!body) {
            body = $('body', dom);
          }
          $('*:contains(' + by + ')', body)
            .each(function (i, e) {

              var element = $(e);

              if (!element.children().length) {
                if (!div) {
                  div = $('<div>');
                }
                div.append(element.parent());
              }

            });

          return div;
        }

        function shortHTML(html, by) {

          var short = [],
            _findHtml;
          dom = !dom ? (new window.DOMParser()).parseFromString(html, 'text/html') : dom;
          _findHtml = findHtml(dom, by);

          if (_findHtml) {
            _findHtml.each(function (i, e) {
              var _el = $(e);
              _el.find('script, iframe, img').remove();
              fixLinks(_el);
              var html = _el.html();
              if (html) {
                short.push({html: $sce.trustAsHtml(html)});
              }
            });
          }

          return !!short.length ? short : '';
        }

        function shortDataByContext(html, by) {
          var data = null;
          [by.context, by.input].some(function (e) {
            data = shortHTML(html, e);
            return !!data;
          });
          return data;
        }

        function shortDataByInput(html, by) {
          var data = null,
            input = by.input || '',
            inputs = input.split(' ');
          if (inputs.length > 2) {
            inputs.sort(function (a, b) {
              return b.length - a.length;
            });
            inputs.some(function (e) {
              data = shortHTML(html, e);
              return !!data;
            });
          }
          return data;
        }


        if ($rootScope.fli.route.url) {
          prerender.get($rootScope.fli.route.url).then(function (html) {
            try {
              var by = $rootScope.fli.route;
              $rootScope.fli.progress = true;
              scope.shortData = shortDataByContext(html, by) || shortDataByInput(html, by);
            }
            finally {
              $rootScope.fli.progress = false;
              dom = null;
            }

          });
        }

      }
    };

  });
