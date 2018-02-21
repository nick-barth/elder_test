/*
 * Dependencies
 */

// Vendors
import React from 'react';

/*
 * MATCHUP
 * =======
 */
class Matchup extends React.Component {


	static propTypes = {
		matchup: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		records: React.PropTypes.array.isRequired
	};

	constructor (props) {
		super(props);
	}

	render () {
		const { matchup } = this.props;
		const champ1 = matchup.champions[0].name;
		const champ2 = matchup.champions[1].name;

		const voteTotals = {
			[champ1]: matchup.champions[0].up - matchup.champions[0].down,
			[champ2]: matchup.champions[1].up - matchup.champions[1].down
		};

		console.log(voteTotals);

		return (
			<div>
				Champion Matchup
			</div>
		);
	}
}

export default Matchup;
