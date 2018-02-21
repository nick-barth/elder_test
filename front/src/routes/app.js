/*
 * Dependencies
 */

// Vendors
import React from 'react';

// Components
import Header from '../components/header/index.js';
import Footer from '../components/footer/index.js';
import Adcontainer from '../components/adcontainer/index.js';
import Advertisement from '../components/adcontainer/advertisement/index.js';

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
				<Header />
				<div className="layout">
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}
