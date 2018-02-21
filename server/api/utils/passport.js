// config/passport.js

// load all the things we need
const LocalStrategy   = require('passport-local').Strategy;

// load up the user model
const User            = require('../schemas/user');


// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	// =========================================================================
	// LOCAL SIGNIN ============================================================
	// =========================================================================

	passport.use('local-signin', new LocalStrategy({
		passReqToCallback: true // allows us to pass back the entire request to the callback
	}, function (req, username, password, done) { // callback with username and password from our form
		// find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'local.username': username }, function (err, user) {
			// if there are any errors, return the error before anything else
			if (err) {
				return done(err);
			}

			if (!user) {
				console.log('no-user');
			}

			if (!user.validPassword(password)) {
				return done(err);
			}

			return done(null, user);
		});

	}));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

	passport.use('local-signup', new LocalStrategy({
		passReqToCallback: true // allows us to pass back the entire request to the callback
	}, function (req, username, password, done) {

		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function () {

			// find a user whose username is the same as the forms username
			// we are checking to see if the user trying to login already exists
			User.findOne({ 'local.username': username }, function (err, user) {
				// if there are any errors, return the error
				if (err) {
					return done(err);
				}

				// check to see if theres already a user with that username
				if (user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				else {
					// if there is no user with that username
					// create the user
					const newUser = new User();

					// set the user's local credentials
					newUser.local.username = username;
					newUser.local.password = newUser.generateHash(password);

					// save the user
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}

			});

		});

	}));

};
