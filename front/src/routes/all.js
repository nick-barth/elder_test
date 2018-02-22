import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './app.js';
import LandingIndex from './index.js';
import FourOhFour from './fourohfour/index.js';

function Routes () {
	return (
		<Router>
			<App>
				<section>
					<Switch>
						<Route exact path="/" component={LandingIndex}/>
						<Route component={FourOhFour} />
					</Switch>
				</section>
			</App>
		</Router>
	);
}

export default Routes;
