'use strict';
angular
  .module('fli.core')
  .factory('sendPlatform', function ($window, $q, $parse, CONFIG) {

    function chrome(req) {
      if ($parse('chrome.runtime.sendMessage')($window)) {
        return $q(function (resolve, reject) {
          $window.chrome.runtime.sendMessage(CONFIG.CHROME.ID, req, function (res) {
            if (res) {
              return resolve(res);
            }
            return reject(res);
          });
        });
      }
      return $q.reject();
    }

    function site(req) {
      if ($window && $window.opener) {
        return $q.when($window.opener.postMessage(req, '*'));
      }
      return $q.reject();
    }

    return {
      chrome: chrome,
      site: site,
      mobile: site
    };

  });

