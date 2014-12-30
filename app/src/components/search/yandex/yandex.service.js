'use strict';
angular
  .module('fli.search')
  .factory('Yandex', function ($http, $q) {

    function _getUrl(q) {
      return encodeURIComponent('https://yandex.com/sitesearch?text=' + q + '&searchid=2192226&frame=1');
    }

    function _convertHtMLtoJS(html) {
      var js = [];
      $.each($($.parseHTML(html)).find('.b-serp-item'), function (i, e) {
        js.push({
          title: $(e).find('.b-serp-item__title a span').html(),
          text: $(e).find('.b-serp-item__text').html(),
          url: $(e).find('.b-serp-item__title a').attr('href')
        });
      });

      return js;
    }

    function search(q) {
      if (q) {
        var defer = $q.defer(),
          yapi = 'http://freelook.herokuapp.com/api/get?url=' + _getUrl(q) + '&callback=JSON_CALLBACK';
        $http.jsonp(yapi)
          .success(function (html) {
            if (!html.Error) {
              var search = _convertHtMLtoJS(html);
              defer.resolve(search);
              console.info(search);
            } else {
              defer.reject(html);
            }
          })
          .error(function (html) {
            console.info('Sorry error');
            defer.reject(html);
          });

        return defer.promise;
      }
    }

    return {
      search: search
    };

  });

