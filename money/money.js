// Modal
Members = new Meteor.Collection("Members");

if (Meteor.isClient) {
	Template.main.members = function () {
		return Members.find({}, {sort: {name: -1}});
	};
	
	Template.main.total = function(){
		var sum = 0;
		var members = Members.find({});
		members.forEach(function (member) {
			sum += member.balance;
		});
		return sum;
	};

	Template.main.selected_member = function () {
		var member = Members.findOne(Session.get("selected_member"));
		return member && member.name;
	};
  
	Template.member.selected = function () {
		return Session.equals("selected_member", this._id) ? "selected" : '';
	};
  
	Template.member.events({
		'click': function () {
			Session.set("selected_member", this._id);
		}
	});
	
	Template.main.events({
		'click #test': function () {
			Members.update(Session.get("selected_member"), {$inc: {balance: 100}});
		},
		'click #reduce': function(){
			alert("reduce");
		},
		'click #add': function(){
			alert("add");
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Members.find().count() === 0) {
			Members.insert({name:"Chris", balance:0, email:"zhou.jun@139.com"});
			Members.insert({name:"James", balance:100, email:""});
			Members.insert({name:"River", balance:100, email:""});
			Members.insert({name:"aaa", balance:0, email:""});
			Members.insert({name:"bbb", balance:0, email:""});
			Members.insert({name:"ccc", balance:0, email:""});
		}
	});
}
