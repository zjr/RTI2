define([
	'backbone',
	'views/event-overview'
], function (Backbone, EventOverview) {
	'use strict';

	var GrandRouter = Backbone.Router.extend({
		routes: {
			'event-calendar': 'eventCalendar'
		},

		eventCalendar: function () {
			RTI.activeView = new EventOverview({
				el: $('#events')
			});
		}
	});

	return GrandRouter;
});
