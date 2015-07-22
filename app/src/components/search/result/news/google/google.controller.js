'use strict';

angular
  .module('fli.search')
  .controller('search.result.news.google.ctrl',
  function ($scope, $parse, google) {

    var vm = this;
    vm.items = [];

    function feedToJs(feed) {
      var $html = $($.parseHTML(feed)),
        img = $html.find('img'),
        title = $html.find('a b').first(),
        font = $html.find('[size=-1]');
      return {
        img: img.attr('src'),
        url: $(img.parent()).attr('href') || $(title.parent()).attr('href'),
        title: title.html(),
        titleText: title.text(),
        from: $(font.get(0)).html(),
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

    if ($scope.fli.route.input) {
      google.news($scope.fli.route.input)
        .success(setResult);
    }

  });

