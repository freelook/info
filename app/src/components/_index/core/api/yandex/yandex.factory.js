'use strict';
angular
  .module('freelook.info')
  .factory('yandex', function ($q, $http, api, toast) {

    function _getUrl(q) {
      return 'https://yandex.com/sitesearch?text=' + q + '&searchid=2192226&frame=1';
    }

    function _convertHtMLtoJS(html) {
      var js = {results: []};
      $.each($($.parseHTML(html)).find('.b-serp-item'), function (i, e) {
        var element = $(e),
          _content = element.find('.b-serp-item__text').html();
        js.results.push({
          title: element.find('.b-serp-item__title a span').html(),
          content: _content,
          contentNoFormatting: _content,
          url: element.find('.b-serp-item__title a').attr('href')
        });
      });

      return js;
    }

    function search(q) {
      if (q) {

        var defer = $q.defer();

        api.get(_getUrl(q))
          .success(function (data) {
            if (data && data.html) {
              return defer.resolve(_convertHtMLtoJS(data.html));
            }
            return defer.reject(data);
          })
          .error(function (data) {
            toast.show('something went wrong');
            return defer.reject(data);
          });

        return defer.promise;

      }
    }

    function rich(url) {
      if (url) {
        var yapi = 'http://rca.yandex.com/?key=rca.1.1.20150601T091020Z.b4512946bda59899.d67a268370439555bf6f8e3c5bb42c5077130bb0&url=' + url + '&callback=JSON_CALLBACK';
        return $http.jsonp(yapi);
      }
    }

    return {
      search: search,
      rich: rich
    };

  });

