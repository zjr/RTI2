define(['backbone', 'fullcal'], function (Backbone) {
	'use strict';

	var CalView = Backbone.View.extend({
		initialize: function () {
			this.$el.fullCalendar({

				// This means I'm actually making two calls
				// to the database for the same collection, this
				// is of course bad I should try and avoid it.
				events: {
					url: '/api/events',
					type: 'GET',
					success: function (e) {
						console.log('success', e);
					},
					error: function () {
						console.log('AJAX Error: GET /api/events');
					},
					allDayDefault: false,
					color: '#04c'
				},

				dayClick: function () {
					console.log(this, arguments);
				},

				eventClick: function () {
					console.log(this, arguments);
				}

			});
		}
	});

	return CalView;
});
