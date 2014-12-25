// Generated on 2014-11-16 using generator-chrome-extension 0.2.11
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    approot: 'app/scripts',
    dist: 'dist'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    config: config,

    browserify: {
      options: {
        browserifyOptions: {
          extensions:['.html']
        },
        transform: [['partialify']],
        preBundleCB: function (b) {
          b.plugin('remapify', [
            {
              src: '**/*.*',
              cwd: grunt.config('config').approot,
              expose: 'app'
            }
          ]);
          
          b.plugin('minifyify', {
            minify: grunt.config('config').uglify || false
          });
        }
      },
      background: {
        src: ['<%= config.app %>/scripts/background.js'],
        dest: '<%= config.dist %>/scripts/background.js'
      },
      opts: {
        src: ['<%= config.app %>/scripts/options.js'],
        dest: '<%= config.dist %>/scripts/options.js'
      },
      contentscript: {
        src: ['<%= config.app %>/scripts/contentscript.js'],
        dest: '<%= config.dist %>/scripts/contentscript.js'
      }
    },
    
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: [
          '<%= config.app %>/scripts/**/*.{js,html}'
        ],
        tasks: ['jshint', 'browserify']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      copy: {
        options: {
          cwd: '<%= config.app %>'
        },
        files: [
          'manifest.json',
          '*.{ico,png,txt}',
          'images/{,*/}*.{webp,gif}',
          '*.html',
          'styles/{,*/}*.css',
          'styles/fonts/{,*/}*.*',
          '_locales/{,*/}*.json'
        ],
        tasks: ['copy']
      },
      html: {
        files: ['<%= config.app %>/{,*/}*.html'],
        tasks: ['copy']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['copy']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*'
          ]
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },

    // The following *-min tasks produce minifies files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          // removeCommentsFromCDATA: true,
          // collapseWhitespace: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      debug: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'images/{,*/}*.png'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'manifest.json',
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,gif}',
            '*.html',
            'styles/{,*/}*.css',
            'styles/fonts/{,*/}*.*',
            '_locales/{,*/}*.json'
          ]
        }]
      }
    },

    // Compres dist files to package
    compress: {
      dist: {
        options: {
          archive: function() {
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/technicolor timesheet-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: ''
        }]
      }
    },
    
    yuidoc: {
      compile: {
        name: 'Technicolor Timesheet',
        description: 'Script documentation',
        url: '<%= pkg.homepage %>',
        options: {
          themedir: 'node_modules/yuidoc-clean-theme',
          paths: '<%= config.app %>/scripts',
          outdir: 'docs/yui'
        }
      }
    }
  });

  grunt.registerTask('config:prod', function() {
    grunt.config.merge({config: {uglify: true}});
  });
  
  grunt.registerTask('test', [
    'connect:test',
    'mocha'
  ]);
  
  grunt.registerTask('debug', function () {
    grunt.task.run([
      'jshint',
      'clean:dist',
      'copy',
      'browserify',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'config:prod',
    'imagemin',
    'htmlmin',
    // No UI feature selected, cssmin task will be commented
    // 'cssmin',
    'copy:dist',
    'browserify',
    'usemin',
    'compress'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
