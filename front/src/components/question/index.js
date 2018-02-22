/*
 * Dependencies
 */

// Vendors
import React from 'react';

/*
 * QUESTION - INDEX
 * ================
 */
export default class Question extends React.Component {

	static propTypes = {
		question: React.PropTypes.object.isRequired,
		onSelect: React.PropTypes.func.isRequired
	};

	constructor (props) {
		super(props);
	}

	render () {
		const { question, onSelect } = this.props;
		const answers = Object.keys(question).filter(k => k !== 'question');

		return (
			<div className="questions">
				{question.question}
				<ul>
					{answers.map((key, index) => {
						return (
							<li className="questions__answer">
								<input name={question.question} type="radio"
									onChange={() => onSelect(key)}
								/>
								<span className="questions__answer-text">{question[key]}</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
