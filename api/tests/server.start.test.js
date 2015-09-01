'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    config = require('../config/config');


/**
 * Unit tests
 */
describe('Server Unit Tests:', function () {
    before(function (done) {
        done();
    });

    describe('Start', function () {
        it('should has config', function (done) {
            should.exist(config);
            done();
        });

    });

    after(function (done) {
        done();
    });
});
