module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  mode: 'development',
  watch: false
}