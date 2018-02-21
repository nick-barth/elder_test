/*
 * Dependencies
 */

// Vendors
import React from 'react';
import { Link } from 'react-router-dom';

// Utils
import { formatChampName } from 'utils/championName';

// Components
import MatchupCard from 'components/matchupcard/index.js';

/*
 * MATCHUPS
 * ========
 */
class Matchups extends React.Component {


	static propTypes = {
		champ: React.PropTypes.object,
		list: React.PropTypes.array.isRequired,
		title: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		records: React.PropTypes.array.isRequired,
		reversed: React.PropTypes.bool.isRequired
	};

	constructor (props) {
		super(props);
		this.state = {
			visibleMatchups: 3
		};
	}

	showMore () {
		this.setState({
			visibleMatchups: this.state.visibleMatchups + 3
		});
	}

	render () {
		const { list, title, onChange, records, champ, reversed } = this.props;
		const { visibleMatchups } = this.state;

		return (
			<div className="matchups">
				<div className="matchups__title">
					{title}
				</div>
				{list.slice(0, visibleMatchups).map(item => {
					const duplicates = records.filter(record => record.champions.includes(item.name) && record.champions.includes(champ.name));
					const canVote = records.length === 0 || duplicates.length === 0;

					return (
						<MatchupCard
							key={item.name}
							item={item}
							champ={champ}
							onChange={onChange}
							canVote={canVote}
							reversed={reversed}
						/>
					);
				})}
					{list.length > visibleMatchups ?
						<button
							onClick={() => this.showMore()}
							className="matchups__show-more-btn"
						>	show more
						</button> :
						null}
			</div>
		);
	}
}

export default Matchups;
