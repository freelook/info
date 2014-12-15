'use strict';

module.exports = {
    app: {
        title: 'freelook',
        description: 'freelook.info',
        keywords: 'looks, likes, get likes'
    },
    port: process.env.PORT || 4000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [],
            js: [
                'public/lib/hammerjs/hammer.js',
                'public/lib/angular/angular.js',
                'public/lib/angular-route/angular-route.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-aria/angular-aria.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-translate/angular-translate.js',
                'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
                'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                'public/lib/angular-material/angular-material.js',
                'public/lib/mobile-angular-ui/dist/js/mobile-angular-ui.js',
                'public/lib/angularjs-toaster/toaster.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css',
            'public/lib/angular-material/angular-material.css',
            'public/lib/angular-material/themes/deep-purple-theme.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js',
            'public/generated/template.js'
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
        callbackURL: 'http://localhost:3000/auth/google/callback',
        EXT_ID: 'dlliipgdjogiifieihjpfoccjnnmjild'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
