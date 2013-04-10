books = new Meteor.Collection("books");

if (Meteor.isClient) {
	Template.book.booklist = function () {
		return books.find({});
	};
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		if (books.find().count() === 0) {
			books.insert({id:1, name:"chris' story", author:"chris", description:"", status:"available"});
		}
	});
}
