'use strict';
angular
  .module('fli.search')
  .factory('trends', function ($q, google) {

    function _feedToTrends(html) {
      var trends = [];
      $.each($($.parseHTML(html)).find('a'), function (i, e) {
        var trend = $(e).text() || '';
        if (trend) {
          trends.push(trend);
        }
      });
      return trends;
    }

    return function () {
      var defer = $q.defer();
      google.trends()
        .success(function (trends) {
          if (trends && trends.responseData && trends.responseData.feed) {
            var entries = trends.responseData.feed.entries || [],
              entry = entries[0] || {},
              content = entry.content || '';
            return defer.resolve(_feedToTrends(content));
          }
          return defer.reject(trends);
        })
        .error(function (trends) {
          return defer.reject(trends);
        });
      return defer.promise;
    };

  });

