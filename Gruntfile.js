module.exports = function(grunt) {

  require('time-grunt')(grunt);

  var globalConfig = {
    projectTitle: 'bradstemke-dot-com',
    path: 'Applications/MAMP/htdocs',
    assets: 'assets/',
    dev: 'src/',
    dist: 'dist/'
  };

  // Project Configuration
  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      sass: {
        files: '<%= globalConfig.dev %>/<%= globalConfig.assets %>stylesheets/**/**/*.scss',
        tasks: 'sass:dev'
      },

      scripts: {
        files: '<%= globalConfig.dev %>/assets/scripts/**',
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
        files: { '<%= globalConfig.dist %>/<%= globalConfig.assets %>stylesheets/style.css' : '<%= globalConfig.dev %>/<%= globalConfig.assets %>stylesheets/style.scss' }
      },
      build: {
        options: { style: 'compressed' },
        files: { '<%= globalConfig.dist %>/<%= globalConfig.assets %>stylesheets/style.css' : '<%= globalConfig.dev %>/<%= globalConfig.assets %>stylesheets/style.scss' }
      }
    },

    // Copy to build folder
    copy: {
      js_plugins: {
        expand: true,
        src: '**',
        cwd: '<%= globalConfig.dev %>/<%= globalConfig.assets %>scripts/plugins',
        dest: '<%= globalConfig.dist %>/assets/scripts/plugins',
      },
      js_main: {
        expand: true,
        src: 'scripts.js',
        cwd: '<%= globalConfig.dev %>/<%= globalConfig.assets %>scripts',
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
          base: '<%= globalConfig.path %>/<%= globalConfig.projectTitle %>/<%= globalConfig.dist %>',
          keepalive: true
        }
      }
    },

    uglify: {
      build_scripts: {
        src: '<%= globalConfig.dev %>/<%= globalConfig.assets %>scripts/scripts.js',
        dest: '<%= globalConfig.dist %>/<%= globalConfig.assets %>scripts/scripts.min.js',
      },
      build_plugins: {
        src: '<%= globalConfig.dev %>/<%= globalConfig.assets %>scripts/plugins/*.js',
        dest: '<%= globalConfig.dist %>/<%= globalConfig.assets %>scripts/plugins.min.js'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: '<%= globalConfig.dev %>/<%= globalConfig.assets %>scripts/plugins/*.js',
        dest: '<%= globalConfig.dist %>/assets/scripts/plugins.js'
      },
      dev: {
        src: '<%= globalConfig.dev %>/<%= globalConfig.assets %>scripts/plugins/*.js',
        dest: '<%= globalConfig.dev %>/scripts/plugins.js'
      },
    },
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

  // Build DIST folder
  grunt.registerTask('build', [
    'sass:build',
    'concat:dist',
    'uglify:build_scripts',
    'uglify:build_plugins',
    'copy:build'
  ]);

  // Clear DIST folder
  grunt.registerTask('clean', [
    'clean:build'
  ]);

  grunt.registerTask('default', [
    'copy:html',
    'concat:dev',
    'watch'
  ]);

  // starts local server http://localhost:9001/src/index.html
  grunt.registerTask('server', [
    'connect:server'
  ]);
};