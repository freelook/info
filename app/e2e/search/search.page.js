'use strict';

var SearchPage = function() {

  var INPUT_MODEL = 'searchText';


  this.input = element(by.model(INPUT_MODEL));

  this.searchEls = element.all(by.repeater('result in search.results'));

  this.fillInput = function( input ) {
    this.input.sendKeys(input);
    this.input.sendKeys(protractor.Key.ENTER);
  };

};

module.exports = new SearchPage();

