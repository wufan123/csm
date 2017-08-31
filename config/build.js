const webpack = require('webpack');
module.exports =  {
    publicPath:'',
    filename:'[name].[hash:7].js?',//
    staticPath:'assets',
    plugins:[
        new webpack.DefinePlugin({//运行时变量
            _BASE_URL:JSON.stringify('api/'),
            _MOCK:false,//模拟数据,
            _WEBSOCKET:'null',
            _WEBSOCKET_PORT:JSON.stringify(':29188')
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}