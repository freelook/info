'use strict';
var OperationHelper = require('apac').OperationHelper;
var opHelper = new OperationHelper({
    awsId: 'AKIAI3UDVCJD3II2MIOA',
    awsSecret: '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',
    assocId: 'flai01-20',
    version: '2013-08-01'
});

module.exports = function (req, res) {

    if (req.query && req.query.q) {
        opHelper.execute('ItemSearch', {
            'SearchIndex': 'All',
            'Keywords': req.query.q,
            'ResponseGroup': 'Medium'
        }, function (err, results) {
            res.json(results);
        });
    } else {
        res.end();
    }


};