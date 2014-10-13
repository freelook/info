'use strict';

module.exports = {
    app: {
        title: 'freelook',
        description: 'freelook.info',
        keywords: 'looks, likes, get likes'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
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
                'app/lib/mobile-angular-ui/dist/js/mobile-angular-ui.min.js',
                'app/lib/angularjs-toaster/toaster.js'
            ],
            js: [
                'app/lib/angular/angular.js',
                'app/lib/angular-route/angular-route.js',
                'app/lib/angular-touch/angular-touch.js',
                'app/lib/angular-resource/angular-resource.js',
                'app/lib/angular-cookies/angular-cookies.js',
                'app/lib/angular-animate/angular-animate.js',
                'app/lib/angular-sanitize/angular-sanitize.js',
                'app/lib/mobile-angular-ui/dist/js/mobile-angular-ui.js',
                'app/lib/angularjs-toaster/toaster.js',
                '//vk.com/js/api/openapi.js?115'
            ]
        },
        css: [
            'app/modules/**/css/*.css',
            'app/lib/angularjs-toaster/toaster.css',
            'app/less/base.css'
        ],
        js: [
            'app/config.js',
            'app/application.js',
            'app/modules/*/*.js',
            'app/modules/*/*[!tests]*/*.js',
            'app/generated/template.js'
        ],
        tests: [
            'app/lib/angular-mocks/angular-mocks.js',
            'app/modules/*/tests/*.js'
        ]
    },
    date: ''
};