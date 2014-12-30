

'use strict';

var SearchPage = function() {

  var INPUT_ID = '003';
  var TABS = {
    yandex: '#tab_002'
  };


  this.input = element(by.id(INPUT_ID));

  this.searchEls = element.all(by.repeater('result in search.results'));
  this.searchYEls = element.all(by.repeater('result in search'));

  this.fillInput = function( input ) {
    this.input.sendKeys(input);
  };

  this.clickTab = function( name ) {
    element.all(by.css(TABS[name])).click();
  };

};

module.exports = new SearchPage();

