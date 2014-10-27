'use strict';
module.exports = function (grunt) {  
    
    grunt.config.set('exec',{
        cleanAndroid: {
            command: 'mobile/platforms/android/cordova/clean',
            stdout: true,
            stderr: true
        },
        buildAndroid: {
            command: '"cordova build"',
            cwd: 'mobile/',
            stdout: true,
            stderr: true
        },
        coverage: {
            command: 'node ./node_modules/karma/bin/karma start karma.js',
            stdout: true,
            stderr: true
        }
    });
      
    grunt.loadNpmTasks('grunt-exec');
};
