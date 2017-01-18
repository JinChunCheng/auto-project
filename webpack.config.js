var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: ["./app/js/index"],
    output: {
        path: path.resolve(__dirname + "./dist/"),
        filename: "/js/index.[hash:8].js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        }],
        resolve: {
            // require时省略的扩展名，如：require('module') 不需要module.js
            extensions: ['', '.js', '.vue'],
            //别名
            alias: {}
        },
        plugins: [
            new webpack.NoErrorsPlugin(),
            new HtmlWebpackPlugin({
                template: "./app/index.html", //原始模板
                filename: "./dist/index.html", //输出新文件
                inject: true, //| 'head' | 'body' | false ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 
                //或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
                minify: { //压缩HTML文件
                    removeComments: true, //移除HTML中的注释
                    collapseWhitespace: true, //删除空白符与换行符
                    hash: true //用来解决缓存问题很有用
                }
            }),
            //webpack已经内嵌了uglifyJS来完成对JS与CSS的压缩混淆，无需引用额外的插件。
            new webpack.optimize.UglifyJsPlugin({ //压缩代码
                compress: {
                    warnings: false
                },
                except: ['$super', '$', 'exports', 'require'] //排除关键字
            })
        ]
    }
}
