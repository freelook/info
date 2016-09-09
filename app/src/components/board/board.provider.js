'use strict';

angular.module('fli.board')
  .provider('board', function() {

    var widgets = {};
    var messageTemplate = '<div class="alert alert-danger">{}</div>';
    var loadingTemplate = '\<div class="progress progress-striped active">\n\<div class="progress-bar" role="progressbar" style="width: 100%">\n\<span class="sr-only">loading ...</span>\n\</div>\n\</div>';


    this.widget = function(name, widget) {
      widgets[name] = widget;
      return this;
    };

    this.messageTemplate = function(template) {
      messageTemplate = template;
      return this;
    };

    this.loadingTemplate = function(template) {
      loadingTemplate = template;
      return this;
    };

    this.$get = function(BOARDS) {
      var cid = 0;
      return {
        widgets: widgets,
        messageTemplate: messageTemplate,
        loadingTemplate: loadingTemplate,
        id: function() {
          return new Date().getTime() + '-' + (++cid);
        },
        idEquals: function(id, other) {
          return ((id) && (other)) && (id.toString() === other.toString());
        },
        load: function(user) {
          return BOARDS.get(user);
        },
        save: function(board) {
          return BOARDS.post(board);
        }
      };
    };

  });
