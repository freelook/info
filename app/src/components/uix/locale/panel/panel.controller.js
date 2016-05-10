'use strict';

angular
  .module('freelook.info')
  .controller('locale.panel.ctrl',
  function (locale, url, index) {

    var vm = this, _chartLocales = chartLocales();
    vm.locales = locale.locales;

    function chartLocales() {
      var _locales = [['Locale']];

      angular.forEach(locale.locales, function (locale) {
        _locales.push([locale.code.toUpperCase()]);
      });

      return _locales;
    }

    vm.href = function (localeCode) {
      return url.href('', {l: localeCode}, true);
    };

    vm.select = function (selectedItem) {
      index.go({l: (_chartLocales[selectedItem.row + 1][0] || '').toLowerCase()});
    };

    vm.chart = {
      type: 'GeoChart',
      data: _chartLocales,
      options: {
        width: $(window).width() - 100,
        keepAspectRatio: true,
        defaultColor: '#3F51B5',
        backgroundColor: '#ebebeb',
        datalessRegionColor: '#ffffff'
      }
    };

  });

