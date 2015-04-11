//outputting the results

Template.results.helpers({
	hasData: function(){
		return Session.get("best") !== null;
	}
});