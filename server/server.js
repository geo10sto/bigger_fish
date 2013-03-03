var config = {
	facebook: {
		appId: 338495066272125,
		secret: 'a093fcf9db76103bd46873840d3534f6'
	}
}
if (Meteor.isServer) {

	Meteor.startup(function () {
		// code to run on server at startup
	});

	Accounts.loginServiceConfiguration.remove({service: "facebook"});
	Accounts.loginServiceConfiguration.insert({
		service: "facebook",
		appId: config.facebook.appId,
		secret: config.facebook.secret
	});

	Accounts.onCreateUser(function(options, user) {
		console.error(options);
		if (options.profile) {
			options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
			user.profile = options.profile;
		}
		console.error(options.profile.picture);
		return user;
	});

}
