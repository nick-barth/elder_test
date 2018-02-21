/*
 * MATCHUP
 * =======
 */

export default function getUserApi (exec) {

	/*
	 * Expose API
	 * --
	 * On top for clarity, mind the hoisting
	 */
	return {
		signup,
		signin
	};

	function signin (username, password) {

		return exec({
			method: 'post',
			url: '/signin',
			data: {
				'username': username,
				'password': password
			}
		});
	}

	function signup (username, password) {

		return exec({
			method: 'post',
			url: '/signup',
			data: {
				'username': username,
				'password': password
			}
		});
	}

}
