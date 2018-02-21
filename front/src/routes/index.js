/*
 * Dependencies
 */

// Vendors
import React from 'react';

// API
import API from 'api';

// Components
import ChampionGrid from 'components/championGrid/index.js';

/*
 * LAYOUT - INDEX
 * ==============
 */
export default class App extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			champions: [],
			championsLoading: false
		};

	}

	componentWillMount () {
		this.setState({
			championsLoading: true
		});
		API.champ.getChampions()
		.promise
		.then(res => {
			this.setState({
				champions: res.data,
				championsLoading: false
			});
		})
		.catch(res => {
			console.log(res);
			console.log('error');
		});
	}

	render () {
		const { champions, championsLoading } = this.state;

		return (
				<ChampionGrid champions={champions} isLoading={championsLoading} />
		);
	}

}
