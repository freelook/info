'use strict';

var SearchPage = function() {

  var INPUT_ID = 'input';


  this.input = element(by.id(INPUT_ID));

  this.searchEls = element.all(by.repeater('result in search.results'));

  this.fillInput = function( input ) {
    this.input.sendKeys(input);
    this.input.sendKeys(protractor.Key.ENTER);
  };

};

module.exports = new SearchPage();

