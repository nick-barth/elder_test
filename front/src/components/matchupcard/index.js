/*
 * Dependencies
 */

// Vendors
import React from 'react';
import { Link } from 'react-router-dom';

// Utils
import { formatChampName } from 'utils/championName';

// Components
import Linegraph from 'components/linegraph/index.js';

/*
 * MATCHUPCARD
 * ========
 */
class MatchupCard extends React.Component {


	static propTypes = {
		item: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
		canVote: React.PropTypes.bool.isRequired,
		champ: React.PropTypes.object,
		reversed: React.PropTypes.bool.isRequired

	};

	constructor (props) {
		super(props);
		this.state = {
			isUpvoted: false,
			isDownvoted: false
		};
	}

	//Combines the onChange function with code that handles applying the active CSS for the upvote and downvote arrow's respectively.
	 castVote (value, upOrDown) {
		const { item, onChange, canVote } = this.props;
		const { isDownvoted, isUpvoted } = this.state;

		//If canVote is true, and isUpvoted and isDownvoted are false, then run the onChange function and change the state,
		//Which in turn applies the active styling. Otherwise, do nothing.
		canVote && !isDownvoted && !isUpvoted ? (onChange(item, value), this.setState(prevState => ({
			[upOrDown]: !this.state[upOrDown]
		}))) : null;
	 }

	render () {
		const { item, champ, reversed } = this.props;
		const { isUpvoted, isDownvoted } = this.state;

		//Disables pointer events after user votes.
		const pointerEvents = isDownvoted || isUpvoted ? 'matchup-card__pointer-events_disabled' : 'matchup-card__pointer-events_enabled';

		//Changes the color of the upvote button depending on whether or not reversed, isUpvoted, and isDownvoted are true or false.
		const upvoteBg = !reversed && isUpvoted ? 'matchup-card__vote_active' : reversed && isDownvoted ? 'matchup-card__vote_active' : null;

		//Changes the color of the downvote button.
		const downvoteBg = !reversed && isDownvoted ? 'matchup-card__vote_active' : reversed && isUpvoted ? 'matchup-card__vote_active' : null;

		return (
			<div className="matchup-card">
				<div className="matchup-card__matchup-info">
					<div className="matchup-card__item" key={item.name}>
						<Link to={`/matchup/${formatChampName(champ.name)}/${formatChampName(item.name)}`} className="matchup-card__link">
							<div style={{ 'backgroundImage': `url("/images/card/${formatChampName(item.name)}.jpg")` }} className="matchup-card__champ-img-container">
								<div className="matchup-card__champ-name">
									{item.name}
								</div>
							</div>
						</Link>
						<div className="matchup-card__vote">
							<div className="matchup-card__vote-container">
								<div
									className={`matchup-card__vote-up-flex ${pointerEvents} ${upvoteBg}`}
									onClick={() => { reversed ? this.castVote(0, 'isDownvoted') : this.castVote(1, 'isUpvoted'); }}
								>
									<img className="matchup-card__up-arrow" src="/images/vote/up-arrow.svg"/>

									{/* If reversed is true, vote down instead of up */}
									<div className="matchup-card__item-up">
										{reversed ? item.down : item.up}
									</div>
								</div>
								<div
									className={`matchup-card__vote-down-flex ${pointerEvents} ${downvoteBg}`}
									onClick={() => { reversed ? this.castVote(1, 'isUpvoted') : this.castVote(0, 'isDownvoted'); }}
								>
									<img className="matchup-card__down-arrow" src="/images/vote/up-arrow.svg"/>

									{/* If reversed is false, vote up instead of down */}
									<div className="matchup-card__item-down">
										{reversed ? item.up : item.down}
									</div>
								</div>
							</div>
							<div className="matchup-card__vote-details">

								{/* Show net votes after upvotes - downvotes or downvotes - upvotes if reversed is true. */}
								<div className="matchup-card__upvote-percentage">
									NET VOTES: {reversed ? item.down - item.up : item.up - item.down}
								</div>
							</div>
						</div>
					</div>
					<div className="matchup-card__details">
						<Linegraph
							item={item}
							reversed={reversed}
						/>
					</div>
				</div>
		</div>
		);
	}
}

export default MatchupCard;
