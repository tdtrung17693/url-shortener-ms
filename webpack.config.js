const path = require('path')
const fs = require('fs')
const DeepMerge = require('deep-merge')

const outputDir = 'dist'
const nodeModules = {}

fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach((mod) => {
    nodeModules[ mod ] = 'commonjs ' + mod
  })

const deepmerge = DeepMerge(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source)
  }
  return source
})

let defaultConfig = {
  entry: './src/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, outputDir),
    filename: 'backend.js'
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
}

if (process.env.NODE_ENV !== 'production') {
  defaultConfig.mode = 'development'
  defaultConfig.devtool = 'sourcemap'
} else {
  defaultConfig.mode = 'production'
}

module.exports = defaultConfig