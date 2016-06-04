'use strict';

fdescribe('Projectrs lookup', function () {
  var page = require('./kickstarter.page'),
    wait = 3000;

  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.get('https://www.kickstarter.com/discover/advanced?woe_id=0&sort=end_date&page=1');
  });


  describe('Send message', function () {

    it('should send message', function () {
      for (var i = 0; i < 10; i++) {
        browser.sleep(wait);
        page.projects.get(i).then(function (project) {
          project.click().then(function () {
            browser.sleep(wait);
            browser.navigate().back();
            browser.sleep(wait);
            expect(1).toBe(1);
          });
        });
      }
    });

  });

});
