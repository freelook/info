'use strict';

/* global angular */
angular.module('adf')
  .directive('adfDashboardColumn',
  function ($log, $compile, $rootScope, adfTemplatePath, dashboard) {

    /**
     * moves a widget in between a column
     */
    function moveWidgetInColumn($scope, column, evt) {
      var widgets = column.widgets;
      // move widget and apply to scope
      $scope.$apply(function () {
        widgets.splice(evt.newIndex, 0, widgets.splice(evt.oldIndex, 1)[0]);
        $rootScope.$broadcast('adfWidgetMovedInColumn');
      });
    }

    /**
     * finds a widget by its id in the column
     */
    function findWidget(column, index) {
      var widget = null;
      for (var i = 0; i < column.widgets.length; i++) {
        var w = column.widgets[i];
        if (dashboard.idEquals(w.wid, index)) {
          widget = w;
          break;
        }
      }
      return widget;
    }

    /**
     * finds a column by its id in the model
     */
    function findColumn(model, index) {
      var column = null;
      for (var j = 0; j < model.columns.length; j++) {
        var c = model.columns[j];
        if (dashboard.idEquals(c.cid, index)) {
          column = c;
          break;
        }
      }
      return column;
    }

    /**
     * get the adf id from an html element
     */
    function getId(el) {
      var id = el.getAttribute('adf-id');
      return id ? id : '-1';
    }

    /**
     * adds a widget to a column
     */
    function addWidgetToColumn($scope, model, targetColumn, evt) {
      // find source column
      var cid = getId(evt.from);
      var sourceColumn = findColumn(model, cid);

      if (sourceColumn) {
        // find moved widget
        var wid = getId(evt.item);
        var widget = findWidget(sourceColumn, wid);

        if (widget) {
          // add new item and apply to scope
          $scope.$apply(function () {
            if (!targetColumn.widgets) {
              targetColumn.widgets = [];
            }
            targetColumn.widgets.splice(evt.newIndex, 0, widget);

            $rootScope.$broadcast('adfWidgetAddedToColumn');
          });
        } else {
          $log.warn('could not find widget with id ' + wid);
        }
      } else {
        $log.warn('could not find column with id ' + cid);
      }
    }

    /**
     * removes a widget from a column
     */
    function removeWidgetFromColumn($scope, column, evt) {
      // remove old item and apply to scope
      $scope.$apply(function () {
        column.widgets.splice(evt.oldIndex, 1);
        $rootScope.$broadcast('adfWidgetRemovedFromColumn');
      });
    }

    /**
     * enable sortable
     */
    function applySortable($scope, $element, model, column) {
      // enable drag and drop
      var el = $element[0];
      var sortable = window.Sortable.create(el, {
        group: 'widgets',
        handle: '.adf-move',
        ghostClass: 'placeholder',
        animation: 150,
        onAdd: function (evt) {
          addWidgetToColumn($scope, model, column, evt);
        },
        onRemove: function (evt) {
          removeWidgetFromColumn($scope, column, evt);
        },
        onUpdate: function (evt) {
          moveWidgetInColumn($scope, column, evt);
        }
      });

      // destroy sortable on column destroy event
      $element.on('$destroy', function () {
        // check sortable element, before calling destroy
        // see https://github.com/sdorra/angular-dashboard-framework/issues/118
        if (sortable.el) {
          sortable.destroy();
        }
      });
    }

    return {
      restrict: 'E',
      replace: true,
      scope: {
        column: '=',
        editMode: '=',
        continuousEditMode: '=',
        adfModel: '=',
        options: '='
      },
      templateUrl: adfTemplatePath + 'column/column.html',
      link: function ($scope, $element) {
        // set id
        var col = $scope.column;
        if (!col.cid) {
          col.cid = dashboard.id();
        }

        // enable drag and drop for widget only columns
        applySortable($scope, $element, $scope.adfModel, col);
      }
    };
  });
