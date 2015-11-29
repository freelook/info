'use strict';
angular
  .module('fli.feedback')
  .directive('fliFeedbackComments', function () {
    return {
      controller: 'feedback.comments.ctrl',
      controllerAs: 'comments',
      templateUrl: 'components/feedback/comments/comments.html'
    };
  });
