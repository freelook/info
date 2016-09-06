'use strict';

angular.module('fli.board')
  .directive('fliWidget', function($injector, $q, $log, $mdDialog, $rootScope, board) {

    function preLink($scope) {
      var definition = $scope.definition;
      $scope.editWidget = false;
      $scope.toggleEditWidget = function() {
        $scope.editWidget = !$scope.editWidget;
      };

      if (definition) {
        var w = board.widgets[definition.type];
        if (w) {
          // pass title
          if (!definition.title) {
            definition.title = w.title;
          }

          if (!definition.titleTemplateUrl) {
            definition.titleTemplateUrl = 'components/board/widget/widget-title.html';
            if (w.titleTemplateUrl) {
              definition.titleTemplateUrl = w.titleTemplateUrl;
            }
          }

          if (!definition.editTemplateUrl) {
            definition.editTemplateUrl = 'components/board/widget/widget-edit.html';
            if (w.editTemplateUrl) {
              definition.editTemplateUrl = w.editTemplateUrl;
            }
          }

          if (!definition.titleTemplateUrl) {
            definition.frameless = w.frameless;
          }

          if (!definition.styleClass) {
            definition.styleClass = w.styleClass;
          }

          // set id for sortable
          if (!definition.wid) {
            definition.wid = board.id();
          }

          // pass copy of widget to scope
          $scope.widget = angular.copy(w);

          // create config object
          var config = definition.config;
          if (config) {
            if (angular.isString(config)) {
              config = angular.fromJson(config);
            }
          } else {
            config = {};
          }

          // pass config to scope
          $scope.config = config;

          // collapse exposed $scope.widgetState property
          if (!$scope.widgetState) {
            $scope.widgetState = {};
            $scope.widgetState.isCollapsed = (w.collapsed === true) ? w.collapsed : false;
          }

        } else {
          $log.warn('could not find widget ' + definition.type);
        }
      } else {
        $log.debug('definition not specified, widget was probably removed');
      }
    }

    function postLink($scope, $element) {
      var definition = $scope.definition;
      if (definition) {
        // bind close function

        var deleteWidget = function() {
          var column = $scope.col;
          if (column) {
            var index = column.widgets.indexOf(definition);
            if (index >= 0) {
              column.widgets.splice(index, 1);
            }
          }
          $element.remove();
          $rootScope.$broadcast('adfWidgetRemovedFromColumn');
        };

        $scope.remove = function() {
          if ($scope.options.enableConfirmDelete) {
            var deleteScope = $scope.$new();

            var deleteTemplateUrl = 'components/board/widget/widget-delete.html';
            if (definition.deleteTemplateUrl) {
              deleteTemplateUrl = definition.deleteTemplateUrl;
            }
            var opts = {
              scope: deleteScope,
              templateUrl: deleteTemplateUrl,
              backdrop: 'static'
            };
            var instance = $mdDialog.open(opts);

            deleteScope.closeDialog = function() {
              instance.close();
              deleteScope.$destroy();
            };
            deleteScope.deleteDialog = function() {
              deleteWidget();
              deleteScope.closeDialog();
            };
          } else {
            deleteWidget();
          }
        };

        // bind reload function
        $scope.reload = function() {
          $scope.$broadcast('widgetReload');
        };

        // bind edit function
        $scope.edit = function() {
          var editScope = $scope.$new();
          editScope.definition = angular.copy(definition);

          var adfEditTemplatePath = 'components/board/widget/widget-edit.html';
          if (definition.editTemplateUrl) {
            adfEditTemplatePath = definition.editTemplateUrl;
          }

          var opts = {
            scope: editScope,
            templateUrl: adfEditTemplatePath
          };

          $mdDialog.show(opts);

          editScope.closeDialog = function() {
            $mdDialog.cancel();
            editScope.$destroy();
          };

          // TODO create util method
          function createApplyPromise(result) {
            var promise;
            if (typeof result === 'boolean') {
              var deferred = $q.defer();
              if (result) {
                deferred.resolve();
              } else {
                deferred.reject();
              }
              promise = deferred.promise;
            } else {
              promise = $q.when(result);
            }
            return promise;
          }

          editScope.saveDialog = function() {
            // clear validation error
            editScope.validationError = null;

            // build injection locals
            var widget = $scope.widget;

            // create a default apply method for widgets
            // without edit mode
            // see issue https://goo.gl/KHPQLZ
            var applyFn;
            if (widget.edit) {
              applyFn = widget.edit.apply;
            } else {
              applyFn = function() {
                return true;
              };
            }

            // injection locals
            var locals = {
              widget: widget,
              definition: editScope.definition,
              config: editScope.definition.config
            };

            // invoke apply function and apply if success
            var result = $injector.invoke(applyFn, applyFn, locals);
            createApplyPromise(result).then(function() {
              definition.title = editScope.definition.title;
              angular.extend(definition.config, editScope.definition.config);
              if (widget.edit && widget.edit.reload) {
                // reload content after edit dialog is closed
                $scope.$broadcast('widgetConfigChanged');
              }
              editScope.closeDialog();
            }, function(err) {
              if (err) {
                editScope.validationError = err;
              } else {
                editScope.validationError = 'Validation durring apply failed';
              }
            });
          };

        };
      } else {
        $log.debug('widget not found');
      }
    }

    return {
      replace: true,
      restrict: 'EA',
      transclude: false,
      templateUrl: 'components/board/widget/widget.html',
      scope: {
        definition: '=',
        col: '=column',
        editMode: '=',
        options: '=',
        widgetState: '='
      },
      controller: function($scope) {

        $scope.$on('adfDashboardCollapseExpand', function(event, args) {
          $scope.widgetState.isCollapsed = args.collapseExpandStatus;
        });

        $scope.$on('adfWidgetEnterEditMode', function(event, widget) {
          if (board.idEquals($scope.definition.wid, widget.wid)) {
            $scope.edit();
          }
        });

        $scope.openFullScreen = function() {
          var definition = $scope.definition;
          var fullScreenScope = $scope.$new();
          var opts = {
            scope: fullScreenScope,
            templateUrl: 'components/board/widget/widget-fullscreen.html',
            fullScreen: definition.fullScreen
          };

          var instance = $mdDialog.show(opts);
          fullScreenScope.closeDialog = function() {
            instance.close();
            fullScreenScope.$destroy();
          };
        };
      },
      compile: function() {

        /**
         * use pre link, because link of widget-content
         * is executed before post link widget
         */
        return {
          pre: preLink,
          post: postLink
        };
      }
    };

  });
