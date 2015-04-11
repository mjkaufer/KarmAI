//interfacing with controls
TempStats = new Meteor.Collection(null);//temporary, non-persistent collection

Session.set("best", null);

Template.controls.events({
	'click #ai': function () {
		//run diagnostics

		var subreddit = $('#subreddit').val();

		getPosts(subreddit, 2, [], function(posts){
			console.log("Posts");
			console.log(posts)
			parseData(posts)

			console.log("All done!")
			console.log(TempStats.find({}, {sort: {freq: -1}}).fetch());
			window.TempStats = TempStats

			Session.set("best",{
				subreddit: subreddit,
				times: posts.slice(0,4)
			})

		});


	}
});