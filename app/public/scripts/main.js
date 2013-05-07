'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		}
	},
	paths: {
		jquery: '../components/jquery/jquery',
		backbone: '../components/backbone-amd/backbone',
		underscore: '../components/underscore-amd/underscore',
		bootstrap: 'vendor/bootstrap'
	}
});

require([
	'backbone',
	'routes/grand-router'
], function (Backbone, GrandRouter) {

	window.RTI = {};

	new GrandRouter();

	Backbone.history.start();
});