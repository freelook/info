'use strict';
angular
  .module('freelook.info')
  .factory('linkedin', function ($http, $q, api, parser, LINKEDIN_API) {

    function _enpoint(_end) {
      return LINKEDIN_API.ENDPOINT + _end;
    }

    function _point(point) {
      return api.proxy(_enpoint(point));
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

    function _htmlToPeople(_html) {
      var people = [],
        dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom);

      $dom.find('div.professionals > ul > li, #profile').each(function (i, e) {
        var element = $(e), link = element.find('.content > h3 > a');
        people.push({
          title: link.text() || $dom.find('#name').text(),
          url: link.attr('href') || $dom.find('link[rel="canonical"]').attr('href'),
          img: element.find('.profile-img > img').attr('src') || element.find('.profile-picture img').attr('data-delayed-url'),
          content: element.find('.content > .headline').text() || element.find('.headline.title').html()
        });
      });

      return people;
    }

    function _htmlToJobs(_html) {
      var jobs = [],
        dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom);

      $dom.find('ul.search-results > li').each(function (i, e) {
        var element = $(e), link = element.find('.job-title-link');
        jobs.push({
          title: link.text(),
          url: link.attr('href'),
          img: element.find('img.company-logo').attr('data-delayed-url'),
          content: element.find('.job-description').text(),
          company: element.find('.company-name-text').text()
        });
      });

      return jobs;
    }

    function posts(q) {
      var defer = $q.defer();
      _point('topic/' + encodeURIComponent(decodeURIComponent(q)))
        .success(function (_html) {
          defer.resolve(_htmlToPosts(_html));
        })
        .error(function (err) {
          defer.reject(err);
        });
      return defer.promise;
    }

    function people(q) {
      var defer = $q.defer(), query = q || '', full = query.split(' '),
        first = full[0] || '+', last = full[1] || '+';
      _point('pub/dir/' + first + '/' + last)
        .success(function (_html) {
          defer.resolve(_htmlToPeople(_html));
        })
        .error(function (err) {
          defer.reject(err);
        });
      return defer.promise;
    }

    function jobs(q) {
      var defer = $q.defer();
      _point('jobs/search?keywords=' + q)
        .success(function (_html) {
          defer.resolve(_htmlToJobs(_html));
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
      posts: posts,
      people: people,
      jobs: jobs,
      link: link
    };

  })
  .
  constant('LINKEDIN_API', {
    ENDPOINT: 'https://www.linkedin.com/'
  });

