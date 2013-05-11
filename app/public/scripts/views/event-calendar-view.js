define(['backbone', 'fullcal'], function (Backbone) {
	'use strict';

	var CalView = Backbone.View.extend({
		initialize: function () {
			this.$el.fullCalendar({});
		}
	});

	return CalView;
});
