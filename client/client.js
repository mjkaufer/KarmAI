var TempStats = new Meteor.Collection(null);//temporary, non-persistent collection

Template.controls.events({
  'click #ai': function () {
    //run diagnostics

    var subreddit = $('#subreddit').val();

    reddit.top(subreddit)
      .limit(100)
      .t('month')
      .fetch(function(res){

        // console.log(res)
        var posts = res.data.children;

        for(var i = 0; i < posts.length; i++){
          var post = posts[i].data;

          if(post.distinguished !== null)//so mod posts, etc., aren't factored
            continue;

          var date = new Date(0);

          date.setUTCSeconds(post.created_utc);//reddit doesn't use the normal JS date things, so we have to make dates like this

          var hours = date.getHours();
          var day = dayNumToName(date.getDay());

          if(TempStats.findOne({
            localHour: hours,
            localDay: day
          })){//if there is already some entry on the same day

            TempStats.update({
              localHour: hours,
              localDay: day
            },{
              $inc: {freq: 1},
              $push: {examples: post.url}
            })

          } else {//new entry

            TempStats.insert({
              localHour: hours,
              localDay: day,
              freq: 1,
              examples: [post.url]
            });

          }



        }

        console.log("All done!")
        console.log(TempStats.find({}, {sort: {freq: -1}}).fetch());
        window.TempStats = TempStats

      });

  }
});

function dayNumToName(n){//converts the number of the day of the week to its string representation, e.g. 0->Sunday, 1->Monday,...
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][n]
}