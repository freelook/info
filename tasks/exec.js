'use strict';
module.exports = function (grunt) {  
    
    grunt.config.set('exec',{
        todo: {
            command: 'echo todo',
            stdout: true,
            stderr: true
        }
    });
      
    grunt.loadNpmTasks('grunt-exec');
};
