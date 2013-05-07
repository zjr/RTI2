define([
	'backbone',
	'views/event-calendar-view'
], function (Backbone, EventCalendarView) {
	'use strict';

	var GrandRouter = Backbone.Router.extend({
		routes: {
			'event-calendar': 'eventCalendar'
		},

		eventCalendar: function () {
			RTI.activeView = new EventCalendarView({
				el: $('#events')
			});
		}
	});

	return GrandRouter;
});
