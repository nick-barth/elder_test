//Mongoose
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

//Schemas
const champ = require('./schemas/champ.js').Champ;
const matchup = require('./schemas/matchup.js').Matchup;

//connect to database
mongoose.connect('mongodb://nick:mongoPassword@45.79.217.226/quakechamp');


// GET champion
exports.getChampion = function (req, res) {
	const name = req.query.name;

	champ.findOne({ name: new RegExp(name, 'i') }, function (err, champ) {
		if (champ) {
			res.json(champ);
		}
		else {
			res.status(500);
			res.json({ 'error': true });
		}
	});
};

// GET champions
exports.getChampions = function (req, res) {
	champ.find({}, 'name tagline', function (err, champs) {
		res.json(champs);
	});
};

// GET matchups
exports.getMatchups = function (req, res) {
	const name = req.query.name;

	matchup.find({ 'champions.name': new RegExp(name, 'i') }, function (err, matchups) {
		champ.find({}, 'name tagline', function (err, champs) {
			if ((champs.length - 1) !== matchups.length) {
				const done = matchups.reduce((acc, mup) => {
					const doneChamp = mup.champions.filter(c => c.name !== name);

					return acc.concat(doneChamp[0].name);
				}, []);

				const matchupsToCreate = champs.filter(champ => {
					return ((champ.name !== name) && !done.includes(champ.name));
				});

				matchupsToCreate.forEach(opp => {
					const newMatchup = new matchup({
						champions: [
							{
								name: opp.name,
								up: 0,
								down: 0,
								tips: []
							},
							{
								name: name,
								up: 0,
								down: 0,
								tips: []
							}
						]
					});

					newMatchup.save();
				});


			}
		});
		if (matchups) {
			res.json(matchups);
		}
		else {
			res.status(500);
			res.json({ 'error': true });
		}

	});
};

// GET matchups
exports.getMatchup = function (req, res) {
	const champ1 = req.query.champ1;
	const champ2 = req.query.champ2;

	matchup.find({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, function (err, matchups) {
		if (err) {
			return err;
		}
		else if (matchups.length !== 0) {
			res.json(matchups[0]);
		}
		else {
			champ.findOne({ name: new RegExp(champ1, 'i') }, function (err, doc) {
				if (doc) {
					champ.findOne({ name: new RegExp(champ2, 'i') }, function (err, doc2) {
						if (doc2) {
							const newMatchup = new matchup({
								champions: [
									{
										name: champ1,
										up: 0,
										down: 0,
										tips: []
									},
									{
										name: champ2,
										up: 0,
										down: 0,
										tips: []
									}
								]
							});

							newMatchup.save(function (err) {
								res.json(newMatchup);
							});
						}
					});
				}
			});
		}

	});
};

// POST champ tip
exports.addChampTip = function (req, res) {
	const name = req.body.champ;
	const tip = req.body.tip;

	if (tip === '' || tip === null) {
		res.status(500).send('ERROR: EMPTY TIP');
		return;
	}

	champ.findOne({ name: new RegExp(name, 'i') }, function (err, champ) {
		champ.tips.push({ tip: tip, up: 0, down: 0 });
		champ.save();
		res.json(champ);
	});
};

// Post Updating champ tip
exports.updateChampTip = function (req, res) {
	const name = req.body.name;
	const tip = req.body.tip;
	const direction = req.body.direction;

	if (direction === 1) {
		champ.findOneAndUpdate({ name: new RegExp(name, 'i'), 'tips.tip': tip }, {  $inc: { 'tips.$.up': 1 } }, { new: true }, function (err, docs) {
			res.json(docs);
		});
	}
	else {
		champ.findOneAndUpdate({ name: new RegExp(name, 'i'), 'tips.tip': tip }, {  $inc: { 'tips.$.down': 1 } }, { new: true }, function (err, docs) {
			res.json(docs);
		});
	}
};

// POST updating champion matchup
exports.updateChampMatchup = function (req, res) {
	const champ1 = req.query.champ1;
	const champ2 = req.query.champ2;
	const update = req.query.update;

	matchup.findOne({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, function (err, matchups) {
		const indexOf =  matchups.champions.findIndex(x => x.name === update.name);
		const set = {};

		if (update.up) {
			set['champions.' + indexOf + '.up'] = update.up;
		}
		else {
			set['champions.' + indexOf + '.down'] = update.down;
		}

		matchup.findOneAndUpdate({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, { $set: set }, function (err, docs) {
			if (err) {
				throw err;
			}

			matchup.find({ 'champions.name': new RegExp(champ1, 'i') }, function (err, matchups) {
				res.json(matchups);
			});
		});
	});
};


// POST updating champion matchup
exports.updateMatchup = function (req, res) {
	const champ1 = req.query.champ1;
	const champ2 = req.query.champ2;
	const update = req.query.update;

	matchup.findOne({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, function (err, matchups) {
		const indexOf =  matchups.champions.findIndex(x => x.name === update.name);
		const set = {};

		if (update.up) {
			set['champions.' + indexOf + '.up'] = update.up;
		}
		else {
			set['champions.' + indexOf + '.down'] = update.down;
		}

		matchup.findOneAndUpdate({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, { $set: set }, function (err, docs) {
			if (err) {
				throw err;
			}

			matchup.find({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, function (err, matchups) {
				res.json(matchups);
			});
		});
	});
};

// POST adding matchup tip
exports.addMatchupTip = function (req, res) {
	const champ1 = req.body.champ1;
	const champ2 = req.body.champ2;
	const tip = req.body.tip;

	if (tip === '' || tip === null) {
		res.status(500).send('ERROR: EMPTY TIP');
		return;
	}

	matchup.findOne({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, function (err, matchup) {
		matchup.champions.find(m => m.name === champ1).tips.push({ tip: tip, up: 0, down: 0 });
		matchup.save();
		res.json(matchup);
	});
};

// POST updating matchup tip
exports.updateMatchupTip = function (req, res) {
	const champ1 = req.body.champ1;
	const champ2 = req.body.champ2;
	const tip = req.body.tip;
	const direction = req.body.direction;

	if (direction === 1) {
		matchup.findOneAndUpdate({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, { new: true }, function (err, matchup) {
			const updatedTip = matchup.champions.find(m => m.name === champ1).tips.find(t => t.tip === tip);

			updatedTip.up = updatedTip.up + 1;
			matchup.save();
			res.json(matchup);
		});
	}
	else {
		matchup.findOneAndUpdate({ 'champions.name': { $all: [new RegExp(champ1, 'i'), new RegExp(champ2, 'i')] } }, { new: true }, function (err, matchup) {
			const updatedTip = matchup.champions.find(m => m.name === champ1).tips.find(t => t.tip === tip);

			updatedTip.down = updatedTip.down + 1;
			matchup.save();
			res.json(matchup);
		});
	}
};
