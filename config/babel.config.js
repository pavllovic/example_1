module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      bugfixes: true
    }]
  ],
  // plugins: [
  //   ["@babel/plugin-transform-runtime", {corejs: 3}]
  // ]
}