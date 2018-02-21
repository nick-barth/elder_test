/*
 * Dependencies
 */

// Vendors
import React from 'react';

import { formatChampName } from 'utils/championName.js';

/*
 * Banner
 * ===========
 */
class Banner extends React.Component {


	static propTypes = {
		champ: React.PropTypes.object.isRequired
	};

	constructor (props) {
		super(props);
		const number = Math.round(Math.random() * 4);

		this.state = {
			randomBg: number
		};
	}

	render () {
		const { champ } = this.props;
		const { randomBg } = this.state;

		return (
			<div className="banner" style={{ 'backgroundImage': `url("../images/banner/champion-bg-${randomBg}.jpg")` }}>
				<header className="banner__name">{champ.name}</header>
				<div className="banner__champ-wrapper">
					<img className="banner__img" src={`/images/banner/${formatChampName(champ.name)}-banner.png`} />
				</div>
			</div>
		);
	}
}

export default Banner;
