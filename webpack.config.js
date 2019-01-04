/**
 * Created by hasee on 2018/3/19.
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //压缩js，并配置sourceMap

module.exports = env => {
  if (!env) {
    env = {}
  }
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './app/views/index.html'
    })
  ]
  if (env.production) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: 'production'
        }
      }),
      new ExtractTextPlugin('style.css'),
      new UglifyJsPlugin({
        sourceMap: true //开启sourceMap
      })
    ) //抽取css
  }
  return {
    entry: ['./app/js/viewport.js', './app/js/main.js'],
    devtool: 'source-map',
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            cssModules: {
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              camelCase: true
            },
            loaders: env.production
              ? {
                  css: ExtractTextPlugin.extract({
                    use:
                      'css-loader?minimize!px2rem-loader?remUnit=75&remPrecision=8',
                    fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                  }),
                  scss: ExtractTextPlugin.extract({
                    use:
                      'css-loader?minimize!px2rem-loader?remUnit=75&remPrecision=8!sass-loader',
                    fallback: 'vue-style-loader'
                  })
                }
              : {
                  css:
                    'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8',
                  scss:
                    'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8!sass-loader'
                },
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true
          }
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9090,
      overlay: true
    },
    plugins,
    resolve: {
      //配置可省略的文件后缀名
      extensions: ['.js', '.json', '.vue', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
