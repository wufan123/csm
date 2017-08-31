const webpack = require('webpack');
module.exports = {
    publicPath:'',
    filename:'[name].develop.js',
    staticPath:'assets',
    plugins:[
        new webpack.DefinePlugin({//运行时变量
            _BASE_URL:JSON.stringify('api/'),
            _MOCK:false,//模拟数据
            _WEBSOCKET:JSON.stringify('ws://192.168.10.26'),
            _WEBSOCKET_PORT:JSON.stringify(':8080')
        })
    ],
    devtool:'#eval-source-map'//#source-map
}