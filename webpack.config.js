var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'public/build');

module.exports = {

    entry: path.resolve(ROOT_PATH, 'public/js/index.js'),

	output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },

    devtool: 'source-map',
	devServer: {
		hot: true,
        inline: true,
		progress:true,
        contentBase: path.join(__dirname, "public"),
        host:'localhost',
        port:'8090'
	},

    //babel的loader配置】
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['es2015', 'react']}
            },
            {
			     test: /\.css$/,loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
	  plugins: [
		new HtmlWebpackPlugin({
			template:'public/templates/index.html'
			}),
		new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
              $: "jquery",
              jquery: "jquery",
              "window.jQuery": "jquery",
              jQuery:"jquery",
             "Tether": "tether"
          })
	],

    resolve: {
        extensions: ['.css', '.js', '.jsx'],
    }

}