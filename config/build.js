const webpack = require('webpack');
module.exports =  {
    publicPath:'',
    filename:'[name].js?[chunkhash]',//
    staticPath:'assets',
    plugins:[
        new webpack.DefinePlugin({//运行时变量
            BASE_URL:JSON.stringify('api/')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}