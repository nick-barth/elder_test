import React from 'react';

class Adcontainer extends React.Component {

	static propTypes = {
		classes: React.PropTypes.string.isRequired,
		children: React.PropTypes.node.isRequired
	};

	constructor (props) {
		super(props);
	}

	render () {
		return (
            <aside className={this.props.classes}>{this.props.children}</aside>
		);
	}
}

export default Adcontainer;
