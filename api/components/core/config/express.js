'use strict';

/**
 * Module dependencies.
 */
var morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    helmet = require('helmet'),
    flash = require('connect-flash'),
    config = require('../config'),
    consolidate = require('consolidate'),
    path = require('path');

module.exports = function (app) {

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
        next();
    });

    // Should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Showing stack errors
    app.set('showStackError', true);

    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './views');

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));
    }

    // Disable views cache
    app.set('view cache', false);

    // Request body parsing middleware should be above methodOverride
    app.use(cookieParser());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Enable jsonp
    app.enable('jsonp callback');

    // connect flash for flash messages
    app.use(flash());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Setting the app router and static folder
    //app.use(express.static(path.resolve('./public')));

    // Globbing routing files
    config.getGlobbedFiles('components/**/*.server.route.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};
