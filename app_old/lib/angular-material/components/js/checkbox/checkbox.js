/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v0.5.1-master-8174c88
 */
!function(){"use strict";function e(e,t,n,i,r){function a(t,a){return a.type="checkbox",a.tabIndex=0,t.attr("role",a.type),function(a,l,o,d){function s(e){e.which===i.KEY_CODE.SPACE&&(e.preventDefault(),u(e))}function u(e){l[0].hasAttribute("disabled")||a.$apply(function(){p=!p,d.$setViewValue(p,e&&e.type),d.$render()})}function m(){p=d.$viewValue,p?l.addClass(c):l.removeClass(c)}var p=!1;r(l),d=d||{$setViewValue:function(e){this.$viewValue=e},$parsers:[],$formatters:[]},n.expectWithText(t,"aria-label"),e.link.pre(a,{on:angular.noop,0:{}},o,[d]),l.on("click",u),l.on("keypress",s),d.$render=m}}e=e[0];var c="md-checked";return{restrict:"E",transclude:!0,require:"?ngModel",template:'<div class="md-container" md-ink-ripple="checkbox"><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',compile:a}}angular.module("material.components.checkbox",["material.core"]).directive("mdCheckbox",e),e.$inject=["inputDirective","$mdInkRipple","$mdAria","$mdConstant","$mdTheming"]}();