'use strict';
angular
    .module('core')
    .directive('i18n', function (Localize) {
        var i18nDirective = {
            restrict: 'EA',
            updateText: function (ele, input, placeholder) {
                var result;
                return result = void 0,
                        'i18n-placeholder' === input ?
                            (result = Localize.getLocalizedString(placeholder), ele.attr('placeholder', result))
                            : input.length >= 1 ?
                            (result = Localize.getLocalizedString(input), ele.text(result))
                            : void 0;
            },
            link: function (scope, ele, attrs) {
                return scope.$on('localizeResourcesUpdated', function () {
                    return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder);
                }), attrs.$observe('i18n', function (value) {
                    return i18nDirective.updateText(ele, value, attrs.placeholder);
                });
            }};
        return i18nDirective;
    });
