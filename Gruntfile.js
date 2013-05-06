'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist',
		pub: 'app/public'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			// No grunt Sass watcher until someone has the time
			// to add support for sourcemaps.
			// compass: {
			// 	files: ['<%= yeoman.app %>/sass/{,*/}*.{scss,sass}'],
			// 	tasks: ['compass:server']
			// },
			livereload: {
				files: [
					'<%= yeoman.app %>/views/{,*/}*.haml',
					'<%= yeoman.pub %>/styles/{,*/}*.css',
					'<%= yeoman.pub %>/scripts/{,*/}*.js',
					'<%= yeoman.pub %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
				],
				tasks: ['livereload']
			}
		},
		connect: {
			options: {
				port: 9000,
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '<%= yeoman.pub %>')
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '<%= yeoman.pub %>'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, 'dist')
						];
					}
				}
			}
		},
		clean: {
			dist: ['<%= yeoman.pub %>/{styles}', '<%= yeoman.dist %>/*'],
			pub: '<%= yeoman.pub %>/{styles}'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.pub %>/scripts/{,*/}*.js',
				'!<%= yeoman.pub %>/scripts/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.options.port %>/']
				}
			}
		},
		// No grunt Sass watcher until someone has the time
		// to add support for sourcemaps.
		// compass: {
		// 	options: {
		// 		sassDir: '<%= yeoman.app %>/sass',
		// 		cssDir: '<%= yeoman.pub %>/styles',
		// 		imagesDir: '<%= yeoman.pub %>/images',
		// 		javascriptsDir: '<%= yeoman.pub %>/scripts',
		// 		fontsDir: '<%= yeoman.pub %>/fonts',
		// 		importPath: '<%= yeoman.pub %>/components',
		// 		relativeAssets: true
		// 	},
		// 	dist: {
		// 		options: {
		// 			cssDir: '<%= yeoman.dist %>/public/styles',
		// 			outputStyle: 'compressed'
		// 		}
		// 	},
		// 	server: {
		// 		options: {
		// 			debugInfo: true
		// 		}
		// 	}
		// },
		requirejs: {
			dist: {
				options: {
					mainConfigFile: '<%= yeoman.pub %>/scripts/main.js',
					baseUrl: 'app/public/scripts/',
					name: 'main',
					out: '<%= yeoman.dist %>/public/scripts/main.js',
					// optimize: 'uglify'
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/public/styles/main.css': [
						'<%= yeoman.pub %>/styles/{,*/}*.css'
					]
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'views/{,*/}*.haml',
						'*.{ico,txt,rb,html}',
						'.htaccess',
						'public/components/**',
						'public/fonts/**',
						'public/images/**'
					]
				}]
			}
		},
		bower: {
			all: {
				rjsConfig: '<%= yeoman.pub %>/scripts/main.js'
			}
		}
	});

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:pub',
			// 'compass:server',
			'livereload-start',
			// 'connect:livereload'
			'watch'
		]);
	});

	grunt.registerTask('test', [
		// 'compass',
		'connect:test',
		'mocha'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		// 'compass:dist',
		'requirejs',
		'cssmin',
		'copy:dist',
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);
};
