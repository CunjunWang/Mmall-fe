let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

let getHtmlConfig = function (name, title) {
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        // favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};
// webpack config
let config = {
        mode: WEBPACK_ENV === 'dev' ? 'development' : 'production',
        entry: {
            'common': './src/page/common/index.js',
            'index': './src/page/index/index.js',
            // 'list': './src/page/list/index.js',
            // 'detail': './src/page/detail/index.js',
            // 'cart': './src/page/cart/index.js',
            // 'order-confirm': './src/page/order-confirm/index.js',
            // 'order-list': './src/page/order-list/index.js',
            // 'order-detail': './src/page/order-detail/index.js',
            // 'payment': './src/page/payment/index.js',
            'user-login': './src/page/user-login/index.js',
            'user-register': './src/page/user-register/index.js',
            'user-pass-reset': './src/page/user-pass-reset/index.js',
            'user-center': './src/page/user-center/index.js',
            'user-center-update': './src/page/user-center-update/index.js',
            'user-pass-update': './src/page/user-pass-update/index.js',
            'result': './src/page/result/index.js',
            // 'about': './src/page/about/index.js',
        },
        output: {
            path: __dirname + '/dist/',
            publicPath: '/dist/',
            filename: 'js/[name].js'

        },
        externals: {
            'jquery': 'window.jQuery'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.string$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeAttributeQuotes: false
                        }
                    }
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 2048,
                                name: 'resource/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: 'resource/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                node_modules: __dirname + '/node_modules',
                util: __dirname + '/src/util',
                page: __dirname + '/src/page',
                service: __dirname + '/src/service',
                image: __dirname + '/src/image'
            }
        },
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    common: {
                        name: "common",
                        chunks: "all",
                        minChunks: 2
                    }
                }
            }
        },
        plugins: [
            new MiniCssExtractPlugin
            ({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin(getHtmlConfig('index', 'Index')),
            // new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
            // new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
            // new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
            // new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
            // new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
            // new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
            // new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
            new HtmlWebpackPlugin(getHtmlConfig('user-login', 'Login')),
            new HtmlWebpackPlugin(getHtmlConfig('user-register', 'Register')),
            new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', 'Reset Password')),
            new HtmlWebpackPlugin(getHtmlConfig('user-center', 'User Center')),
            new HtmlWebpackPlugin(getHtmlConfig('user-center-update', 'Update Personal Info')),
            new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', 'Update Password')),
            new HtmlWebpackPlugin(getHtmlConfig('result', 'Result')),
            // new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),
        ],
        devServer: {
            port: 8088,
            inline:
                true,
            proxy:
                {
                    '**/*.do':
                        {
                            target: 'http://test.happymmall.com',
                            changeOrigin:
                                true
                        }
                }
        }

    }
;

module.exports = config;