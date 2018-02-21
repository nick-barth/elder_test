/*
 * Dependencies
 */

// Vendors
import React from 'react';
import { Link } from 'react-router-dom';

/*
 * HEADER
 * ======
 */


class Header extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<nav className="header-container">
				<div className="header">
					<div className="logo">
						<img className="logo__img" src="/images/header/logo.svg"/>
						<header className="logo__text">
							<span className="logo__text_emphasis">QUAKE</span>CHAMPSELECT
						</header>
					</div>
					<Link to={'/'}>
						<div className="header__button">
							<img className="header__button__icon" src="/images/header/champ-grid-icon.svg"/>
							ALL CHAMPIONS
						</div>
					</Link>
				</div>
			</nav>
		);
	}
}

export default Header;
