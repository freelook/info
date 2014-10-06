'use strict';

module.exports = {
    app: {
        title: 'freelook',
        description: 'freelook.info',
        keywords: 'MongoDB, Express, AngularJS, Node.js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [],
            js: [
                'app/lib/angular/angular.js',
                'app/lib/angular-route/angular-route.js',
                'app/lib/angular-touch/angular-touch.js',
                'app/lib/mobile-angular-ui/dist/js/mobile-angular-ui.js',

                'app/lib/angular-resource/angular-resource.js',
                'app/lib/angular-cookies/angular-cookies.js',
                'app/lib/angular-animate/angular-animate.js',
                'app/lib/angular-sanitize/angular-sanitize.js',
                '//vk.com/js/api/openapi.js?115'
            ]
        },
        css: [
            'app/modules/**/css/*.css',
            'app/less/base.css'
        ],
        js: [
            'app/config.js',
            'app/application.js',
            'app/modules/*/*.js',
            'app/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'app/lib/angular-mocks/angular-mocks.js',
            'app/modules/*/tests/*.js'
        ]
    }
};