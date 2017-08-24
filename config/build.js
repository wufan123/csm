const webpack = require('webpack');
module.exports =  {
    publicPath:'',
    filename:'[name].js?[hash:7]',//
    staticPath:'assets',
    plugins:[
        new webpack.DefinePlugin({//运行时变量
            _BASE_URL:JSON.stringify('api/'),
            _MOCK:false//模拟数据
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}