'use strict';

var FilterPage = function () {

  var INPUT_ID = 'input';


  this.input = element(by.id(INPUT_ID));


  this.searchEls = element.all(by.repeater('item in google.search.results'));

  this.fillInput = function (input) {
    var self = this;
    self.input.clear().then(function () {
      self.input.sendKeys(input);
      self.input.sendKeys(protractor.Key.ENTER);
    });

  };

};

module.exports = new FilterPage();

