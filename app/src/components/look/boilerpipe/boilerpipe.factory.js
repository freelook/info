'use strict';
angular
  .module('fli.look')
  .factory('boilerpipe', function ($http, CONFIG) {

    function get(url) {
      var bapi = CONFIG.API.URL + 'boilerpipe/extract?url=' + url + '&extractor=ArticleExtractor&output=htmlFragment&extractImages=1';
      return $http.get(bapi);
    }

    return {
      get: get
    };

  });

