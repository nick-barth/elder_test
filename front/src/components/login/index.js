/*
 * Dependencies
 */

// Vendors
import React from 'react';
import { connect } from 'react-redux';

//Store
import { actions as userActions } from 'store/user.js';

/*
 * LOGIN
 * =====
 */

@connect(
	state => ({
		store: state
	}), {
		login: userActions.login
	}
)
class Login extends React.Component {

	static propTypes = {
		login: React.PropTypes.func.isRequired
	};

	constructor (props) {
		super(props);

		this.state = {
			loginName: '',
			loginPassword: '',
			signupName: 'Longjohn',
			signupPassword: 'silver'
		};

		this.handleSignup = this.handleSignup.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSignup (e) {
		e.preventDefault();



		this.props.login(this.state.signupName, this.state.signupPassword);
	}

	handleChange (e) {
		const change = {};

		change[e.target.name] = e.target.value;
		this.setState(change);
	}


	render () {
		return (
			<div className="login">
				<div className="login__disclaimer">
					We actually would perfer if you didn't have to make an account, but we have to fight spammers, so this is our most painless option.
				</div>
				<div className="login__signup">
					<form onSubmit={this.handleSignup}>
						<input type="text" value={this.state.signupName} name="signupName" onChange={this.handleChange} />
						<input type="password" value={this.state.signupPassword} name="signupPassword" onChange={this.handleChange} />
						 <input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
