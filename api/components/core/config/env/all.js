'use strict';

module.exports = {
    app: {
        title: 'freelook.info',
        description: 'api',
        keywords: 'free look at info'
    },
    port: process.env.PORT || 4000,
    templateEngine: 'swig',
    Red: {
        httpAdminRoot: '/red',
        httpNodeRoot: '/rapi',
        userDir: './components/core/red',
        functionGlobalContext: {}
    },
    mysql: {
        url: process.env.MYSQL_URL
    }
};