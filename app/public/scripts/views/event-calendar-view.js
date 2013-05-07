define([
	'backbone',
	'collections/event-collection',
	'views/event-view',
	'views/event-add-view',
	'bootstrap-datepicker'
], function(Backbone, EventList, EventView, EventAddView) {
	'use strict';

	var EventCalendarView = Backbone.View.extend({

		events: {
			'show #add': 'makeAddModal',
			'shown #add': 'shownModal',
			'hidden #add': 'clearAddModal',
		},

		initialize: function () {
			RTI.Events = RTI.Events || new EventList();

			RTI.Events.on('add', this.addOne, this);
			RTI.Events.on('reset', this.addAll, this);
			RTI.Events.on('all', this.render, this);

			RTI.Events.fetch();

			this.addMod = this.$('#add');

			this.render();
		},

		bindKeys: function () {
			$(document).on('keydown', $.proxy(this.keyboard, this));
		},

		unbindKeys: function () {
			$(document).off('keydown', $.proxy(this.keyboard, this));
		},

		render: function (e) {
			console.log('Events Event: ' + e);
			this.bindKeys();
			this.delegateEvents();
		},

		addOne: function (eventModel) {
			var eventView = new EventView({
				model: eventModel
			});
			this.$('#event-list').append(eventView.render().el);
		},

		addAll: function () {
			// I don't think this function is actually necessary at the moment.
			// RTI.Events.each();
			console.log('ADDALL CALLED');
		},

		makeAddModal: function () {
			this.unbindKeys();
			if (this.addModalView) {
				this.addModalView.render();
				return;
			}
			this.addModalView = new EventAddView({
				el: this.addMod
			});
			this.listenTo(this.addModalView, 'submit', this.clearAddModal);
		},

		clearAddModal: function () {
			this.addMod.modal('hide');
			this.addModalView.undelegateEvents();
			this.render();
		},

		showAddModal: function () {
			this.addMod.modal('show');
		},

		shownModal: function () {
			// Focus first input.
			$('#event-title').focus();
		},

		keyboard: function (e) {
			if (e.keyCode === 78) {
				this.makeAddModal();
				this.showAddModal();
			} else {
				return/* console.log(e.keyCode) */;
			}
		}

	});

	return EventCalendarView;
});
