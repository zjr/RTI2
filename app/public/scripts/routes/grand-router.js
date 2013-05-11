define([
	'backbone',
	'views/event-overview'
], function (Backbone, EventOverview) {
	'use strict';

	var GrandRouter = Backbone.Router.extend({
		routes: {
			'events': 'eventsInit'
		},

		eventsInit: function () {
			RTI.activeView = new EventOverview({
				el: $('#events')
			});
		}
	});

	return GrandRouter;
});
