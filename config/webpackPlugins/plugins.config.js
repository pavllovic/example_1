const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlagin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BabelEsmPlugin = require('babel-esm-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const { BabelMultiTargetPlugin } = require('webpack-babel-multi-target-plugin');
// const { WebpackNoModulePlugin } = require('webpack-nomodule-plugin');

const isDev = process.env.NODE_ENV === 'development';

const compressionPlugin = new CompressionPlugin({
  test: [/\.js$/i, /\.css$/i]
});

const scriptExtHtmlWebpackPlugin = new ScriptExtHtmlWebpackPlugin({
  custom: [
    {
      test: /legacy[\\/].*\.js$/,
      attribute: 'nomodule',
    },
    {
      test: /modern[\\/].*\.js$/,
      attribute: 'type',
      value: 'module'
    },
  ]
});

const babelEsmPlugin = new BabelEsmPlugin({
  filename: isDev? 'js/modern/es6.[name].js' : 'js/modern/[contenthash].es6.[name].js',
  chunkFilename: isDev? 'js/modern/es6.[name].js' :'js/modern/[contenthash].es6.[name].js',
});

// const htmlWebpackSkipAssetsPlugin = new HtmlWebpackSkipAssetsPlugin({
//   excludeAssets: [/style\.js$/, /(about|article|blog)\.js$/]
// });

const htmlWebpackPlagin = new HtmlWebpackPlagin({
  title: 'site title',
  filename: 'index.html',
  template: './src/template/index.pug',
  chunks: ['index'],
  inject: 'body',
  scriptLoading: 'defer',
  minify: {
    collapseWhitespace: !isDev,
    collapseInlineTagWhitespace: !isDev,
    minifyCSS: !isDev,
    minifyJS: !isDev
  },
})

const cleanWebpackPlugin = new CleanWebpackPlugin();

const stylelintPlugin = new StylelintPlugin({
  configFile: path.resolve(__dirname, '../stylelint.config.js'),
  files: 'src/**/*.css',
  fix: true
})

const eslintPlugin = new ESLintPlugin({
  files: 'src/**/*.js',
  overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
  lintDirtyModulesOnly: true
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: isDev? 'css/[name].css' : 'css/[contenthash].[name].css',
  chunkFilename: isDev? 'css/[id].css' : 'css/[contenthash].[id].css'
})

// const babelMultiTargetPlugin = new BabelMultiTargetPlugin(
//   {
//     babel: {
//       presetOptions: {
//         useBuiltIns: 'usage',
//         corejs: 3
//       }
//     },
//     targets: {
//       modern : {
//         browsers: [
//           'Edge >= 80',
//           'Firefox >= 69',
//           'Chrome >= 67',
//           'Safari >= 11',
//           'Opera >= 54'
//         ],
//         tagAssetsWithKey: false,
//         esModule: true
//       },
//       legacy: {
//         browsers: [
//           'defaults'
//         ],
//         tagAssetsWithKey: true,
//         key: 'legacy',
//         noModule: true
//       }
//     }
//   }
// );

module.exports = {
  miniCssExtractPlugin: miniCssExtractPlugin,
  htmlWebpackPlagin: htmlWebpackPlagin,
  stylelintPlugin: stylelintPlugin,
  eslintPlugin: eslintPlugin,
  // babelMultiTargetPlugin: babelMultiTargetPlugin,
  cleanWebpackPlugin: cleanWebpackPlugin,
  compressionPlugin: compressionPlugin,
  babelEsmPlugin: babelEsmPlugin,
  scriptExtHtmlWebpackPlugin: scriptExtHtmlWebpackPlugin, 
};
