const webpack = require('webpack');
var merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')
module.exports = merge.smart(baseWebpackConfig, {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // include:['/node_modules/_element-theme@0.7.2@element-theme','/node_modules/_element-theme-default@1.4.2@element-theme-default','/node_modules/_element-ui@1.4.2@element-ui'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({//运行时变量
            _BASE_URL: JSON.stringify('api/'),
            _MOCK: false,//模拟数据
            _WEBSOCKET: JSON.stringify('ws://192.168.10.26'),
            _WEBSOCKET_PORT: JSON.stringify(':8080')
        })
    ],
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
        }
    },
    devtool: '#eval-source-map'//#source-map
})