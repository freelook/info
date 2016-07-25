'use strict';

angular
  .module('fli.search')
  .factory('feeds',
    function (FEEDS, FEEDS_TYPES, FEEDS_ICONS) {

      function query(route, page) {
        return FEEDS.get({
          input: route.input,
          l: route.l,
          page: page
        });
      }

      function add(_feed) {
        return FEEDS.post(_feed);
      }

      return {
        types: FEEDS_TYPES,
        icons: FEEDS_ICONS,

        query: query,
        add: add
      };

    })
  .constant('FEEDS_TYPES', [
    {
      name: 'looks',
      route: null
    },
    {
      name: 'stars',
      route: 'stars'
    },
    {
      name: 'subscription',
      route: 'subscription'
    }
  ])
  .constant('FEEDS_ICONS', {
    looks: 'clock-o',
    stars: 'star-o',
    subscription: 'rss'
  });
