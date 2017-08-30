const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');
const url = require('url');
let options = require('./config/build.js');
let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new ExtractTextPlugin({filename: '[name].[hash:5].css', allChunks: true})
]
plugins = plugins.concat(options.plugins)

module.exports = () => ({
    entry: {
        vendor: ['vue','vue-router','axios','element-ui','jquery','echarts'],
        index: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: options.filename,
        chunkFilename: '[id].[chunkhash:7].js?',
        publicPath: options.publicPath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less:  'vue-style-loader!css-loader!less-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // include:['/node_modules/_element-theme@0.7.2@element-theme','/node_modules/_element-theme-default@1.4.2@element-theme-default','/node_modules/_element-ui@1.4.2@element-ui'],
                // exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                loaders: 'less-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join(options.staticPath, 'image/[name].[hash:7].[ext]')
                    }
                }]

            },
            {
                test: /\.mp3$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join(options.staticPath, 'mp3/[name].[ext]')
                    }
                }]

            }
        ]
    },
    plugins: plugins,
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'assets': path.resolve('src', 'assets'), //资源目录 "~assets"
            'style': path.resolve('src', 'style'), //样式目录 "~style"
            'api': path.resolve('src', 'api'), //api请求目录 "api"
            'views': path.resolve('src', 'views'), //视图目录 "views"
            'utils': path.resolve('src', 'utils') //视图目录 "utils"
        }
    },
    devServer: {
        host: '192.168.10.160',
        port: 8010,
        proxy: {
            '/api': {
                target: 'http://192.168.10.26:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        historyApiFallback: {
            index: options.publicPath
        }
    },
    devtool: options.devtool
});