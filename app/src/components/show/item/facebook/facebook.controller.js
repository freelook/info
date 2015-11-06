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
    vm.id = storyId && storyFbId ? storyId + '_' + storyFbId : id ? id : '';

    if (vm.id) {
      facebook
        .post(vm.id)
        .then(function (_post) {
          $scope.showItem.post = _post.data;
        });
    }


  });
