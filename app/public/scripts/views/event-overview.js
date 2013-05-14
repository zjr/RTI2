define([
	'backbone',
	'collections/event-collection',
	'views/event-view',
	'views/event-add-view',
	'views/event-calendar-view',
], function(Backbone, EventList, EventView, EventAddView, CalView) {
	'use strict';

	var EventCalendarView = Backbone.View.extend({

		events: {
			'show #add': 'makeAddModal',
			'shown #add': 'shownModal',
			'hidden #add': 'clearAddModal',
		},

		initialize: function () {
			// Make Events, the new Event collection object.
			RTI.Events = RTI.Events || new EventList();

			// Compare by date, makes sense for events, no?
			RTI.Events.comparator = 'start';

			RTI.Events.on('sync', this.addAll, this);
			RTI.Events.on('all', this.render, this);

			RTI.Events.fetch();

			this.addMod = this.$('#add');

			this.bindEvents();
			this.render();

			this.calView = new CalView({
				el: this.$('#calendar')
			});
		},

		bindEvents: function () {
			$(document).on('keydown', $.proxy(this.keyboard, this));
			this.delegateEvents();
		},

		unbindEvents: function () {
			$(document).off('keydown', $.proxy(this.keyboard, this));
			this.undelegateEvents();
		},

		render: function (e) {
			console.log('Events Event: ' + e);
		},

		addOne: function (eventModel) {
			var eventView = new EventView({
				model: eventModel
			});
			this.$('#event-list').append(eventView.render().el);
		},

		reSync: function () {
			console.log('reSync');
			this.$('#event-list').empty();
			_.defer(RTI.Events.fetch);
		},

		addAll: function () {
			// Because of this I might be able to take
			// the sort out of the API code.
			_.each(RTI.Events.models, this.addOne, this);
			_.once(RTI.Events.on('add', this.reSync, this));
		},

		makeAddModal: function () {
			// Bind Add Modal events and then
			// ...return if Add Modal already exists.
			if (this.addModalView) {
				this.addModalView.delegateEvents();
				return;
			}

			// Create new Add Modal.
			this.addModalView = new EventAddView({
				el: this.addMod
			});

			// Start listening to Add form submit.
			this.listenTo(this.addModalView, 'closeModal', this.eBindSwitch);
			this.listenTo(this.addModalView, 'submit', this.hideAddModal);
		},

		// Switches ye bindings back to this view!
		eBindSwitch: function () {
			// Unbind the Add Modal's events and...
			// rebind this view's events.
			this.addModalView.undelegateEvents();
			this.bindEvents();
		},

		hideAddModal: function () {
			this.eBindSwitch();
			this.addMod.modal('hide');
		},

		showAddModal: function () {
			this.addMod.modal('show');
		},

		// Fires when Add Modal is fully shown.
		shownModal: function () {
			// Focus first input.
			$('#event-title').focus();
			// Unbind Cal View events so as to not interfere...
			// ...with Event Add View events.
			this.unbindEvents();
		},

		// Shortcut: 'N' key opens Add Modal.
		keyboard: function (e) {
			if (e.keyCode === 78) {
				// Make should run the event bindings and...
				// show actually opens the modal.
				this.makeAddModal();
				this.showAddModal();
			} else {
				return/* console.log(e.keyCode) */;
			}
		}

	});

	return EventCalendarView;
});
