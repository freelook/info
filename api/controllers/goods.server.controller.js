'use strict';
var OperationHelper = require('apac').OperationHelper;
var opHelper = new OperationHelper({
    awsId: process.env.AWSID,
    awsSecret: process.env.AWSSECRET,
    assocId: process.env.ASSOCID,
    version: '2013-08-01'
});

module.exports = function (req, res) {

    if (req.query && req.query.q) {
        opHelper.execute('ItemSearch', {
            'SearchIndex': 'All',
            'Keywords': req.query.q,
            'ResponseGroup': 'Large'
        }, function (err, results) {
            res.json(results);
        });
    } else {
        res.end();
    }


};