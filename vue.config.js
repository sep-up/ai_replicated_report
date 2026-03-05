'use strict'
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const GenerateAppletversionWebpackPlugin = require('generate-appletversion-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const fs = require('fs')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = '渊联'
const port = process.env.port || process.env.npm_config_port || 8080

const plugins = [
//   // new GenerateAppletversionWebpackPlugin(),
//   new CopyWebpackPlugin([
//     {
//       from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'
//     },
//     {
//       from:
//         'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js',
//       to: 'js/'
//     },
//     { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf' }
//   ])
]
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CopyPlugin([
      {
        from: 'AppManifest.json',
        transform (content) {
          const config = JSON.parse(content.toString())
          config.versionCode += 1
          const str = JSON.stringify(config)
          fs.writeFileSync(path.join(__dirname, './AppManifest.json'), str)
          return str
        }
      }
    ])
  )
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '././',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_NGINX_PATH]: {
        target: process.env.VUE_APP_BASE_API,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_NGINX_PATH]: ''
        }
      }
    }
  },
  configureWebpack: {
    plugins,
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack (config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        minSize: 30000, // 字节 引入的文件大于30kb才进行分割
        minChunks: 1, // 模块至少使用次数
        maxAsyncRequests: 5, // 同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxInitialRequests: 3, // 首页加载的时候引入的文件最多3个
        automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
        name: true,
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
