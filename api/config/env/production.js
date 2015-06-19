'use strict';

module.exports = {
    db: {
        url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/fli',
        config: {auth: {authdb: 'admin'}}
    }
};