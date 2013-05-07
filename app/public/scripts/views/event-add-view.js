define([
	'backbone',
	'text!templates/event-add-template.html',
	'bootstrap-datetimepicker'
], function (Backbone, template) {
	'use strict';

	var EventAddView = Backbone.View.extend({

		events: {
			'click #submit': 'addEvent',
			'keypress input': 'addOnEnter'
		},

		template: _.template(template),

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template);

			// Refactor with Array?
			this.titleInput = this.$('#event-title');
			this.dateTimeInput = this.$('#event-datetime');
			this.seatsInput = this.$('#event-seats');
			this.priceInput = this.$('#event-price');
			this.imageInput = this.$('#event-image');
			this.descriptionInput = this.$('#event-description');

			this.dtp = this.$('#dt-picker');

			// Init dateTimePicker
			this.dtp.datetimepicker({
				language: 'en',
				pick12HourFormat: true
			});

			this.delegateEvents();
		},

		addEvent: function (e) {
			e.preventDefault();
			// Iterate through refactored array?
			RTI.Events.create({
				title: this.titleInput.val(),
				dateTime: this.dateTimeInput.val(),
				eventType: this.$('input[name=event-type]:checked').val(),
				seats: this.seatsInput.val(),
				price: this.priceInput.val(),
				image: this.imageInput.val(),
				description: this.descriptionInput.val()
			});
			this.$('form')[0].reset();
			this.trigger('submit');
		},

		addOnEnter: function (e) {
			if (e.keyCode !== 13) {return;}
			this.addEvent(e);
		}

	});

	return EventAddView;
});
