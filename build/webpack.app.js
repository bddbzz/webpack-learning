/* eslint-disable no-console */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const HTMLWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, '../src/pages/*/index.js'));
  entryFiles.forEach((entryFile) => {
    const match = entryFile.match(/src\/pages\/(.*?)\/index\.js$/);
    const pageName = match && match[1];
    if (!pageName) {
      return;
    }
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(new HTMLWebpackPlugin({
      template: path.resolve(__dirname, `../src/pages/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    }));
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const {
  entry,
  htmlWebpackPlugins,
} = setMPA();

// console.table(entry);

module.exports = {
  entry,
  module: {
    rules: [{
      test: /\.txt$/,
      use: 'raw-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader'],
    }, {
      test: /\.(png|jpg|gif|jpeg|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'assets/[name]_[hash:8].[ext]',
        },
      }],
    }, {
      test: /\.(woff2|woff|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/[name]_[hash:8].[ext]',
        },
      }],
    }],
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../src/assets/'),
    },
    extensions: ['.js', '.json'],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin()
    new HTMLWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
};
