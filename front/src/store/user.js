/*
 * ACTION TYPES
 * ============
 */
const SET_RECORDS = 'SET_RECORDS';

/*
 * INITIAL STATE
 * =============
 */
const initalState = {
	records: {
		matchups: [],
		tips: [],
		matchupTips: []
	}
};

/*
 * Expose all action creators
 */
export const actions = {
	setRecords
};

/*
 * Set Records
 * --
 * @param {Object} records
 * @return {ActionCreator}
 */
function setRecords (records, type) {
	return (dispatch) => {
		dispatch({
			type: SET_RECORDS,
			payload: {
				records: records,
				type: type
			}
		});
	};

}

/*
 * REDUCER
 * =======
 */
export function reducer (state = initalState, action) {
	switch (action.type) {

		case SET_RECORDS:
			return Object.assign({}, state, {
				records: {
					...state.records,
					[action.payload.type]: action.payload.records
				}
			});

		default:
			return state;
	}
}
