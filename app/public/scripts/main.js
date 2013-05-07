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
		'bootstrap-datetimepicker': {
			deps: ['jquery', 'bootstrap'],
			exports: 'jquery'
		}
	},
	paths: {
		jquery: '../components/jquery/jquery',
		backbone: '../components/backbone-amd/backbone',
		underscore: '../components/underscore-amd/underscore',
		bootstrap: 'vendor/bootstrap'
		'bootstrap-datetimepicker': 'vendor/bootstrap-datetimepicker'
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
