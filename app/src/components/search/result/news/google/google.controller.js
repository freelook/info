'use strict';

angular
  .module('fli.search')
  .controller('search.result.news.google.ctrl',
  function ($scope, $parse, url, item, google) {

    var vm = this;
    vm.href = item.href;
    vm.share = item.share;
    vm.search = item.search;
    vm.items = [];

    function feedToJs(feed) {
      var $html = $($.parseHTML(feed)),
        img = $html.find('img'),
        title = $html.find('a b').first(),
        font = $html.find('[size=-1]'),
        form = $(font.get(0)),
        _url = $(img.parent()).attr('href') || $(title.parent()).attr('href');
      return {
        img: img.attr('src'),
        url: url.qByName('url', decodeURIComponent(_url)),
        title: title.html(),
        titleText: title.text(),
        from: form.html(),
        input: form.text(),
        text: $(font.get(1)).html()
      };
    }

    function extract(entries) {
      var items = [];
      entries.map(function (el) {
        items.push(feedToJs(el.content));
      });
      return items;
    }

    function setResult(res) {
      var entries = $parse('responseData.feed.entries')(res) || [];
      vm.items = extract(entries) || [];
    }

    google.news($scope.fli.route.input || '')
      .success(setResult);

  });

