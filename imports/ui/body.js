import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
	tasks() {
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
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
	}
})