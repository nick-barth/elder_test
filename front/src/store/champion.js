/*
 * DEPENDENCIES
 * ============
 */

import API from 'api';

/*
 * ACTION TYPES
 * ============
 */
const FETCH_CHAMP_AND_MATCHUP_ATTEMPT = 'FETCH_CHAMP_AND_MATCHUP_ATTEMPT';
const FETCH_CHAMP_AND_MATCHUP_FAILURE = 'FETCH_CHAMP_AND_MATCHUP_FAILURE';
const FETCH_CHAMP_SUCCESS = 'FETCH_CHAMP_SUCCESS';
const FETCH_MATCHUPS_SUCCESS = 'FETCH_MATCHUPS_SUCCESS';
const UPDATE_CHAMP_MATCHUP_SUCCESS = 'UPDATE_CHAMP_MATCHUP_SUCCESS';
const CHAMP_ADD_TIP_SUCCESS = 'CHAMP_ADD_TIP_SUCCESS';
const CHAMP_UPDATE_TIP_SUCCESS = 'CHAMP_UPDATE_TIP_SUCCESS';


/*
 * INITIAL STATE
 * =============
 */
const initalState = {
	champion: {},
	matchups: [],
	isLoadingChamp: false,
	isLoadingMatchup: false,
	errors: []
};

/*
 * Expose all action creators
 */
export const actions = {
	fetchChampionAndMatchups,
	matchUpdate,
	addTip,
	updateTip
};

/*
 * Fetch place by its id
 * --
 * @param {String} id - a place id
 * @return {ActionCreator}
 */
function fetchChampionAndMatchups (champ) {
	return (dispatch) => {
		dispatch({
			type: FETCH_CHAMP_AND_MATCHUP_ATTEMPT,
			payload: {
				id: champ
			}
		});

		API.champ.getChampion(champ)
		.promise
		.then(res => {
			API.matchup.getMatchups(champ)
				.promise
				.then(res => {
					dispatch({
						type: FETCH_MATCHUPS_SUCCESS,
						payload: {
							matchups: [].concat.apply([],res.data.map(m => {
								return m.champions.filter(c => c.name.toLowerCase() !== champ);
							}))
						}
					});
				})
				.catch(res => {
					dispatch({
						type: FETCH_CHAMP_AND_MATCHUP_FAILURE,
						payload: {
							error: 'No Matchups Found'
						}
					});
				});

			dispatch({
				type: FETCH_CHAMP_SUCCESS,
				payload: {
					champ: res.data
				}
			});
		})
		.catch(res => {
			dispatch({
				type: FETCH_CHAMP_AND_MATCHUP_FAILURE,
				payload: {
					error: 'No Champion Found'
				}
			});
		});

	};

}

/*
 * Changing a matchup
 * --
 * @param {array} matchupChange
 * @return {Function} an `actionCreator`
 */
function matchUpdate (champ, update) {
	return dispatch => {
		API.champ.updateChampMatchup(champ, update)
			.promise
			.then(res => {
				dispatch({
					type: UPDATE_CHAMP_MATCHUP_SUCCESS,
					payload: {
						matchups: [].concat.apply([],res.data.map(m => {
							return m.champions.filter(c => c.name.toLowerCase() !== champ.name.toLowerCase());
						}))
					}
				});
			})
			.catch(res => {
				console.log(res);
				console.log('error');
			});
	};

}

function addTip (champ, tip) {
	return dispatch => {
		API.champ.addChampTip(champ, tip)
			.promise
			.then(res => {
				dispatch({
					type: CHAMP_ADD_TIP_SUCCESS,
					payload: {
						tips: res.data.tips
					}
				});
			})
			.catch(res => {
				console.log(res);
				console.log('error');
			});
	};

}

function updateTip (name, tip, direction) {
	return dispatch => {
		API.champ.updateChampTip(name, tip, direction)
			.promise
			.then(res => {
				dispatch({
					type: CHAMP_UPDATE_TIP_SUCCESS,
					payload: {
						tips: res.data.tips
					}
				});
			})
			.catch(res => {
				console.log(res);
				console.log('error');
			});
	};

}

/*
 * REDUCER
 * =======
 */
export function reducer (state = initalState, action) {
	switch (action.type) {
		case FETCH_CHAMP_AND_MATCHUP_FAILURE:
			return Object.assign({}, state, {
				errors: [action.payload.error]
			});

		case FETCH_CHAMP_AND_MATCHUP_ATTEMPT:
			return Object.assign({}, state, {
				isLoadingChamp: true,
				isLoadingMatchup: true
			});

		// Successfully fetched champ
		case FETCH_CHAMP_SUCCESS:
			return Object.assign({}, state, {
				champion: action.payload.champ,
				isLoadingChamp: false,
				errors: []
			});

		// Successfully fetched matchups of champ
		case FETCH_MATCHUPS_SUCCESS:
			return Object.assign({}, state, {
				matchups: action.payload.matchups,
				isLoadingMatchup: false,
				errors: []
			});

		// Update of a matchup attempt
		case UPDATE_CHAMP_MATCHUP_SUCCESS:
			return Object.assign({}, state, {
				matchups: action.payload.matchups,
				isLoadingMatchup: false,
				errors: []
			});

				// Update of a matchup attempt
		case CHAMP_ADD_TIP_SUCCESS:
			return Object.assign({}, state, {
				champion: {
					...state.champion,
					tips: action.payload.tips
				}
			});

		case CHAMP_UPDATE_TIP_SUCCESS:
			return Object.assign({}, state, {
				champion: {
					...state.champion,
					tips: action.payload.tips
				}
			});

		default:
			return state;
	}
}
