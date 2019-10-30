const path = require('path');

module.exports = {
	/* en entrée */
	entry: './js/main.js',
	/* en sortie */
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'main.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/, /* tous les fichiers .js */
				exclude: /node_modules/, /* sauf le dossier node_modules */
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	devtool: 'source-map'
};
