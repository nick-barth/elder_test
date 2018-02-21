/*
 * Dependencies
 */

// Vendors
import React from 'react';
import ReactDOM from 'react-dom';

/*
 * PROPS SHAPES
 * ============
 */

/*
 * FORM INPUT
 * ==========
 */
class Input extends React.Component {

	static propTypes = {
		// Required
		id: React.PropTypes.string.isRequired,
		type: React.PropTypes.oneOf(['text', 'longtext', 'password', 'number']).isRequired,
		status: React.PropTypes.oneOf(['pristine', 'valid', 'error']).isRequired,
		onChange: React.PropTypes.func.isRequired,
		onBlur: React.PropTypes.func.isRequired,
		value: React.PropTypes.string.isRequired,
		tipSent: React.PropTypes.bool.isRequired,
		userFeedback: React.PropTypes.bool.isRequired
	};

	static defaultProps = {
		value: '',
		type: 'text',
		status: 'pristine',
		onBlur: () => null
	};

	constructor (props) {
		super(props);

		this.focused = false;
		this.state = {
			maxLength: ''
		};
	}

	onChange (val) {

		const { onChange, type } = this.props;
		const value = type === 'number' ? parseFloat(val, 10) : val;

		if (onChange) {
			onChange(value);
		}
	}

	setFocus () {
		ReactDOM.findDOMNode(this.refs.input).focus();
	}

	render () {

		const { id, type, onBlur, value, userFeedback, tipSent } = this.props;
		const isTextarea = type === 'longtext';
		const Tag = isTextarea ? 'textarea' : 'input';
		const maxLength = 700;

		return (
			<div className={`form__input  ${isTextarea ? 'form__input--textarea' : ''} `}>
				<Tag
					ref="input"
					id={id}
					onChange={(e) => this.onChange(e.target.value)}
					onBlur={onBlur}
					className="form__input-el"
					type={isTextarea ? null : type}
					value={value}
					placeholder={'An easy way to beat this champion is to hit him in the highlighted areas!'}
					min={type === 'number' ? '0' : null}
					maxLength={maxLength}
					rows={7}
				/>
				<div
					style={{ 'marginBottom': `${tipSent ? '3rem' : '.8rem'}` }}
					className="form__feedback"
				>
					<div className="form__character-indicator">
						{value.length}/{maxLength}
					</div>

				{/* Changes the color of the feedback text depending whether or not tipsent is true and if the user typed more than 35 characters. */}
					<div style={{ 'color': `${tipSent ? '#2EAF21' : value.length >= 35 ? '#2EAF21' : '#d22730'}` }}
						className={`form__tip-longer  ${userFeedback ? 'form__user-feedback' : null}`}
					>

				{/* Gives the user feedback depending on how much they've typed and whether or not tipSent is true. */}
						{value.length < 35 && value.length > 0 ?
							'Tip Must Be Longer' :
							tipSent ?
							'Tip Submitted!' :
							value.length === 0 ?
							'Please enter a tip' :
							value.length >= 35 ?
							'Ok' :
							null}
					</div>
				</div>
			</div>
		);
	}
}

export default Input;
