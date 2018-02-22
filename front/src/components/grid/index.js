/*
 * Dependencies
 */

// Vendors
import React from 'react';

// API
import API from 'api';

// Components
import Question from 'components/question/index.js';
import Button from 'components/button/index.js';
import Spinner from 'components/spinner/index.js';

/*
 * GRID - INDEX
 * ==============
 */
export default class Grid extends React.Component {

	static propTypes = {
		questions: React.PropTypes.array.isRequired
	};

	constructor (props) {
		super(props);

		this.state = {
			answers: {},
			isLoading: false,
			score: null
		};
	}

	handleSelect (index) {
		return (answer) => {
			this.setState({
				answers: {
					...this.state.answers,
					[index]: answer
				}
			});
		};
	}

	handleSubmit () {
		const { questions } = this.props;
		const { answers } = this.state;

		if (Object.keys(answers).length !== questions.length) {
			console.log('really low quality input validation ----- ERROR');
			return;
		}

		this.setState({
			isLoading: true
		});

		API.test.postAnswers(answers)
		.promise
		.then(res => {
			this.setState({
				score: res.data,
				isLoading: false
			});
		})
		.catch(res => {
			console.log(res);
			console.log('error');
		});



	}


	render () {
		const { questions } = this.props;
		const { isLoading, score } = this.state;

		return (
			<div className="grid">
				{!isLoading ? (
					<div>
					{score ? (
						<div className="grid__scored">
							{score.map((a, i) => {
								return (
									<div>
										{`Question ${i + 1}: ${a === true ? 'Correct' : 'Wrong'}`}
									</div>
								);
							})}
						</div>
					) : (
						<div>
							{questions.map((q, i) => {
								return (
									<Question
										question={q}
										onSelect={this.handleSelect(i)}
									/>
								);
							})}
							<Button
								text="Submit"
								click={() => this.handleSubmit()}
								submit
							/>
						</div>
					)}
					</div>
				) : <Spinner />}
			</div>
		);
	}
}
