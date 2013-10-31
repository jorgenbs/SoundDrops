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
      all: {
        files: ['<%= coffeelint.all %>'],
        tasks: ['default']
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'app.js': 'src/app.coffee',
          'routes.js': 'src/routes.coffee'
        }
      }
    },
    coffeelint: {
      all: ['src/**/*.coffee', 'test/**/*.coffee']
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

  // Default task.
  grunt.registerTask('default', ['coffeelint', 'coffee', 'mochaTest']);
  grunt.registerTask('test', ['mochaTest']);
};
