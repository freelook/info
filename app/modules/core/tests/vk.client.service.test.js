'use strict';

describe('VK', function () {
    var sut,
        httpBackend,
        auth,
        returnUser,
        mockGetUser,
        mockAuthIs,
        regex,
        mockData,
        callbackToSpy;
    beforeEach(function () {
        module(ApplicationConfiguration.applicationModuleName);
    });
    beforeEach(inject(function (VK, $httpBackend, Auth) {
        sut = VK;
        httpBackend = $httpBackend;
        auth = Auth;
        returnUser = {};
        mockData = {
            'response': true
        };
        regex = /^http:\/\/api.vk.com\/.*/i;
        mockGetUser = window.spyOn(auth, 'getUser').and.returnValue(returnUser);
        httpBackend.expectGET().respond({});
        httpBackend.whenJSONP(regex).respond(mockData);
        callbackToSpy = jasmine.createSpy('CALLBACK');
        mockAuthIs = window.spyOn(auth, 'is').and.returnValue(true);
    }));
    describe('VK methods', function () {
        it('should get Token', function () {
            returnUser.access_token = 'access_token';
            expect(sut.getToken()).toBe(returnUser.access_token);
        });
        it('should return results of VK search', function () {
            sut.search('input', callbackToSpy);
            httpBackend.flush();
            expect(callbackToSpy).toHaveBeenCalled();
        });
        it('should get socialInfo', function () {
            sut.getSocialInfo(callbackToSpy);
            httpBackend.flush();
            expect(callbackToSpy).toHaveBeenCalled();
        });
    });
    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });
});