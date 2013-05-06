define(['backbone'], function(Backbone) {
	'use strict';

	var Event = Backbone.Model.extend({
		idAttribute: '_id',

		// Default attributes for an event.
		defaults: function () {
			return {
				title: null,
				eventType: null,
				dateTime: null,
				seats: null,
				description: null
			};
		}
	});

	return Event;
});
