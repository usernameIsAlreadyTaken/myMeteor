// Modal
Members = new Meteor.Collection("Members");

if (Meteor.isClient) {
	Template.Members.MemberList = function () {
		return Members.find({}, {sort: {id:1}});
	};
	
	Template.Members.Total = function(){
		var sum = 0;
		var members = Members.find({});
		return sum;
	};
	
	Template.Members.events({
		'click #add': function () {
			if($("#newName").val() == ""){
				alert("name can not be empty!");
				return;
			}
			newName = $("#newName").val();
			random = (Math.floor(Random.fraction()*11)*1000) + (Math.floor(Random.fraction()*10)*100);
			count = Members.find().count();
			newId = random + count;
			Members.insert({id:newId, name:newName, balance:0, record:[]});
			$("#newName").val("");
		},
		'click #del': function () {
			var selectStrArr = [];
			$("#menbersTable input:checked").each(function(){
				name = $(this).attr("name");
				selectStrArr.push(name);
			});
			if(confirm("Do you wanna delete " + selectStrArr + " ?")){
				$("#menbersTable input:checked").each(function(){
					id = $(this).attr("id");
					Members.remove(id);
				});
			}
		},
		'click #launch': function () {
			money = $("#money").val();
			reason = $("#reason").val();
			$("#menbersTable input:checked").each(function(){
				id = $(this).attr("id");
				//Members.update({'id':id}, {$set:{'balance':100}});
			});
			$("#money").val("");
			$("#reason").val("");
		},
		'click .infoBtn': function () {
			id = $(this).attr("id");
			member = Members.findOne({id:id});
			alert(member.record);
		},
		'click #test': function () {
			Members.remove({});
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		Members.remove({});
		//now = new date();
		recordStr = 30+"/lunch/";
		Members.insert({id:1, name:"James", balance:100, record:recordStr});
		Members.insert({id:2, name:"River", balance:0, record:""});
		Members.insert({id:3, name:"Oven", balance:0, record:""});
	});
}
