/*
 * ADMIN
 * =====
 */

export default function getChampionApi (exec) {

	/*
	 * Expose API
	 * --
	 * On top for clarity, mind the hoisting
	 */
	return {
		getQuestions,
		postAnswers
	};



	/*
	 * Get all questions
	 * --
	 * @return {Promise} from .exec
	 */
	function getQuestions () {
		return exec({
			method: 'get',
			url: '/questions'
		});
	}

	/*
	 *  Posts answers
	 * --
	 * @param {object} test - completed test
	 * @return {Promise} from .exec
	 */
	function postAnswers (test) {
		console.log(test);
		return exec({
			method: 'post',
			url: '/grade',
			query: {
				'test': test
			}
		});
	}
}
