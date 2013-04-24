if (Meteor.isClient) {
	Template.email.events({
		'click #btn': function(){
			Meteor.call('sendEmail', $('#email').val());
			Session.set('done', true);
		}
	});
	
	Template.email.done = function(){
		return Session.equals('done', true);
	}
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		
	});
	Meteor.methods({
		sendEmail: function(to, from, subject, text){
			// Let other method calls from the same client start running,
			// without waiting for the email sending to complete.
			this.unblock();

			Email.send({
				to: to,
				from: from,
				subject: subject,
				text: text
			});
		}
	});
}
