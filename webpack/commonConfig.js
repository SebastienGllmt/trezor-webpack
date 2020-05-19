const path = require('path');
const ConfigWebpackPlugin = require('config-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const plugins = (folder) => {
  const pageTitle = 'Trezor Webpack';

  return [
    /**
     * We use the HtmlWebpackPlugin to group back together the chunks inside the HTML
     * and with dynamic page title
     */
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, `../${folder}/main_window.html`),
      template: path.join(__dirname, '../chrome/views/main_window.html'),
      chunks: ['front'],
      alwaysWriteToDisk: true,
      title: pageTitle,
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, `../${folder}/background.html`),
      template: path.join(__dirname, '../chrome/views/background.html'),
      chunks: ['background'],
      alwaysWriteToDisk: true
    }),
    /**
     * This plugin adds `alwaysWriteToDisk` to `HtmlWebpackPlugin`.
     * We need this otherwise the HTML files are managed by in-memory only by our hot reloader
     * But we need this written to disk so the extension can be loaded by Chrome
     */
    new HtmlWebpackHarddiskPlugin(),
    // populates the CONFIG global based on ENV
    new ConfigWebpackPlugin(),
  ];
};

const rules = (_isDev) => [
];


const optimization = {
  // https://github.com/webpack/webpack/issues/7470
  nodeEnv: false,
  splitChunks: {
    // the default delimiter ~ doesn't work with Terser
    automaticNameDelimiter: '_',
    chunks: 'all',
    // Firefox require all files to be <4MBs
    maxSize: 4000000,
  }
};

const node = {
  fs: 'empty'
};

const resolve = () => ({
  extensions: ['*', '.js', '.jsx'],
});

const definePlugin = (
  networkName,
  isProd,
) => ({
  'process.env': {
    NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
  }
});

module.exports = {
  plugins,
  rules,
  optimization,
  node,
  resolve,
  definePlugin,
};
