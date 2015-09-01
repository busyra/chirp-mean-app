var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:', user.username);
		//return the unique id for the user
		done(null, user._id);
	});
	//Desieralize user will call with the unique id provided by serializeuser
	passport.deserializeUser(function(id, done) {
		//return user object back
		User.findById(id, function(err, user){
			console.log('deserializing user: ', user.username);
		});
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done){
			//if user exists
			User.findOne({'username' : username},
				function(err,user){
					if(err){
						return done(err);
					}
					if(!user){
						//if there is no user with this user name
						console.log('User not found with username '+username);
						return done(null, false);
					}
					if(!isValidPassword(user, password)){
						//wrong password
						return done('incorrect password', false);
					}
					return done(null, user);
			});
		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {
			User.findOne({'username' : username}, function(err, user){
				if(err){
					console.log('error in signup ' + err);
					return done(err);
				}
				if(user){
					//we have already signed this user up
					return done('user already taken', false);
				}
				var newUser = new User();
				newUser.username = username;
				newUser.password = createHash(password);
				newUser.save(function(err){
					if(err){
						console.log('Error in Saving user: ' +err);
					}
					console.log('successfully signed up user' + newUser.username);
					return done(null, newUser);
				});
			});

		})
	);

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
