define([
	'backbone',
	'text!templates/event-template.html'
], function (Backbone, EventTemplate) {
	'use strict';

	var EventView = Backbone.View.extend({

		tagName: 'li',

		template: _.template(EventTemplate),

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	return EventView;

});
