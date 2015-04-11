//outputting the results

Template.results.helpers({
	hasData: function(){
		return Session.get("best") !== null;
	},
	data: function(){
		return Session.get("best");
	},
	format: function(data){
		var hour = data.localHour;
		var day = data.localDay;
		return day + ", at " + (hour % 12) + " " + (hour < 12 ? "AM" : "PM");
	},
	subreddit: function(){
		return Session.get("subreddit");
	}
});