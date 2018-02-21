/*
 * MATCHUP
 * =======
 */

export default function getMatchupApi (exec) {

	/*
	 * Expose API
	 * --
	 * On top for clarity, mind the hoisting
	 */
	return {
		getMatchups,
		getMatchup,
		updateMatchup,
		updateMatchupTip,
		addMatchupTip
	};

	/*
	 * gets all matchups for a champion
	 * --
	 * @param {String} champ - champion name
	 * @return {Promise} from .exec
	 */
	function getMatchups (champ) {
		return exec({
			method: 'get',
			url: '/matchups',
			query: {
				'name': champ
			}
		});
	}

	/*
	 * Get matchup between 2 champiosn
	 * --
	 * @param {String} champ1 - champion1 name
	 * @param {String} champ2 - champion2 name
	 * @return {Promise} from .exec
	 */
	function getMatchup (champ1, champ2) {

		return exec({
			method: 'get',
			url: '/matchup',
			query: {
				'champ1': champ1,
				'champ2': champ2
			}
		});
	}

	/*
	 *  Updates matchup
	 * --
	 * @param {String} champ - champion name
	 * @param {object} update - updates to votes
	 * @return {Promise} from .exec
	 */
	function updateMatchup (champ, update) {
		return exec({
			method: 'post',
			url: '/matchup/update',
			query: {
				'champ1': champ.name,
				'champ2': update.name,
				'update': update
			}
		});
	}

	/*
	 *  Updates matchup tip
	 * --
	 * @param {String} champ1 - champion1 name
	 * @param {String} champ2 - champion2 name
	 * @param {String} tip - tip to be updates
	 * @param {Boolean} direction - direction of vote
	 * @return {Promise} from .exec
	 */
	function updateMatchupTip (champ1, champ2, tip, direction) {
		return exec({
			method: 'post',
			url: '/matchup/updateTip',
			data: {
				'champ1': champ1,
				'champ2': champ2,
				'tip': tip,
				'direction': direction
			}
		});
	}

	/*
	 * Add matchup tip
	 * --
	 * @param {String} champ1 - champion1 name
	 * @param {String} champ2 - champion2 name
	 * @param {tipo} tip - tip string
	 * @return {Promise} from .exec
	 */
	function addMatchupTip (champ1, champ2, tip) {
		return exec({
			method: 'post',
			url: '/matchup/addTip',
			data: {
				'champ1': champ1,
				'champ2': champ2,
				'tip': tip
			}
		});
	}

}
