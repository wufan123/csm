const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
export default {
    publicPath:'',
    filename:'[name].js?[chunkhash]',//
    staticPath:'assets',
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({//运行时变量
            BASE_URL:JSON.stringify('api/')
        })
    ],
    devtool:'#source-map'//

}