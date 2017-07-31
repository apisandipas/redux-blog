module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader' ,
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}
