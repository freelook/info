

'use strict';

var IndexPage = function() {

  this.input = element(by.id('001'));

  this.searchEls = element.all(by.repeater('result in search.results'));

  this.fillInput = function( input ) {
    this.input.sendKeys(input);
  };

};

module.exports = new IndexPage();

