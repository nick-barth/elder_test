const mongoose = require('mongoose');

const champSchema = new mongoose.Schema({
	name: String,
	id: Number,
	tagline: String,
	img: String,
	stats: {
		health: {
			start: Number,
			max: Number,
			stars: Number
		},
		armor: {
			start: Number,
			max: Number,
			stars: Number
		},
		speed: {
			start: Number,
			max: Number,
			stars: Number
		}
	},
	ability: {
		name: String,
		desc: String
	},
	tips: [{
		tip: String,
		up: Number,
		down: Number
	}]
});

const Champ = mongoose.model('Champ', champSchema);

module.exports = {
	Champ: Champ
};
