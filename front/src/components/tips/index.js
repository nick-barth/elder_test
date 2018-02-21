/*
 * Dependencies
 */

// Vendors
import React from 'react';

import Form from 'components/form/index.js';
import Vote from 'components/vote/index.js';
import Button from 'components/button/index.js';

/*
 * TIPS
 * ====
 */

class Tips extends React.Component {


	static propTypes = {
		title: React.PropTypes.string.isRequired,
		records: React.PropTypes.array,
		list: React.PropTypes.array.isRequired,
		onVote: React.PropTypes.func.isRequired,
		onAdd: React.PropTypes.func.isRequired
	};

	static defaultProps = {
		records: []
	};



	constructor (props) {
		super(props);

		this.state = {
			text: '',
			visibleTips: 3,
			userFeedback: false,
			tipSent: false
		};
	}

	showMore () {
		this.setState({
			visibleTips: this.state.visibleTips + 3
		});
	}

	render () {
		const { title, list, records, onVote, onAdd } = this.props;
		const { visibleTips, userFeedback, text, tipSent } = this.state;

		return (
			<section className="tips">
				<header className="tips__title">
					{title}
				</header>
				<ul className="tips__list">
					{list.slice(0, visibleTips).map(item => {
						const duplicates = records.filter(record => record.tip === item.tip);
						const canVote = records.length === 0 || duplicates.length === 0;

						return (
							<li className="tips__tip" key={Math.random()}>
								<div className="tips__tip-name">
									{item.tip}
								</div>
								<Vote
									voteInfo={item}
									canVote={canVote}
									upVote={canVote ? onVote(item.tip, 1) : () => null}
									downVote={canVote ? onVote(item.tip, 0) : () => null}
								/>
							</li>

						);
					})}
				</ul>
				{list.length > visibleTips ?
					<Button
						click={() => this.showMore()}
						classes="tips__show-more-btn"
						text="show more"
					/>
				: null}
				<Form
					onSubmit={e => {
						e.preventDefault();
						onAdd(text);
					}}
				>
					<Form.Input
						id="tip"
						type="longtext"
						value={text}
						userFeedback={userFeedback}
						tipSent={tipSent}
						onChange={val => this.setState({
							text: val
						})}
					/>
				</Form>

			{/* Show the submit button unless the user has submitted a tip already.
			If shown, button will only add a tip if it is equal to or longer than 35 characters.
			Also toggles the userFeedback state on click. This toggles the feedback text animation
			in the form/input component, which gets the users attention. */}
				{!tipSent ?
					<Button
						submit
						click={() => text.length >= 35 ?
							(this.setState(() => ({
								tipSent: true
							})), onAdd(text)) :
							userFeedback ?
							this.setState(() => ({
								userFeedback: false
							})) :
							this.setState(() => ({
								userFeedback: true
							}))}
						text="Submit"
					/> : null }
			</section>
		);
	}
}

export default Tips;
