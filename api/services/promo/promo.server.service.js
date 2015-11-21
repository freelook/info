'use strict';

var $q = require('q'),
    Parse = require('parse').Parse;

function click(data) {
    var defer = $q.defer();
    Parse.Cloud.run('show_click', data).then(function (_promo) {
        return defer.resolve(_promo.url);
    }, function (err) {
        return defer.reject(err);
    });
    return defer.promise;
}


module.exports = {
    click: click
};