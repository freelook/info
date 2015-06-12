'use strict';
angular
  .module('fli.search')
  .directive('fliSubHideOnScroll',
  function ($window) {
    return function (scope, el) {

      var element = $(el),
        top = element.offset().top + element.height(),
        document = $($window.document);

      $(document)
        .scroll(function () {
          if (document.scrollTop() > top) {
            element.parent().hide();
          } else {
            element.parent().show();
          }
        });

    };
  });

