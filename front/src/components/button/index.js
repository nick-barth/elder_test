/*
 * Dependencies
 */

// Vendors
import React from 'react';
import _ from 'lodash';

/*
 * BUTTON
 * ======
 */
class Button extends React.Component {


	static propTypes = {
		click: React.PropTypes.func.isRequired,
		submit: React.PropTypes.bool,
		text: React.PropTypes.string.isRequired,
		classes: React.PropTypes.string
	};

	constructor (props) {
		super(props);
	}

	handleClick (e) {
		const { click } = this.props;

		e.preventDefault();
		click();
	}

	render () {
		const { submit, text, classes } = this.props;

		return (
			<button className={`button__button ${classes}`} type={submit ? 'submit' : 'button'} onClick={e => this.handleClick(e)} ref="button">
				{text}
			</button>
		);
	}
}

export default Button;
