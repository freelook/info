'use strict';
angular
  .module('fli.search')
  .factory('chips', function () {
    return {
      types: [
        {type: 'web'},
        {type: 'people'},
        {type: 'news'},
        {type: 'actions'},
        {type: 'goods'},
        {type: 'images'},
        {type: 'audio'},
        {type: 'video'},
        {type: 'promo'},
        {type: 'job'}
      ],
      subs: {
        web: [
          {sub: 'google'},
          {sub: 'facebook'},
          {sub: 'vk'},
          {sub: 'pinterest'}
        ],
        people: [
          {sub: 'google'},
          {sub: 'facebook'},
          {sub: 'vk'},
          {sub: 'twitter'}
        ],
        news: [],
        actions: [
          {sub: 'twitter'},
          {sub: 'vk'}
        ],
        goods: [],
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
        job: []
      }
    };

  });

