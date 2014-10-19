
module.exports = function (grunt) {  
          
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('android', 'Clean folder and create android build.', function () {
        grunt.task.run('exec:buildAndroid');
    });

    grunt.registerTask('cleanAndroid', 'Clean folder and create android build.', function () {
        grunt.task.run('exec:cleanAndroid');
    });
};