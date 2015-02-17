'use strict';
angular.module('fli.look')
  .directive('fliLookFull', function ($rootScope, prerender) {
    return function (scope, element) {

      function setInnerHTML(el, html) {
        if (el && html) {
          var cDoc = el.contentDocument;
          if (cDoc && cDoc.documentElement) {
            cDoc.documentElement.innerHTML = html;
          }
        }
      }

      if ($rootScope.fli.route.url) {
        prerender.get($rootScope.fli.route.url).then(function (html) {
          setInnerHTML($(element).get(0), html);
        });
      }

    };

  });
