'use strict';
angular
  .module('fli.search')
  .factory('chips', function () {
    return {
      types: [
        {type: 'web'},
        {type: 'news'},
        {type: 'events'},
        {type: 'people'},
        {type: 'feeds'},
        {type: 'actions'},
        {type: 'images'},
        {type: 'audio'},
        {type: 'video'},
        {type: 'goods'},
        {type: 'job'},
        {type: 'promo'}
      ],
      subs: {
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
        feeds: [],
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
        goods: [],
        job: [
          {sub: 'indeed'},
          {sub: 'linkedin'}
        ],
        promo: []
      }
    };

  });

