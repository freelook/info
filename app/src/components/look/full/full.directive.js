'use strict';
angular.module('fli.look')
  .directive('fliLookFull', function ($rootScope, prerender) {
    return {
      link: function (scope, element) {

        function _setInnerHTML(el, html) {
          if (el && html) {
            var contentDocument = el.contentDocument;
            if (contentDocument && contentDocument.documentElement) {
              contentDocument.documentElement.innerHTML = html;
            }
          }
        }

        if ($rootScope.fli.route.url) {
          prerender.get($rootScope.fli.route.url).then(function (html) {
            _setInnerHTML($(element).get(0), html);
          });
        }

      }
    };

  });
