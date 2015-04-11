//outputting the results

Template.results.helpers({
    hasData: function() {
        return Session.get("best") !== null;
    },
    data: function() {
        return Session.get("best");//display a max of 4 posts
    },
    format: function(data) {
        var hour = data.localHour;
        var day = data.localDay;
        return day + " at " + (hour % 12) + " " + (hour < 12 ? "AM" : "PM");
    },
    subreddit: function() {
        return Session.get("subreddit");
    },
    stats: function(n){
    	return Math.round(n / Session.get("count") * 10000) / 100 + "%"
    },
    trim: function(data){
    	return data.slice(0,4);
    }
});