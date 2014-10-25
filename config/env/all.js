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
            js: [
                'app/lib/angular/angular.js',
                'app/lib/angular-route/angular-route.js',
                'app/lib/angular-touch/angular-touch.js',
                'app/lib/angular-resource/angular-resource.js',
                'app/lib/angular-cookies/angular-cookies.js',
                'app/lib/angular-animate/angular-animate.js',
                'app/lib/angular-sanitize/angular-sanitize.js',
                'app/lib/angular-translate/angular-translate.js',
                'app/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'app/lib/angular-translate-storage-local/angular-translate-storage-local.js',
                'app/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                'app/lib/mobile-angular-ui/dist/js/mobile-angular-ui.js',
                'app/lib/angularjs-toaster/toaster.js'
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
        ]
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || 'APP_ID',
        clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
        callbackURL: 'http://local.freelook.info:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
        clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || 'APP_ID',
        clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};