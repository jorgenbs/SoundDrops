'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'coffee-script'
        },
        src: ['test/**/*.coffee'],
      }
    },
    nodemon: {
      dev: {
        file: './app.js'
      }
    },
    watch: {
      src: {
        files: ['<%= coffeelint.all %>'],
        tasks: ['default']
      },
      www: {
        files: ['public/**/*.jade', 'public/**/*.css', 'public/**/*.js'],
        options: {
          livereload: {
            port: 1337
          }
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon','watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'app.js': 'src/app.coffee',
          'routes.js': 'src/routes.coffee',
          'public/js/sound-drop.js': 'src/sound-drop.coffee',
          'public/js/main.js': 'src/main-client.coffee'
        }
      }
    },
    coffeelint: {
      all: ['src/**/*.coffee', 'test/**/*.coffee'],
      options: {
        'max_line_length': {
          'level': 'warn'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-reload');

  // Default task.
  grunt.registerTask('default', ['coffeelint', 'coffee', 'mochaTest']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('dev', ['default', 'concurrent']);

};
