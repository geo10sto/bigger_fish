if (Meteor.isClient) {
    ;(function() {

        Template.hello.greeting = function () {
            return "Welcome to Bigger Fish";
        }

        Template.fbconnect.connect = function () {
            window.fbAsyncInit = function() {
                FB.init({
                    appId   : '338495066272125', // App ID
                    status  : true, // check login status
                    cookies: true, // enable cookies to allow the server to access the session
                    XFBML: true  // parse XFBML
                });
            };
        };

        Template.hello.events({
            'click input' : function () {
                // template data, if any, is available in 'this'
                console.log("You pressed the button");
            }
        });

    }).call(this);
}