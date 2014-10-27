'use strict';
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('coverage', 'Coverage run.', function () {
        grunt.task.run('exec:coverage');
    });

};
