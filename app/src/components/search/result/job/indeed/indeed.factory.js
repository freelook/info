'use strict';
angular
  .module('fli.search')
  .factory('indeed',
  function ($q, api, parser, INDEED) {

    function _xmlToJs(_xml) {
      var js = [],
        dom = parser.parseFromString(_xml, 'text/xml'),
        $dom = $(dom);

      $dom.find('result').each(function (i, e) {
        var element = $(e);
        js.push({
          title: element.find('jobtitle').text(),
          content: element.find('snippet').text(),
          company: element.find('company').text(),
          url: element.find('url').text()
        });
      });

      return js;
    }


    function search(q) {
      var defer = $q.defer();
      api
        .proxy(INDEED.URL + q)
        .success(function (_xml) {
          defer.resolve(_xmlToJs(_xml));
        })
        .error(function (err) {
          defer.reject(err);
        });
      return defer.promise;
    }

    return {
      search: search
    };

  })
  .constant('INDEED', {
    URL: 'http://api.indeed.com/ads/apisearch?v=2&publisher=4882352810407505&q='
  });
