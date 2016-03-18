'use strict';

module.exports = {
    app: {
        title: 'freelook.info',
        description: 'api',
        keywords: 'free look at info'
    },
    port: process.env.PORT || 4000,
    templateEngine: 'swig',
    Parse: {
        id: process.env.PARSE_ID,
        js: process.env.PARSE_JS,
        master: process.env.PARSE_MASTER
    },
    Firebase: {
        ref: 'https://freelook.firebaseio.com/',
        id: process.env.FIREBASE_ID
    },
    Red: {
        httpAdminRoot: '/red',
        httpNodeRoot: '/rapi',
        userDir: './components/core/red',
        functionGlobalContext: {}
    }
};