// Dependencies
const path = require('path');
const webpack = require('webpack');

// Config
const ENTRY_POINT = path.resolve(__dirname, 'src/') + '/app.js';
const HRM_HOST = '0.0.0.0';
const HRM_PORT = 8777;

process.traceDeprecation = true;

/*
 * Config
 */
const config = {
	entry: [
		'webpack/hot/only-dev-server',
		`webpack-dev-server/client?http://${HRM_HOST}:${HRM_PORT}`,
		ENTRY_POINT
	],
	output: {
		path: path.resolve(__dirname, '../server/files/assets/js/'),
		publicPath: `http://${HRM_HOST}:${HRM_PORT}/`,
		filename: 'bundle.js',
		pathinfo: true
	},
	module: {
		// Transform in ES6 + plugins
		// Causes parse query deprecation
		// issue here: https://github.com/babel/babel-loader/pull/416
		loaders: [{
			test: /.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				plugins: [
					['transform-decorators-legacy']
				],
				presets: ['es2015', 'stage-0', 'react'],
				cacheDirectory: false
			}
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}
		]
	},

	// Make sure webpack can match/find everything
	resolve: {
		modules: ['./node_modules', './src'],
		extensions: ['.js', '.jsx']
	},

	// Dev server config
	devServer: {
		port: HRM_PORT,
		contentBase: '/',
		hot: true,
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(), // Prevent compilation if error are found
		new webpack.optimize.OccurrenceOrderPlugin(), // Trying this, not sure if needed/better on dev
		new webpack.HotModuleReplacementPlugin(), // Enables HRM
		new webpack.NamedModulesPlugin() // Use module path + name insted of random number
	]

};

module.exports = config;
