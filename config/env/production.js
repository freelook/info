'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/freelook',
    assets: {
        lib: {
            css: [],
            vendors: [
                'app/lib/angular/angular.min.js',
                'app/lib/angular-route/angular-route.min.js',
                'app/lib/angular-touch/angular-touch.min.js',
                'app/lib/angular-resource/angular-resource.min.js',
                'app/lib/angular-cookies/angular-cookies.min.js',
                'app/lib/angular-animate/angular-animate.min.js',
                'app/lib/angular-sanitize/angular-sanitize.min.js',
                'app/lib/mobile-angular-ui/dist/js/mobile-angular-ui.min.js'
            ],
            js: [
                '//vk.com/js/api/openapi.js?115'
            ]
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
    vk: {
        date: '',
        url: 'freelookinfo.herokuapp.com'
    }
};