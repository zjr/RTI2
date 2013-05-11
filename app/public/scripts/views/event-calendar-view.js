define(['backbone', 'fullcal'], function (Backbone) {
	'use strict';

	var CalView = Backbone.View.extend({
		initialize: function () {
			this.$el.fullCalendar({

				events: {
					url: '/api/events',
					type: 'GET',
					success: function (e) {
						console.log('success');
					},
					error: function () {
						console.log('AJAX Error: GET /api/events');
					},
					color: '#04c'
				}

			});
		}
	});

	return CalView;
});
