'use strict';


module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({

        // Project settings
        config: config,

        // Grunt server and debug server setting
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            chrome: {
                options: {
                    open: false,
                    base: [
                        '<%= config.app %>'
                    ]
                }
            },
            test: {
                options: {
                    open: false,
                    base: [
                        'test',
                        '<%= config.app %>'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            chrome: {},
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= config.dist %>/*',
                            '!<%= config.dist %>/.git*'
                        ]
                    }
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: [
                '<%= config.app %>/popup.html',
                '<%= config.app %>/options.html'
            ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minifies files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.{gif,jpeg,jpg,png}',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'images/{,*/}*.{webp,gif}',
                            '{,*/}*.html',
                            'styles/{,*/}*.css',
                            'styles/fonts/{,*/}*.*',
                            '_locales/{,*/}*.json',
                        ]
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            chrome: [],
            dist: [
                'imagemin'
            ],
            test: []
        },

        // Auto buildnumber, exclude debug files. smart builds that event pages
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    background: {
                        target: 'scripts/background.js'
                    }
                },
                src: '<%= config.app %>',
                dest: '<%= config.dist %>'
            }
        },

        // Compres dist files to package
        compress: {
            dist: {
                options: {
                    archive: function () {
                        var manifest = grunt.file.readJSON('app/manifest.json');
                        return 'package/freelook-' + manifest.version + '.zip';
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'chromeManifest:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'uglify',
        'copy',
        'usemin',
        'compress'
    ]);

    grunt.registerTask('test', [
        'clean:dist',
        'chromeManifest:dist',
        'concurrent:dist',
        'concat',
        'copy',
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
