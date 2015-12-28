'use strict';
angular
  .module('freelook.info')
  .factory('adsense', function ($timeout) {
    return {
      init: function () {
        $timeout(function () {
          var js, id = 'adsense', d = document, s = 'script',
            ajs = d.getElementsByTagName(s)[0];
          if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            ajs.parentNode.insertBefore(js, ajs);
          }
        }, 0);
      }
    };
  })
  .directive('fliAdsense', function (adsense) {
    adsense.init();
    return {
      templateUrl: 'components/core/api/google/adsense/adsense.html',
      controller: function () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    };
  });
