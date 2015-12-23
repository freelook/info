'use strict';
angular
  .module('freelook.info')
  .factory('pinterest', function ($http, $q, api, parser, PINTEREST_API) {

    function _enpoint(_end) {
      return PINTEREST_API.ENDPOINT + _end;
    }

    function _point(_end) {
      return $http.get(_enpoint(_end));
    }

    function _htmlToJs(_html) {
      var js = [],
        dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom);

      $dom.find('.GridItems .item').each(function (i, e) {
        var element = $(e);
        js.push({
          title: element.find('.creditItem .creditTitle').text(),
          board: {
            url: element.find('.creditItem > a').attr('href'),
            img: element.find('.creditItem img').attr('data-src'),
            name: element.find('.creditItem .creditName').text()
          },
          img: element.find('img.pinImg').attr('src'),
          content: element.find('.pinMeta > .pinDescription').text(),
          url: element.find('.pinImageActionButtonWrapper > a').attr('href')
        });
      });

      return js;
    }

    function search(q) {
      var defer = $q.defer();
      api.proxy(PINTEREST_API.URL + '/search/pins/?q=' + q)
        .success(function (_html) {
          defer.resolve(_htmlToJs(_html));
        })
        .error(function (err) {
          defer.reject(err);
        });
      return defer.promise;
    }

    function pins(q) {
      return _point('pidgets/users/' + q + '/pins/');
    }

    function boards(q) {
      return _point('pidgets/boards' + q + 'pins/');
    }

    function link(_path) {
      return PINTEREST_API.URL + _path;
    }

    return {
      search: search,
      pins: pins,
      boards: boards,
      link: link
    };

  })
  .
  constant('PINTEREST_API', {
    ENDPOINT: 'https://api.pinterest.com/v3/',
    URL: 'https://www.pinterest.com'
  });

