'use strict';

(function () {
    // Authentication controller Spec
    describe('Auth', function () {

        var sut, mockLocalStorage, mockWindow, constants, mockGetUser;

        beforeEach(function () {
            module(ApplicationConfiguration.applicationModuleName);
        });

        beforeEach(inject(function(Auth, LocalStorage, Constants) {
            sut = Auth;
            constants = Constants;
            mockGetUser = window.spyOn(LocalStorage, 'getUser').andReturn({});
        }));

        describe('Auth methods', function(){

            it('should have no vk user', function(){
               expect(sut.getUser('vk')).toEqual({});
            });

            it('should have no facebook user', function(){
                expect(sut.getUser('facebook')).toEqual({});
            });

            it('should set vk user', function(){
                var user = {};
                user[constants.vk.uid] = '1';
                sut.setUser(constants.vk.name, user);
                mockGetUser.andReturn(user);
                expect(sut.is(constants.vk.name)).toBeTruthy();
            });

        });

    });
}());