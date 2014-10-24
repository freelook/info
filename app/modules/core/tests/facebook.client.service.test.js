'use strict';

describe('FB', function () {
    var httpBackend,
        sut,
        auth,
        constants,
        mockGetUser,
        user,
        mockData,
        mockSetUser,
        regex,
        callbackToSpy;

    beforeEach(function () {
        module(ApplicationConfiguration.applicationModuleName);
    });
    beforeEach(inject(function ($httpBackend, Auth, FB, Constants) {
        sut = FB;
        auth = Auth;
        constants = Constants;
        user = {};
        mockGetUser = window.spyOn(auth, 'getUser').and.returnValue(user);
        mockData = {data: {}};
        mockSetUser = window.spyOn(auth, 'setUser');
        httpBackend = $httpBackend;
        regex = /^https:\/\/graph.facebook.com\/me\/?.*/i;
        httpBackend.expectGET().respond({});
        httpBackend.whenJSONP(regex).respond(mockData);
        callbackToSpy = jasmine.createSpy('CALLBACK');
    }));
    describe('FB methods', function () {
        it('should return token', function () {
            user.access_token = 'access_token';
            expect(sut.getToken()).toBe(mockGetUser().access_token);
        });
        it('should return id', function () {
            var mockGetId = window.spyOn(auth, 'getUID').and.returnValue('UID');
            expect(sut.getID()).toBe(mockGetId());
        });
        it('should set SocialInfo', function () {
            sut.setSocialInfo({});
            expect(mockSetUser).toHaveBeenCalled();
        });
        it('should get SocialInfo', function () {
            sut.getSocialInfo(callbackToSpy);
            httpBackend.flush();
            expect(callbackToSpy).toHaveBeenCalled();
        });
        it('should get Avatar', function () {
            sut.getAvatar();
            httpBackend.flush();
            expect(mockSetUser).toHaveBeenCalled();
        });
        it('should return results Of FB Search', function () {
            sut.search('test', callbackToSpy);
            httpBackend.flush();
            expect(callbackToSpy).toHaveBeenCalled();
        });
    });
    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });
});