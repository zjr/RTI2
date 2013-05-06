define(['backbone', 'models/event-model'], function(Backbone, Event) {
	'use strict';

	var EventList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: Event,

		// Save all events under the `"events"` namespace.
		url: '/api/events'

	});

	return EventList;
});
