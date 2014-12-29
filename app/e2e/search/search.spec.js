'use strict';

describe('The search view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/');
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

  describe('Yandex', function () {

    it('should have no content if search request empty', function () {
      page.fillInput('');
      page.clickTab('yandex');
      expect(page.iframe.count()).toBe(0);
    });

    it('should load iframe on search', function () {
      page.fillInput('javascript');
      page.clickTab('yandex');
      expect(page.iframe.count()).toBe(1);
    });

  });

});
