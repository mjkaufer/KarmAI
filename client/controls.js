//interfacing with controls
TempStats = new Meteor.Collection(null); //temporary, non-persistent collection

Session.set("best", null);
Session.set("subreddit", "askReddit");
Session.set("count", 100);
Session.set("dayAndTime", true);

var top = 5; //amount of top datasets to show

Template.controls.helpers({
    numbers: function() {
        var nums = [];

        for (var i = 1; i <= 10; i++)
            nums.push(i * 100);

        return nums;
    }
})

Template.controls.events({
    'click #ai': function() {
        //run diagnostics
        info();
    },
    'keyup #subreddit': function(e) {
        if (e.which == 13)
            info();
    },
    'submit #form': function(e) {
        e.preventDefault();
    }
});

function info() {
    var subreddit = $('#subreddit').val() || "askReddit";
    $('#subreddit').val(subreddit); //if the user didn't set a value, fills the input with the default val
    var time = $('#time').val();
    var amount = parseInt($('#amount').val()) / 100;
    var dayAndTime = $('#grouping').val() == "true";
    Session.set("dayAndTime", dayAndTime);

    Session.set("count", parseInt($('#amount').val()));
    Session.set("best", null);
    Session.set("subreddit", subreddit);

    getPosts(subreddit, amount, time, [], function(posts) {
        // console.log("Posts");
        // console.log(posts)
        parseData(posts)

        // console.log("All done!")
        // console.log(TempStats.find({}, {
        //     sort: {
        //         freq: -1
        //     }
        // }).fetch());

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