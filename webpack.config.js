const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const url = require('url');
let options = process.env.NODE_ENV === 'production' ? require('./config/build.js') : require('./config/dev.js');
let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    })
]
plugins = plugins.concat(options.plugins)

module.exports = () => ({
    entry: {
        vendor: './src/vendor',
        index: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: options.filename,
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.publicPath
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: 'vue-style-loader!css-loader!less-loader'
                    }

                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
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