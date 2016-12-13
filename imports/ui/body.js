import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
});

Template.body.helpers({
	tasks() {
		const instance = Template.instance();
		// when hide completed checked, do that
		if(instance.state.get('hideCompleted')) {
			return Tasks.find({ checked: { $ne: true } },
							  { sort: { createdAt: -1 } });
		}
		//otherwise return them all
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
	incompleteCount() {
		return Tasks.find({ checked: { $ne: true } }).count();
	}
});

Template.body.events({
	'submit .new-task'(event) {
		// prevents browser from submitting
		event.preventDefault();

		// grab value from input
		const target = event.target;
		const text = target.text.value;

		// now insert the task into the collection
		Tasks.insert({
			text,
			// set as current time
			createdAt: new Date(),
		});

		// clear
		target.text.value = '';
	},
	'change .hide-completed input'(event, instance) {
		instance.state.set('hideCompleted', event.target.checked);
	},
});