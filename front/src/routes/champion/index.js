/*
 * Dependencies
 */

// Vendors
import React from 'react';
import { connect } from 'react-redux';

// Store
import { actions as championActions } from 'store/champion.js';
import { actions as userActions } from 'store/user.js';

// Components
import Matchups from 'components/matchups/index.js';
import Tips from 'components/tips/index.js';
import Spinner from 'components/spinner/index.js';
import Banner from 'components/banner/index.js';
import Adcontainer from 'components/adcontainer/index.js';

// Utils
import { unformatChampName } from 'utils/championName';

/*
 * LAYOUT - CHAMPION
 * =================
 */
@connect(
	state => ({
		store: state
	}), {
		fetchChampionAndMatchups: championActions.fetchChampionAndMatchups,
		matchUpdate: championActions.matchUpdate,
		setRecords: userActions.setRecords,
		addTip: championActions.addTip,
		updateTip: championActions.updateTip

	}
)
export default class ChampionLayout extends React.Component {

	static propTypes = {
		store: React.PropTypes.object.isRequired,
		match: React.PropTypes.object.isRequired,
		fetchChampionAndMatchups: React.PropTypes.func.isRequired,
		matchUpdate: React.PropTypes.func.isRequired,
		setRecords: React.PropTypes.func.isRequired,
		addTip: React.PropTypes.func.isRequired,
		updateTip: React.PropTypes.func.isRequired
	};

	constructor (props) {
		super(props);

	}

	componentDidMount () {
		this.fetchPageInfo(this.props.match.params.champion);

	}

	componentWillReceiveProps (nextProps) {
		if (this.props.match.params.champion !== nextProps.match.params.champion) {
			this.fetchPageInfo(nextProps.match.params.champion);
		}
	}

	fetchPageInfo (name) {
		const { fetchChampionAndMatchups } = this.props;

		fetchChampionAndMatchups(unformatChampName(name));

		const { setRecords } = this.props;

		if (localStorage.getItem('quakechampionselect')) {
			const storage = JSON.parse(localStorage.getItem('quakechampionselect'));

			if (storage) {
				setRecords(storage.matchups, 'matchups');
				setRecords(storage.tips, 'tips');
				setRecords(storage.matchupTips, 'matchupTips');
			}

		}
	}


   /*
	* Recording a vote
	* --
	* @param {item} Object
	* @param {direction} Boolean
	*/
	matchupVote (item, direction) {

		const { championStore, userStore } = this.props.store;
		const { matchUpdate } = this.props;
		const { champion } = championStore;

		if (direction) {
			const update = {
				name: item.name,
				up: item.up + 1
			};

			matchUpdate(champion, update);
		}
		else {
			const update = {
				name: item.name,
				down: item.down + 1
			};

			matchUpdate(champion, update);
		}

		userStore.records.matchups.push({ champions: [item.name, champion.name], direction: direction });

		this.props.setRecords(userStore.records.matchups, 'matchups');
		localStorage.setItem('quakechampionselect', JSON.stringify(userStore.records));
	}

   /*
	* Adding a tip
	* --
	* @param {text} String
	*/
	addTip (text) {
		const { addTip } = this.props;
		const { champion } = this.props.store.championStore;

		addTip(champion.name, text);

	}

   /*
	* Voting on a tip
	* Curried function
	* --
	* @param {item} Object
	* @param {direction} Boolean
	*/
	tipVote (item, direction) {
		return () => {
			const { updateTip, store } = this.props;
			const { userStore, championStore } = store;
			const { champion } = championStore;

			updateTip(champion.name, item, direction);

			userStore.records.tips.push({ champion: champion.name, tip: item, direction: direction });

			this.props.setRecords(userStore.records.tips, 'tips');
			localStorage.setItem('quakechampionselect', JSON.stringify(userStore.records));

		};

	}

	render () {
		const { store } = this.props;
		const { matchups, champion, errors, isLoadingChamp, isLoadingMatchup } = store.championStore;

		//Sorts the matchups by net votes.
		const sorted = [...matchups].sort((a, b) => {
			return (b.up - b.down) - (a.up - a.down);
		});

		return (
			<div>
				{!isLoadingChamp && !isLoadingMatchup && matchups.length > 0 && champion.name ? (
					<div style={{ 'display': 'flex', 'flexWrap': 'wrap' }}>
						<Banner champ={champion} />
						<main style={{ 'flexBasis': 'auto', 'flexGrow': '1', 'maxWidth': '100%'  }}>
							<section>
								<header className="matchups-header">matchups</header>
								<div className="matchups-flex">
									<Matchups
										title={`${champion.name} is strong vs`}
										list={sorted}
										champ={champion}
										onChange={(item, direction) => this.matchupVote(item, direction)}
										records={store.userStore.records.matchups}
										reversed={false}
									/>
									<Matchups
										title={`${champion.name} is weak vs`}
										list={[...sorted].reverse()}
										champ={champion}
										onChange={(item, direction) => this.matchupVote(item, direction)}
										records={store.userStore.records.matchups}
										reversed={true}
									/>
								</div>
							</section>
							<Tips
								title={`Tips for ${champion.name}`}
								list={champion.tips.sort((a, b) => {
									return (b.up - b.down) - (a.up - a.down);
								})}
								records={store.userStore.records.tips}
								onVote={(item, direction) => this.tipVote(item, direction)}
								onAdd={(text) => this.addTip(text)}
							/>
						</main>
					</div>
				) :<Spinner />}
				{errors.length > 0 ? (
					<div>
						No Champion Found
					</div>
				) : null}
			</div>
		);
	}
}
