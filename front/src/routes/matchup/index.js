/*
 * Dependencies
 */

// Vendors
import React from 'react';
import { connect } from 'react-redux';

// Store
import { actions as matchupActions } from 'store/matchup.js';
import { actions as userActions } from 'store/user.js';

// Components
import Tips from 'components/tips/index.js';
import Matchup from 'components/matchup/index.js';

// Utils
import { unformatChampName } from 'utils/championName';

/*
 * LAYOUT - MATCHUP
 * =================
 */

@connect(
	state => ({
		store: state
	}), {
		addMatchupTip: matchupActions.addMatchupTip,
		getMatchup: matchupActions.getMatchup,
		matchupUpdate: matchupActions.matchupUpdate,
		updateMatchupTip: matchupActions.updateMatchupTip,
		setRecords: userActions.setRecords
	}
)
export default class MatchupIndex extends React.Component {

	static propTypes = {
		store: React.PropTypes.object.isRequired,
		match: React.PropTypes.object.isRequired,
		getMatchup: React.PropTypes.func.isRequired,
		matchupUpdate: React.PropTypes.func.isRequired,
		addMatchupTip: React.PropTypes.func.isRequired,
		updateMatchupTip: React.PropTypes.func.isRequired,
		setRecords: React.PropTypes.func.isRequired
	};

	constructor (props) {
		super(props);

		this.state = {
			matchup: {}
		};

	}

	componentWillMount () {
		const champ1 = this.props.match.params.champion1;
		const champ2 = this.props.match.params.champion2;
		const { getMatchup } = this.props;

		getMatchup(unformatChampName(champ1), unformatChampName(champ2));

	}

	onAddTip (champion1, champion2, text) {
		const { addMatchupTip } = this.props;

		addMatchupTip(champion1, champion2, text);

	}

	onTipVote (champion1, champion2) {
		return (tip, direction) => {
			const { updateMatchupTip, store } = this.props;
			const { userStore } = store;

			updateMatchupTip(champion1, champion2, tip, direction);

			userStore.records.matchupTips.push({ champion1: champion1, champion2: champion2, tip: tip, direction: direction });

			this.props.setRecords(userStore.records.matchupTips, 'matchupTips');
			localStorage.setItem('quakechampionselect', JSON.stringify(userStore.records));

		};

	}

	 /*
	* Recording a vote
	* --
	* @param {item} Object
	* @param {direction} Boolean
	*/
	matchupVote (item, direction) {
		const { matchupUpdate } = this.props;
		const { matchup } = this.props.store.matchupStore;

		const champ2 = matchup.champions.filter(c => c.name !== item.name)[0];
		const champ1 = item;

		if (direction) {
			const update = {
				name: champ1.name,
				up: champ1.up + 1
			};

			matchupUpdate(champ2, update);
		}
		else {
			const update = {
				name: champ1.name,
				down: champ1.down + 1
			};

			matchupUpdate(champ2, update);
		}

		//userStore.records.matchups.push({ champions: [champ1.name, champ2.name], direction: direction });

		// this.props.setRecords(userStore.records.matchups, 'matchups');
		// localStorage.setItem('quakechampionselect', JSON.stringify(userStore.records));
	}


	render () {
		const { store } = this.props;
		const { champion1, champion2 } = this.props.match.params;
		const { matchup } = this.props.store.matchupStore;

		return (
			<div>
				{Object.keys(matchup).length > 0 ? (
					<div>
						<Matchup
							matchup={matchup}
							onChange={(item, direction) => this.matchupVote(item, direction)}
							records={store.userStore.records.matchups}
						/>
						<Tips
							title={`Tips for playing ${champion1} vs. ${champion2}`}
							onVote={this.onTipVote(champion1, champion2)}
							onAdd={(text) => this.onAddTip(champion1, champion2, text)}
							list={matchup.champions.find(matchup => matchup.name === champion1).tips}
							records={this.props.store.userStore.records.matchupTips}
						/>
						<Tips
							title={`Tips for playing ${champion2} vs. ${champion1}`}
							onVote={this.onTipVote(champion2, champion1)}
							onAdd={(text) => this.onAddTip(champion2, champion1, text)}
							list={matchup.champions.find(matchup => matchup.name === champion2).tips}
							records={this.props.store.userStore.records.matchupTips}
						/>
					</div>
				) : null}
			</div>
		);
	}

}
