'use strict';

describe('The index view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./index.page');
  });

  it('should have content on search', function() {
    page.fillInput('javascript');
    expect(page.searchEls.count()).toBe(10);
  });

  it('should have no content if search request empty', function() {
    page.fillInput('');
    expect(page.searchEls.count()).toBe(0);
  });


});
