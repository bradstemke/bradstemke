module.exports = function(grunt) {

  require('time-grunt')(grunt);

  var globalConfig = {
    projectTitle: 'bf-static-starter',
    path: '/Users/bradstemke/Sites',
    assets: 'assets/',
    dev: 'src/',
    dist: 'dist/'
  };

  // Project Configuration
  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),

    babel: {
        options: {
            "sourceMap": true
        },
        dist: {
            files: [{
                "expand": true,
                "cwd": "src/js",
                "src": ["**/*.jsx"],
                "dest": "src/js-compiled/",
                "ext": "-compiled.js"
            }]
        }
    },
    uglify: {
        all_src : {
            options : {
              sourceMap : true,
              sourceMapName : 'src/build/sourceMap.map'
            },
            src : 'src/js-compiled/**/*-compiled.js',
            dest : 'src/build/all.min.js'
        }
    },

    watch: {
      sass: {
        files: '<%= globalConfig.dev %>/stylesheets/**/**/*.scss',
        tasks: 'sass:dev'
      },

      scripts: {
        files: '<%= globalConfig.dev %>/scripts/**',
        tasks: ['copy:js_plugins', 'copy:js_main'],
        options: {
          interrupt: true,
        },
      },

      html: {
        files: '<%= globalConfig.dev %>*.html',
        tasks: 'copy:html'
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          banner: '/* <%= pkg.title || pkg.name %> - <%= grunt.template.today(\"mm-dd-yyyy\") %> - Copyright <%= grunt.template.today(\"yyyy\") %>; */',
        },
        files: { '<%= globalConfig.dist %>/<%= globalConfig.assets %>/stylesheets/style.css' : '<%= globalConfig.dev %>/stylesheets/style.scss' }
      },
      build: {
        options: { style: 'compressed' },
        files: { '<%= globalConfig.dist %>/<%= globalConfig.assets %>/stylesheets/style.css' : '<%= globalConfig.dev %>/stylesheets/style.scss' }
      }
    },

    // Copy to build folder
    copy: {
      js_plugins: {
        expand: true,
        src: '**',
        cwd: '<%= globalConfig.dev %>/scripts/plugins',
        dest: '<%= globalConfig.dist %>/assets/scripts/plugins',
      },
      js_main: {
        expand: true,
        src: 'scripts.js',
        cwd: '<%= globalConfig.dev %>/scripts',
        dest: '<%= globalConfig.dist %>/assets/scripts',
      },
      build: {
        expand: true,
        cwd: '<%= globalConfig.dev %>/',
        src: ['**', '!node_modules/**', '!Gruntfile.js', '!package.json', '!scripts/**', '!stylesheets/**'],
        dest: '<%= globalConfig.dist %>/'
      },
      html: {
        expand: true,
        cwd: '<%= globalConfig.dev %>/',
        src: ['*.html'],
        dest: '<%= globalConfig.dist %>/'
      }
    },

    // Empty build folder
    clean: {
      build: {
        src: ['<%= globalConfig.dist %>/']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: '<%= globalConfig.path %>/<%= globalConfig.projectTitle %>/',
          keepalive: true
        }
      }
    },

    imagemin: {
      build: {
        options: { optimizationLevel: 3 },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.dev %>/assets/',
          src: ['**/*.jpeg', '**/*.png', '**/*.jpg'],
          dest: '<%= globalConfig.dist %>/assets/media/'
        }]
      }
    },

    concat: {
      plugins: {
        src: '<%= globalConfig.dev %>/scripts/plugins/*.js',
        dest: '<%= globalConfig.dist %>/assets/scripts/plugins.js'
      }
    }
  }); // END grunt.initConfig

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-replace');

  grunt.loadNpmTasks('grunt-babel');

  // Build DIST folder
  grunt.registerTask('build', [
    'sass:build',
    'concat:plugins',
    'uglify:build_main',
    'uglify:build_plugins',
    'imagemin:build',
    'copy:build'
  ]);

  // Clear DIST folder
  grunt.registerTask('clean', [
    'clean:build'
  ]);

  grunt.registerTask('default', ['babel', 'uglify']);


  // starts local server http://localhost:9001/src/index.html
  grunt.registerTask('server', [
    'connect:server'
  ]);
};