'use strict';

angular.module('adf')
  .directive('adfDashboard',
  function ($rootScope, $log, $timeout, $mdDialog, dashboard, adfTemplatePath) {

    function stringToBoolean(string) {
      switch (angular.isDefined(string) ? string.toLowerCase() : null) {
        case 'true':
        case 'yes':
        case '1':
          return true;
        case 'false':
        case 'no':
        case '0':
        case null:
          return false;
        default:
          return Boolean(string);
      }
    }

    function createConfiguration(type) {
      var cfg = {};
      var config = dashboard.widgets[type].config;
      if (config) {
        cfg = angular.copy(config);
      }
      return cfg;
    }

    /**
     * Find first widget column in model.
     *
     * @param dashboard model
     */
    function findFirstWidgetColumn(model) {
      return model.columns[0];
    }

    /**
     * Adds the widget to first column of the model.
     *
     * @param dashboard model
     * @param widget to add to model
     * @param name name of the dashboard
     */
    function addNewWidgetToModel(model, widget, name) {
      if (model) {
        var column = findFirstWidgetColumn(model);
        if (column) {
          if (!column.widgets) {
            column.widgets = [];
          }
          column.widgets.unshift(widget);

          // broadcast added event
          $rootScope.$broadcast('adfWidgetAdded', name, model, widget);
        } else {
          $log.error('could not find first widget column');
        }
      } else {
        $log.error('model is undefined');
      }
    }

    /**
     * Checks if the edit mode of the widget should be opened immediately.
     *
     * @param widget type
     */
    function isEditModeImmediate(type) {
      var widget = dashboard.widgets[type];
      return widget && widget.edit && widget.edit.immediate;
    }

    /**
     * Opens the edit mode of the specified widget.
     *
     * @param dashboard scope
     * @param widget
     */
    function openEditMode($scope, widget) {
      // wait some time before fire enter edit mode event
      $timeout(function () {
        $scope.$broadcast('adfWidgetEnterEditMode', widget);
      }, 200);
    }

    /**
     * Creates object with the category name as key and an array of widgets as value.
     *
     * @param widgets array of widgets
     *
     * @return array of categories
     */
    function createCategories(widgets) {
      var categories = {};
      angular.forEach(widgets, function (widget, key) {
        var category = widget.category;
        // if the widget has no category use a default one
        if (!category) {
          category = 'Miscellaneous';
        }
        // push widget to category array
        if (angular.isUndefined(categories[category])) {
          categories[category] = {widgets: {}};
        }
        categories[category].widgets[key] = widget;
      });
      return categories;
    }

    return {
      replace: true,
      restrict: 'EA',
      transclude: false,
      scope: {
        structure: '@',
        name: '@',
        collapsible: '@',
        editable: '@',
        editMode: '@',
        continuousEditMode: '=',
        maximizable: '@',
        adfModel: '=',
        adfWidgetFilter: '=',
        categories: '@'
      },
      controller: function ($scope) {
        var model = {};
        var structure = {};
        var widgetFilter = null;
        var structureName = {};
        var name = $scope.name;

        // Watching for changes on adfModel
        $scope.$watch('adfModel', function (oldVal, newVal) {
          // has model changed or is the model attribute not set
          if (newVal !== null || (oldVal === null && newVal === null)) {
            model = $scope.adfModel;
            widgetFilter = $scope.adfWidgetFilter;
            if (!model || !model.columns) {
              structureName = $scope.structure;
              structure = dashboard.structures[structureName];
              if (structure) {
                if (model) {
                  model.columns = angular.copy(structure).columns;
                } else {
                  model = angular.copy(structure);
                }
                model.structure = structureName;
              } else {
                $log.error('could not find structure ' + structureName);
              }
            }

            if (model) {
              if (!model.title) {
                model.title = 'Dashboard';
              }
              if (!model.titleTemplateUrl) {
                model.titleTemplateUrl = adfTemplatePath + 'dashboard/title.html';
              }
              $scope.model = model;
            } else {
              $log.error('could not find or create model');
            }
          }
        }, true);

        // edit mode
        $scope.editMode = false;
        $scope.editClass = '';

        //passs translate function from dashboard so we can translate labels inside html templates
        $scope.translate = dashboard.translate;

        function getNewModalScope() {
          var scope = $scope.$new();
          //pass translate function to the new scope so we can translate the labels inside the modal dialog
          scope.translate = dashboard.translate;
          return scope;
        }

        $scope.toggleEditMode = function () {
          $scope.editMode = !$scope.editMode;
          if ($scope.editMode) {
            if (!$scope.continuousEditMode) {
              $scope.modelCopy = angular.copy($scope.adfModel, {});
              $rootScope.$broadcast('adfIsEditMode');
            }
          }

          if (!$scope.editMode) {
            $rootScope.$broadcast('adfDashboardChanged', name, model);
          }
        };

        $scope.$on('adfToggleEditMode', function () {
          $scope.toggleEditMode();
        });

        $scope.collapseAll = function (collapseExpandStatus) {
          $rootScope.$broadcast('adfDashboardCollapseExpand', {collapseExpandStatus: collapseExpandStatus});
        };

        $scope.cancelEditMode = function () {
          $scope.editMode = false;
          $scope.model = $scope.modelCopy;
          if (!$scope.continuousEditMode) {
            $scope.modelCopy = angular.copy($scope.modelCopy, $scope.adfModel);
          }
          $rootScope.$broadcast('adfDashboardEditsCancelled');
        };

        // edit dashboard settings
        $scope.editDashboardDialog = function () {
          var editDashboardScope = getNewModalScope(),
            adfEditTemplatePath = adfTemplatePath + 'dashboard/edit.html';
          if (model.editTemplateUrl) {
            adfEditTemplatePath = model.editTemplateUrl;
          }
          $mdDialog.show({
            scope: editDashboardScope,
            templateUrl: adfEditTemplatePath,
            clickOutsideToClose: true,
            fullscreen: true
          });
          editDashboardScope.closeDialog = $mdDialog.cancel;
        };

        // add widget dialog
        $scope.addWidgetDialog = function () {
          var addScope = getNewModalScope();
          var model = $scope.model;
          var widgets;
          if (angular.isFunction(widgetFilter)) {
            widgets = {};
            angular.forEach(dashboard.widgets, function (widget, type) {
              if (widgetFilter(widget, type, model)) {
                widgets[type] = widget;
              }
            });
          } else {
            widgets = dashboard.widgets;
          }
          addScope.widgets = widgets;

          //pass translate function to the new scope so we can translate the labels inside the modal dialog
          addScope.translate = $scope.translate;

          // pass createCategories function to scope, if categories option is enabled
          if ($scope.options.categories) {
            $scope.createCategories = createCategories;
          }

          var adfAddTemplatePath = adfTemplatePath + 'dashboard/widget-add.html';
          if (model.addTemplateUrl) {
            adfAddTemplatePath = model.addTemplateUrl;
          }

          var opts = {
            scope: addScope,
            templateUrl: adfAddTemplatePath
          };

          $mdDialog.show(opts);
          addScope.addWidget = function (widget) {
            var w = {
              type: widget,
              config: createConfiguration(widget)
            };
            addNewWidgetToModel(model, w, name);
            // close and destroy
            $mdDialog.cancel();

            // check for open edit mode immediately
            if (isEditModeImmediate(widget)) {
              openEditMode($scope, w);
            }
          };
          addScope.closeDialog = function () {
            // close and destroy
            $mdDialog.cancel();
          };
        };

        $scope.addNewWidgetToModel = addNewWidgetToModel;
      },
      link: function ($scope, $element, $attr) {
        // pass options to scope
        var options = {
          name: $attr.name,
          editable: true,
          enableConfirmDelete: stringToBoolean($attr.enableConfirmDelete),
          maximizable: stringToBoolean($attr.maximizable),
          collapsible: stringToBoolean($attr.collapsible),
          categories: stringToBoolean($attr.categories)
        };
        if (angular.isDefined($attr.editable)) {
          options.editable = stringToBoolean($attr.editable);
        }
        $scope.options = options;
      },
      templateUrl: adfTemplatePath + 'dashboard/dashboard.html'
    };
  });
