module.exports = function(grunt) {
    
    var juice = require("juice"),
        jsdom = require("jsdom");
        
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task.
    grunt.registerTask('inline', 
            "Inline the CSS and shove it into your header and footer",
            function(){
                var complete = this.async(),
                    options = {
                        applyStyleTags: false,
                        applyLinkTags: true,
                        removeStyleTags: false,
                        removeLinkTags: true
                    }
                juice("responsive.html", options, function(err, html) {
                  grunt.file.write("inline.html", html);
                  complete(err);
                });
    });
};
