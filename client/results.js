//outputting the results

Template.results.helpers({
    hasData: function() {
        return Session.get("best") !== null;
    },
    data: function() {
        return Session.get("best"); //display a max of 4 posts
    },
    format: function(data) {
        console.log(data)

        var hour = data.localHour;

        var fhour;

        if (hour % 12 == 0)
            fhour = 12;
        else
            fhour = hour % 12;

        var timeString = " at " + fhour + " " + (hour < 12 ? "AM" : "PM");

        if(!data.localDay)
            return timeString;

        var day = data.localDay;
        
        return "on " + day + timeString;
    },
    subreddit: function() {
        return Session.get("subreddit");
    },
    stats: function(n) {
        return Math.round(n / Session.get("count") * 10000) / 100 + "%"
    },
    trim: function(data) {
        return data.slice(0, 4);
    },
    scroll: function() { //scrolls to the template
        var i = setInterval(function() {
            if ($('#results')) {
                $('html, body').animate({
                    scrollTop: $("#results").offset().top
                }, 250);
                clearInterval(i);
            }
        }, 50)

    }
});