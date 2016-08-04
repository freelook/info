'use strict';
angular
  .module('fli.core')
  .factory('amp', function ($window, $timeout, $q) {

    function init() {
      var defer = $q.defer();
      $timeout(function () {
        var js, id = 'amp-js', d = document, s = 'script',
          fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
          js = d.createElement(s);
          js.id = id;
          js.async = true;
          js.src = 'https://cdn.ampproject.org/v0.js';
          js.setAttribute('data', 'application/ld+json');
          js.onload = function () {
            defer.resolve();
          };
          js.onerror = function () {
            defer.reject();
          };
          // init page
          document.documentElement.setAttribute('amp', '');
          $('<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>').appendTo(document.head);
          $('<noscript></noscript>').html('<style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>').appendTo(document.head);
          fjs.parentNode.insertBefore(js, fjs);
        }
      }, 0);
      return defer.promise;
    }

    return {
      QUERY_STRING: '&amp=1',
      init: init
    };

  });
