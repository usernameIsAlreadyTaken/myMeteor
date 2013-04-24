// Modal
Members = new Meteor.Collection("Members");
Records = new Meteor.Collection("Records");

if (Meteor.isClient) {
	Template.memberTemplate.members = function () {
		return Members.find({}, {sort: {name: -1}});
	};
	
	Template.recordTemplate.records = function () {
		var member = Members.findOne(Session.get("selected_member"));
		if(member == undefined || ''){
			return null;
		} else {
			return Records.find({username: member.name}, {sort: {date: -1}});
		}
	};
	
	Template.memberTemplate.total = function(){
		var sum = 0;
		var members = Members.find({});
		members.forEach(function (member) {
			sum += member.balance;
		});
		return sum;
	};
	
	Template.memberTemplate.selected_name = function () {
		var member = Members.findOne(Session.get("selected_member"));
		return member && member.name;
	};
	
	Template.member.selected = function () {
		return Session.equals("selected_member", this._id) ? "selected" : '';
	};
	
	Template.member.events({
		'click': function () {
			Session.set("selected_member", this._id);
			$("#rightdiv").hide();
		},
		'dblclick': function(){
			Session.set("selected_member", this._id);
			$("#rightdiv").show();
		}
	});
	
	Template.memberTemplate.events({
		'click #fire': function(){
			var member = Members.findOne(Session.get("selected_member"));
			var value = $("#value").val();
			var reason = $("#reason").val();
			if(isNaN(value)){
				alert("must input a number!");
			} else {
				var number = parseInt(value);
				Members.update(Session.get("selected_member"), {$inc: {balance: number}});
				Records.insert({username:member.name, money:number, reason:reason, date:new Date().toLocaleString()});
				Meteor.call(
					'sendEmail',
					member.email,
					'moneyApp@meteor.com',
					'sent from money contral App',
					'Your money account has been increased ' + value + ' RMB.' + '\n' + new Date().toLocaleString()
				);
			}
		},
		'click #newMember': function(){
			$("#addMemberTr").show();
		},
		'click #delMember': function(){
			var member = Members.findOne(Session.get("selected_member"));
			if(member == undefined || ''){
				alert("Please select a user.");
			} else {
				if(confirm("Would you like to del user " + member.name + '?')){
					Members.remove(Session.get("selected_member"));
				}
			}
		},
		'click #addMember': function(){
			var name = $("#name").val();
			var email = $("#email").val();
			if(name.length >= 4 && name.length <= 16){
				Members.insert({name:name, balance:0, email:email});
				$("#addMemberTr").hide();
			} else {
				alert("user name should be 4-16 character");
			}
		}
	});
}

if (Meteor.isServer) {
	Meteor.methods({
		sendEmail: function(to, from, subject, text){
			Email.send({to:to, from:from, subject:subject, text:text});
		}
	});
}
