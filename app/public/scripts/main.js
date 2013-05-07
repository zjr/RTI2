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
		},
		'bootstrap-datepicker': {
			deps: ['jquery', 'bootstrap'],
			exports: 'jquery'
		},
		'bootstrap-datetimepicker': {
			deps: ['jquery', 'bootstrap'],
			exports: 'jquery'
		}
	},
	paths: {
		jquery: '../components/jquery/jquery',
		backbone: '../components/backbone-amd/backbone',
		underscore: '../components/underscore-amd/underscore',
		text: '../components/requirejs-text/text',
		bootstrap: 'vendor/bootstrap',
		'bootstrap-datepicker': '../components/bootstrap-datepicker/js/bootstrap-datepicker',
		'bootstrap-datetimepicker': 'vendor/bootstrap-datetimepicker'
	}
});

require([
	'backbone',
	'routes/grand-router'
], function (Backbone, GrandRouter) {

	window.RTI = {};

	new GrandRouter();

	Backbone.history.start({pushState: true});
});
