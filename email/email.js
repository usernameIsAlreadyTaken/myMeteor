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
		sendEmail: function(email){
			Email.send({
				to: email,
				from: 'zhoujun9633@gmail.com',
				subject: 'email from Chris',
				text: 'Best wishes for you~'
			});
		}
	});
}
