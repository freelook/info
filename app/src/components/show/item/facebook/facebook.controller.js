'use strict';

angular
  .module('fli.show')
  .controller('show.item.facebook.ctrl',
  function ($scope, facebook, url) {

    var vm = this,
      storyFbId = url.qByName('story_fbid', $scope.site.search) || '',
      storyId = url.qByName('id', $scope.site.search) || '',
      id = url.extract('*/posts/:id', $scope.site.pathname).id || '';

    vm.fix = angular.identity;
    vm.action = 'like';
    vm.looks = 1;
    vm.id = storyFbId ? storyId + '_' + storyFbId : id;

    vm.show = function () {
      console.log('Show item: ' + $scope.fli.route.input, vm.post);
    };

    facebook
      .post(vm.id)
      .then(function (_post) {
        vm.post = _post.data;
      });

  });
