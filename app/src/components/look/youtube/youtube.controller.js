'use strict';

angular
  .module('fli.look')
  .controller('look.youtube.ctrl',
  function ($window, $scope, $rootScope, $sce,youtube) {

    $scope.code = '';

    function code(name, search) {
      var match = (new RegExp('[?&]' + name + '=([^&]*)')).exec(search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function init(url) {
      var type = $window.document.createElement('a');
      type.href = decodeURIComponent(url);

      if (/youtube/i.test(type.href)) {
        $scope.code = code('v', type.search);
      }
        youtube.search('test').success(function(data){
            $scope.results = data.items;
        });


    }



    $scope.youtube = function () {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + $scope.code);
    };

    init($rootScope.fli.route.url);

  });


