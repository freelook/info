'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/freelook',
    assets: {
        lib: {
            css: [],
            js: []
        },
        css: ['app/dist/freelook.min.css'],
        js: ['app/dist/freelook.min.js']
    },
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
            }
        }
    },
    vkontakte: {
        clientID: process.env.VK_ID || 'VK_ID',
        clientSecret: process.env.VK_SECRET || 'VK_SECRET',
        callbackURL: 'http://freelookinfo.herokuapp.com/auth/vkontakte/callback'
    }
};