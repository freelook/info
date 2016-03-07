'use strict';
angular
  .module('fli.search')
  .factory('chips', function () {
    return {
      types: [
        {type: 'web'},
        {type: 'news'},
        {type: 'feeds'},
        {type: 'people'},
        {type: 'actions'},
        {type: 'images'},
        {type: 'audio'},
        {type: 'video'},
        {type: 'promo'},
        {type: 'goods'},
        {type: 'job'}
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
        feeds: [],
        people: [
          {sub: 'google'},
          {sub: 'facebook'},
          {sub: 'vk'},
          {sub: 'twitter'},
          {sub: 'linkedin'}
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
        promo: [],
        goods: [],
        job: [
          {sub: 'indeed'},
          {sub: 'linkedin'}
        ]
      }
    };

  });

