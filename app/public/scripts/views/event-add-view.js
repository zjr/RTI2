define([
	'backbone',
	'text!templates/event-add-template.html',
	'datetimepicker'
], function (Backbone, template) {
	'use strict';

	var EventAddView = Backbone.View.extend({

		events: {
			'click #submit': 'addEvent',
			'keypress input': 'addOnEnter',
		},

		template: _.template(template),

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.append(this.template);

			// because I can't manage to get this...
			// working in the parent view.
			$('#add').on('hide', _.bind(function () {
				this.trigger('closeModal');
			}, this));

			// Refactor with Array?
			this.titleInput = this.$('#event-title');
			this.dateTimeInput = this.$('#event-datetime');
			this.seatsInput = this.$('#event-seats');
			this.priceInput = this.$('#event-price');
			this.imageInput = this.$('#event-image');
			this.descriptionInput = this.$('#event-description');

			this.initDateTimePicker();
		},

		unbindEvents: function () {
			this.undelegateEvents();
		},

		addEvent: function (e) {
			e.preventDefault();
			// Iterate through refactored array?
			RTI.Events.create({
				title: this.titleInput.val(),
				start: new Date(this.dateTimeInput.val()),
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
		},

		initDateTimePicker: function () {
			var nooned = function () {
				var d = new Date();
				return new Date(d.setHours(12, 0, 0, 0));
			};
			this.dtp = this.$('#dt-picker');
			this.dtp.datetimepicker({
				format: 'MM d, yyyy H:ii P',
				autoclose: true,
				minuteStep: 15,
				showMeridian: true,
				pickerPosition: 'bottom-left',
				language: 'en',
				initialDate: nooned()
			}).on(
				'hide', _.bind(function () {
					_.defer(_.bind(this.delegateEvents, this));
				}, this)
			);
		}

	});

	return EventAddView;
});
