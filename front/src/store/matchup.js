/*
 * DEPENDENCIES
 * ============
 */

import API from 'api';

/*
 * ACTION TYPES
 * ============
 */
const FETCH_MATCHUP_SUCCESS = 'FETCH_MATCHUP_SUCCESS';
const MATCHUP_UPDATE_TIP_SUCCESS = 'MATCHUP_UPDATE_TIP_SUCCESS';
const MATCHUP_ADD_TIP_SUCCESS = 'MATCHUP_ADD_TIP_SUCCESS';
const UPDATE_MATCHUP_SUCCESS = 'UPDATE_MATCHUP_SUCCESS';


/*
 * INITIAL STATE
 * =============
 */
const initalState = {
	matchup: {}
};

/*
 * Expose all action creators
 */
export const actions = {
	getMatchup,
	addMatchupTip,
	updateMatchupTip,
	matchupUpdate
};

/*
 * Changing a matchup
 * --
 * @param {array} movies
 * @return {Function} an `actionCreator`
 */
function getMatchup (champ1, champ2) {
	return dispatch => {
		API.matchup.getMatchup(champ1, champ2)
			.promise
			.then(res => {
				dispatch({
					type: FETCH_MATCHUP_SUCCESS,
					payload: {
						matchup: res.data
					}
				});
			})
			.catch(res => {
				console.log(res);
			});
	};

}

function addMatchupTip (champ1, champ2, tip) {
	return dispatch => {
		API.matchup.addMatchupTip(champ1, champ2, tip)
			.promise
			.then(res => {
				dispatch({
					type: MATCHUP_ADD_TIP_SUCCESS,
					payload: {
						matchup: res.data
					}
				});
			})
			.catch(res => {
				console.log(res);
				console.log('error');
			});
	};

}

function updateMatchupTip (champ1, champ2, tip, direction) {
	return dispatch => {
		API.matchup.updateMatchupTip(champ1, champ2, tip, direction)
			.promise
			.then(res => {
				dispatch({
					type: MATCHUP_UPDATE_TIP_SUCCESS,
					payload: {
						matchup: res.data
					}
				});
			})
			.catch(res => {
				console.log(res);
				console.log('error');
			});
	};

}


function matchupUpdate (champ, update) {
	return dispatch => {
		API.matchup.updateMatchup(champ, update)
			.promise
			.then(res => {
				dispatch({
					type: UPDATE_MATCHUP_SUCCESS,
					payload: {
						matchup: res.data[0]
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
		// Successfully fetched matchup
		case FETCH_MATCHUP_SUCCESS:
			return Object.assign({}, state, {
				matchup: action.payload.matchup
			});

		case MATCHUP_ADD_TIP_SUCCESS:
			return Object.assign({}, state, {
				matchup: action.payload.matchup
			});

		case MATCHUP_UPDATE_TIP_SUCCESS:
			return Object.assign({}, state, {
				matchup: action.payload.matchup
			});

		case UPDATE_MATCHUP_SUCCESS:
			return Object.assign({}, state, {
				matchup: action.payload.matchup
			});

		default:
			return state;
	}
}
