const HtmlWebpackPlugin = require("html-webpack-plugin") // Require  html-webpack-plugin plugin

module.exports = {
	entry: __dirname + "/index.js", // webpack entry point. Module to start building dependency graph
	output: {
		path: __dirname + "/dist", // Folder to store generated bundle
		filename: "bundle.js", // Name of generated bundle after build
		publicPath: "/" // public URL of the output directory when referenced in a browser
	},
	module: {
		// where we defined file patterns and their loaders
		rules: []
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/index.html",
			inject: "body"
		})
	],
	devServer: {
		contentBase: "./",
		port: 7700
	}
}
