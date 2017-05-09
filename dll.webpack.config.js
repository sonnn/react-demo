var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: process.cwd(),
	entry: {
		'library': [
			'react',
			'react-dom',
      'react-router-dom',
			'bluebird',
			'core-decorators',
		],
	},

	output: {
		filename: '[name].dll.js',
		path: path.join(__dirname, './public/dist/lib'),
		library: '[name]',
	},

	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.join(__dirname, './public/dist/lib', '[name]-manifest.json')
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};
