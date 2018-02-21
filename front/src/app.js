/*
 * Dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Routes from './routes/all.js';


ReactDOM.render(
	<Provider store={store}>
		{Routes()}
	</Provider>,
	document.getElementById('app')
);

/*
* Accept hot reloads in dev mode
*/
if (module.hot) {
	module.hot.accept('./routes/all.js', () => {
		ReactDOM.render(
			<Provider store={store} key={Math.random()}>
				{Routes()}
			</Provider>,
			document.getElementById('app')
		);
	});
}
