'use strict';
angular
  .module('freelook.info')
  .factory('linkedin', function ($http, $q, api, parser, LINKEDIN_API) {

    function _enpoint(_end) {
      return LINKEDIN_API.ENDPOINT + _end;
    }

    function _htmlToPosts(_html) {
      var posts = [],
        dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom);

      $dom.find('div.posts ul > li').each(function (i, e) {
        var element = $(e), link = element.find('footer > h2 > a, .article-title > a');
        posts.push({
          title: link.text(),
          url: link.attr('href'),
          img: element.find('header img').attr('data-delayed-url') || element.find('.article-container img').attr('data-delayed-url'),
          content: element.find('footer > .post-body').text() || element.find('.article-snippet').text()
        });
      });

      return posts;
    }

    function search(q) {
      return api.proxy(_enpoint('topic/' + encodeURIComponent(decodeURIComponent(q))));
    }

    function posts(q) {
      var defer = $q.defer();
      search(q)
        .success(function (_html) {
          defer.resolve(_htmlToPosts(_html));
        })
        .error(function (err) {
          defer.reject(err);
        });
      return defer.promise;
    }

    function link(_path) {
      return LINKEDIN_API.URL + _path;
    }

    return {
      search: search,
      posts: posts,
      link: link
    };

  })
  .
  constant('LINKEDIN_API', {
    ENDPOINT: 'https://www.linkedin.com/'
  });

