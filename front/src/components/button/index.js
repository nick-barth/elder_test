/*
 * Dependencies
 */

// Vendors
import React from 'react';

/*
 * BUTTON
 * ======
 */
class Button extends React.Component {


	static propTypes = {
		click: React.PropTypes.func.isRequired,
		submit: React.PropTypes.bool,
		text: React.PropTypes.string.isRequired
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
		const { submit, text } = this.props;

		return (
			<button className={'button'} type={submit ? 'submit' : 'button'} onClick={e => this.handleClick(e)} ref="button">
				{text}
			</button>
		);
	}
}

export default Button;
