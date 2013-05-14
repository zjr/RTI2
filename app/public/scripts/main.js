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
		datetimepicker: {
			deps: ['jquery', 'bootstrap'],
			exports: 'jquery'
		},
		fullcal: {
			deps: ['jquery'],
			exports: 'jquery'
		},
		scrollto: {
			deps: ['jquery'],
			exports: 'jquery'
		}
	},
	paths: {
		jquery: '../components/jquery/jquery',
		backbone: '../components/backbone-amd/backbone',
		underscore: '../components/underscore-amd/underscore',
		text: '../components/requirejs-text/text',
		bootstrap: 'vendor/bootstrap',
		datetimepicker: 'vendor/bootstrap-datetimepicker-2',
		fullcal: '../components/fullcalendar/fullcalendar',
		scrollto: '../components/jquery.scrollTo/jquery.scrollTo'
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
