'use strict';
angular
  .module('fli.search')
  .factory('Yandex', function(prerender) {

    function _getUrl(q) {
      return 'https://yandex.com/sitesearch?text=' + q + '&searchid=2192226&frame=1';
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
        return prerender.get(_getUrl(q))
          .then(function (html) {
            return _convertHtMLtoJS(html);
          });
      }
    }

    return {
      search: search
    };

  });

