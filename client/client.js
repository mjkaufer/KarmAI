Template.controls.events({
  'click #ai': function () {
    //run diagnostics

    var subreddit = $('#subreddit').val();

    reddit.top(subreddit)
      .limit(100)
      .t('month')
      .fetch(function(res){

        console.log(res)

      });

  }
});