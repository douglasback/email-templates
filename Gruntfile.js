module.exports = function(grunt) {
    
    var juice = require("juice"),
        jsdom = require("jsdom").jsdom;
        
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            options: {
                removeComments: true
            },
            dist : {
                files: {
                    'dist/inline.min.html' : 'dist/inline.html'
                }
            }
        },
        cssmin: {
            options: {
                
            },
            dist: {
                files: {
                    'css/media-queries.min.css' : 'css/media-queries.css'
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

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
                    };

                grunt.task.run("cssmin");

                juice("responsive.html", options, function(err, html) {
                    var reg = /\@import url\('(.*)'\)/,
                        mq = html.match(reg)[1],
                        mqLoaded = grunt.file.read(mq),
                        embedded = html.replace(reg, mqLoaded);
                    grunt.log.verbose.writeln("External CSS loc: " + mq);
                    grunt.file.write("dist/inline.html", embedded);
                    grunt.task.run("htmlmin");
                    complete(err);
                });
    });
};
