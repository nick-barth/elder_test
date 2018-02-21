/*
 * Dependencies
 */

// Vendors
import React from 'react';

/*
 * LINEGRAPH
 * ========
 */


class Linegraph extends React.Component {

	static propTypes = {
		item: React.PropTypes.object,
		reversed: React.PropTypes.bool.isRequired
	};

	render () {
		const { item, reversed } = this.props;

		//Get the percentage of upvotes out of total votes. If reversed is true, then we are actually getting the percentage of downvotes out of total votes.
		const upVotePercent = !reversed ?
			(item.up === item.down) ?
			50 :
			((item.up / (item.up + item.down)).toFixed(3) * 100) :
			reversed ?
			(item.up === item.down) ?
			50 :
			((item.down / (item.up + item.down)).toFixed(3) * 100) :
			null;

		//Changes the color of the bar depending on upVotePercent's value.
		const barColor = upVotePercent > 60 ? 'line-graph__bar-color_green' : upVotePercent > 40 ? 'line-graph__bar-color_yellow' : 'line-graph__bar-color_red';

		//Changes the position of the upvote percent indicator depending on upvotePercents value.
		const percentLocation = upVotePercent < 23 ? 'line-graph__up-vote-percent_outside' : 'line-graph__up-vote-percent_inside';

		return (
			<div className="line-graph-wrapper">
				<div className="line-graph">
					<div
						style={{ 'width': `${upVotePercent}%` }}
						className={`line-graph__up-vote-percent ${barColor}`}
					>
						<div
							className={`line-graph__up-vote-percent-text ${percentLocation}`}
						>
							{upVotePercent.toFixed(1)}% UPVOTES
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Linegraph;
