define(['backbone', 'bootstrap-datepicker'], function (Backbone) {
	'use strict';

	var CalView = Backbone.View.extend({
		initialize: function () {
			this.$el.datepicker();
		}
	});

	return CalView;
});
