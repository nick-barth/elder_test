/*
 * Dependencies
 */

// Vendors
import React from 'react';
import { Link } from 'react-router-dom';

// Utils
import { formatChampName } from 'utils/championName.js';

/*
 * CARD
 * ====
 */


class Card extends React.Component {


	static propTypes = {
		champ: React.PropTypes.object.isRequired,
	};

	constructor (props) {
		super(props);

	}

	render () {
		const { champ } = this.props;

		return (
			<Link to={`/champion/${formatChampName(champ.name)}`} className="card">
				<div className="card__overlay" />
				<div style={{ 'backgroundImage': `url("images/card/${formatChampName(champ.name)}.jpg")` }} className="card__image-container" />
				<div className="card__name">
					{champ.name}
				</div>
				<div className="card__tag-line">
					{champ.tagline}
					<div className="card__accent" />
				</div>
			</Link>

		);
	}
}

export default Card;
