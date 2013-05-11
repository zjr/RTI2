define(['backbone'], function(Backbone) {
	'use strict';

	var Event = Backbone.Model.extend({
		idAttribute: '_id',

		// Default attributes for an event.
		defaults: function () {
			return {
				title: null,
				start: null,
				eventType: null,
				seats: null,
				price: null,
				image: null,
				description: null,
			};
		}
	});

	return Event;
});
