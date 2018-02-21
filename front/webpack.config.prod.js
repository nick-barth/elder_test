// Dependencies
const path = require('path');
const webpack = require('webpack');

// Config
const ENTRY_POINT = path.resolve(__dirname, 'src/') + '/app.js';

/*
 * Config
 */
const config = {
	entry: [
		ENTRY_POINT
	],
	output: {
		path: path.resolve(__dirname, '../server/assets/js'),
		filename: 'bundle.js',
		pathinfo: true
	},
	module: {

		// Transform in ES6 + plugins
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
		},  {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	},

	// Make sure webpack can match/find everything
	resolve: {
		modules: ['./node_modules', './src'],
		extensions: ['.js', '.jsx']
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin() // Trying this, not sure if needed/better on dev
	]
};

module.exports = config;
