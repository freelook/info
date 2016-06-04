'use strict';

describe('The filter view', function () {
  var page = require('./filter.page');

  beforeEach(function () {
    browser.get('http://localhost:8080/?type=web&sub=google');
  });


  describe('Filter by default', function () {

    it('should have content on search', function () {
      page.fillInput('javascript');
      expect(page.searchEls.count()).toBe(12);
    });

  });

});
