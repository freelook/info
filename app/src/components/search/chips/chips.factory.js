'use strict';
angular
  .module('fli.search')
  .factory('chips', function () {
    return {
      types: [
        {type: 'feeds'},
        {type: 'web'},
        {type: 'news'},
        {type: 'events'},
        {type: 'people'},
        {type: 'actions'},
        {type: 'images'},
        {type: 'audio'},
        {type: 'video'},
        {type: 'places'},
        {type: 'goods'},
        {type: 'job'}
      ],
      subs: {
        feeds: [],
        web: [
          {sub: 'google'},
          {sub: 'facebook'},
          {sub: 'vk'},
          {sub: 'pinterest'},
          {sub: 'linkedin'}
        ],
        news: [],
        events: [],
        people: [
          {sub: 'google'},
          {sub: 'facebook'},
          {sub: 'vk'},
          {sub: 'twitter'},
          {sub: 'linkedin'},
          {sub: 'instagram'}
        ],
        actions: [
          {sub: 'twitter'},
          {sub: 'vk'}
        ],
        images: [
          {sub: 'google'},
          {sub: 'instagram'},
          {sub: 'twitter'}
        ],
        audio: [],
        video: [
          {sub: 'youtube'},
          {sub: 'vk'}
        ],
        places: [
          {sub: 'google'},
          {sub: 'foursquare'}
        ],
        goods: [],
        job: [
          {sub: 'indeed'},
          {sub: 'linkedin'}
        ]
      }
    };

  });

