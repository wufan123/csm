const webpack = require('webpack');
var merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = merge(baseWebpackConfig, {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: '[name].[hash:5].css', allChunks: true}),
        new webpack.DefinePlugin({//运行时变量
            _BASE_URL: JSON.stringify('api/'),
            _MOCK: false,//模拟数据,
            _WEBSOCKET: 'null',
            _WEBSOCKET_PORT: JSON.stringify(':29188')
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],
})