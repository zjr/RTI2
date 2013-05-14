define(['backbone', 'fullcal', 'scrollto'], function (Backbone) {
	'use strict';

	var CalView = Backbone.View.extend({
		initialize: function () {
			var eList = $('#event-list');

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

				eventClick: function (calEvent) {
					// Would be nice to eventually move this
					// into an events router and use pushState.
					var id = calEvent._id;
					$('#event-list').scrollTo($('#' + id), '1s');

					console.log(this, arguments);
				},

				dayClick: function () {
					console.log(this, arguments);
				}

			});
		}
	});

	return CalView;
});
