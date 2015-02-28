'use strict';

describe('Toast', function () {

  var sut, mockMdToastShow, config;

  beforeEach(function () {
    module('freelook.info');
  });

  beforeEach(inject(function (toast, $mdToast) {
    sut = toast;
    config = $mdToast.simple().position('top right');
    mockMdToastShow = spyOn($mdToast, 'show');
  }));

  describe('show', function () {

    it('it should show a toast', function () {
      var text = 'hello';
      config.content(text);
      sut.show(text);
      expect(mockMdToastShow).toHaveBeenCalledWith(config);
    });

  });

});

