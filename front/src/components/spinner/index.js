/*
 * Dependencies
 */

// Vendors
import React from 'react';

/*
 * SPINNER
 * =======
 */
class Spinner extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="spinner">
				<div className="spinner__circle"/>
				<div className="spinner__circle-outer"/>
			</div>
		);
	}
}

export default Spinner;
