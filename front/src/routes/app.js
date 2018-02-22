/*
 * Dependencies
 */

// Vendors
import React from 'react';

/*
 * LAYOUT - INDEX
 * ==============
 */

export default class LandingLayout extends React.Component {

	/*
	 * Validate props
	 */
	static propTypes = {
		store: React.PropTypes.object,
		children: React.PropTypes.element
	};

	constructor (props) {
		super(props);

	}

	render () {
		return (
			<div className="app">
				<div className="layout">
					{this.props.children}
				</div>
			</div>
		);
	}
}
