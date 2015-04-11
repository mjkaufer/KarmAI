//interfacing with controls
TempStats = new Meteor.Collection(null); //temporary, non-persistent collection

Session.set("best", null);
Session.set("subreddit", null);

var top = 5; //amount of top datasets to show

Template.controls.helpers({
    numbers: function(){
        var nums = [];

        for(var i = 1; i <= 10; i++)
            nums.push(i*100);

        return nums;
    }
})

Template.controls.events({
    'click #ai': function() {
        //run diagnostics
        Session.set("best", null);
        var subreddit = $('#subreddit').val();
        var time = $('#time').val();
        var amount = parseInt($('#amount').val()) / 100;

        console.log(subreddit, time, amount);

        Session.set("subreddit", subreddit);

        getPosts(subreddit, amount, time, [], function(posts) {
            console.log("Posts");
            console.log(posts)
            parseData(posts)

            console.log("All done!")
            console.log(TempStats.find({}, {
                sort: {
                    freq: -1
                }
            }).fetch());
            window.TempStats = TempStats

            Session.set("best", {
                subreddit: subreddit,
                times: TempStats.find({}, {
                    sort: {
                        freq: -1
                    }
                }).fetch().slice(0, top)
            })

        });


    }
});