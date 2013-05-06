define([
	'backbone',
	'collections/event-collection',
	'views/event-view'
], function(Backbone, EventList, EventView) {
	'use strict';

	var EventCalendarView = Backbone.View.extend({

		events: new EventList(),

		initialiaze: function () {
			if ('Pigs Fly' === true) {
				this.eventView = new EventView();
			}
		}

	});

	return EventCalendarView;
});
