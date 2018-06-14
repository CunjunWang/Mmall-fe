const path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

// env
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// get html webpack plugin parameter
let getHtmlConfig = function (name) {
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

// webpack configure
let config = {
    entry: {
        common: ['./src/page/common/index.js'],
        index: ['./src/page/index/index.js'],
        login: ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            }
        ]
    },
    plugins: [
        // common modules to js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),

        // pack css
        new ExtractTextPlugin('css/[name].css'),

        // html template
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]

};

if(WEBPACK_ENV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;