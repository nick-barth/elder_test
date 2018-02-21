/*
 * Dependencies
 */

// Vendors
import React from 'react';

/*
 * MATCHUP
 * =======
 */
class Vote extends React.Component {

	static propTypes = {
		voteInfo: React.PropTypes.object.isRequired,
		canVote: React.PropTypes.bool.isRequired,
		downVote: React.PropTypes.func.isRequired,
		upVote: React.PropTypes.func.isRequired

	};

	constructor (props) {
		super(props);
		this.state = {
			upVote: false,
			downVote: false
		};
	}
	//Call tipVote and change the state (upvote or downvote), which changes the color of the arrow.
	castVote (upOrDown) {
		const { upVote, downVote } = this.props;

		upOrDown === 'upVote' ? (upVote()) : (downVote());
	}

	render () {
		const { voteInfo } = this.props;
		const { downVote, upVote } = this.state;

		return (
			<div className="vote-container">
				<div className="vote">
					<div className="vote__item-up" onClick={() => {
						this.castVote('upVote'); !upVote && !downVote ? this.setState(() => ({
							upVote: true
						})) : null;
					}}
					>
						<img className="vote__up-arrow" src={`/images/vote/${upVote ? 'voted' : 'up-arrow'}.svg`}/>
						{voteInfo.up}
					</div>
					<div className="vote__item-down" onClick={() => {
						this.castVote('downVote'); !upVote && !downVote ? this.setState(() => ({
							downVote: true
						})) : null;
					}}
					>
						<img className="vote__down-arrow" src={`/images/vote/${downVote ? 'voted' : 'up-arrow'}.svg`}/>
						{voteInfo.down}
					</div>
				</div>
			</div>
		);
	}
}

export default Vote;
