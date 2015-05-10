'use strict';

describe('The search view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost');
    page = require('./search.page');
  });


  describe('Google by default', function () {

    it('should have content on search', function () {
      page.fillInput('javascript');
      expect(page.searchEls.count()).toBe(10);
    });

    it('should have no content if search request empty', function () {
      page.fillInput('');
      expect(page.searchEls.count()).toBe(0);
    });

  });

});
