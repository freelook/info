'use strict';

module.exports = function (grunt) {

    var config = require('./config/config');

    // Unified Watch Object
    var watchFiles = {
        serverViews: ['server/views/**/*.*'],
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'server/**/*.js'],
        clientViews: ['app/modules/**/views/**/*.html'],
        clientJS: ['app/modules/**/*.js'],
        clientCSS: ['app/modules/**/*.css'],
        mochaTests: ['server/tests/**/*.js'],
        vendors: config.assets.lib.vendors,
        jsBuildFiles: config.assets.js
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                tasks: ['ngtemplates'],
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        less: {
            dist: {
                options: {
                    paths: ['app/less']
                },
                files: {
                    'app/less/base.css': 'app/less/base.less'
                }
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'app/generated/application.min.js': 'app/generated/application.js',
                    'app/generated/vendor.min.js': 'app/generated/vendor.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'app/dist/freelook.min.css': '<%= applicationCSSFiles %>'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        ngAnnotate: {
            development: {
                files: {
                    'app/generated/application.js': watchFiles.jsBuildFiles,
                    'app/generated/vendor.js': watchFiles.vendors
                }
            }
        },
        ngtemplates: {
            app: {
                src: watchFiles.clientViews[0],
                dest: 'app/generated/template.js',
                options: {
                    base: './app',
                    htmlmin: {
                        collapseWhitespace: true,
                        removeComments: true
                    }
                }
            }
        },
        concat: {
            js: {
                files: {
                    'app/dist/freelook.min.js': ['app/generated/vendor.min.js', 'app/generated/application.min.js']
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        mochaTest: {
            src: watchFiles.mochaTests,
            options: {
                reporter: 'spec',
                require: 'server.js'
            }
        },
        karma: {
            coverage: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {
        var init = require('./config/init')();
        grunt.config.set('applicationCSSFiles', config.assets.css);
    });

    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);

    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    grunt.registerTask('coverage', ['karma:coverage']);

    // Build task(s).
    switch (process.env.NODE_ENV) {
        case 'development':
        case 'test':
            grunt.registerTask('build', ['lint', 'loadConfig', 'ngtemplates', 'ngAnnotate', 'uglify', 'cssmin', 'concat']);
            break;
        default:
            grunt.registerTask('build', ['lint', 'loadConfig']);
    }
};