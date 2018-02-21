// app/models/user.js
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String
	},
	votes: [{
		champions: Array,
		direction: Number
	}]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
