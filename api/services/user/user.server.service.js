'use strict';

var $q = require('q'),
    Parse = require('parse').Parse,
    query = new Parse.Query(Parse.User);

function get(_id) {
    var defer = $q.defer();
    query.first({objectId: _id})
        .then(function (_user) {
            return defer.resolve(_user);
        }, function (err) {
            return defer.reject(err);
        });
    return defer.promise;
}


module.exports = {
    get: get
};