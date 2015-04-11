//all of the functions used to collect & analyze subreddit data

dayNumToName = function(n) { //converts the number of the day of the week to its string representation, e.g. 0->Sunday, 1->Monday,...
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][n]
}

getPosts = function(subreddit, n, period, posts, callback) { //returns the top n*100 posts of subreddit

    var count = n;

    var search = reddit
        .top(subreddit)
        .limit(100)
        .t(period);

    if (posts.length > 0){ //if there's already data in our post list, we start our search after the last piece of data
    	console.log("*---")
    	console.log(posts)
    	console.log(posts.slice(-1));
    	console.log(posts.slice(-1)[0]);
        search = search.after(posts.slice(-1)[0].data.name)
        console.log("~---")
	}

    search.fetch(function(res) {

        posts = posts.concat(res.data.children);

        count -= 1;

        if (count == 0) {
            return callback(posts);
        }

        getPosts(subreddit, count, period, posts, function(posts) {
            callback(posts);
        })

    });

}

parseData = function(posts) {
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i].data;

        if (post.distinguished !== null) //so mod posts, etc., aren't factored
            continue;

        var date = new Date(0);

        date.setUTCSeconds(post.created_utc); //reddit doesn't use the normal JS date things, so we have to make dates like this

        var hours = date.getHours();
        var day = dayNumToName(date.getDay());

        if (TempStats.findOne({
            localHour: hours,
            localDay: day
        })) { //if there is already some entry on the same day

            TempStats.update({
                localHour: hours,
                localDay: day
            }, {
                $inc: {
                    freq: 1
                }, //todo, get rid of updating and give each post its own thing, so we can sort by more stuff - also means we have to find a way to do frequency mapping
                $push: {
                    examples: {
                        url: post.permalink,
                        title: post.title
                    }
                }
            })

        } else { //new entry

            TempStats.insert({
                localHour: hours,
                localDay: day,
                freq: 1,
                examples: [{
                    url: post.permalink,
                    title: post.title
                }]
            });

        }

    }
}