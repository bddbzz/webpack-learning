/* eslint-disable no-console */
import { join } from 'path';
import { renderFile } from 'ejs';
import config, { output } from './webpack.prod.js';

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const express = require('express');
const webpack = require('webpack');

const compiler = webpack(config);
const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: output.publicPath,
    // writeToDisk: true
  }),
);

app.use(webpackHotMiddleware(compiler, {}));

const PORT = 4000;

// const staticDir = join(__dirname, '../dist');
// app.use(express.static(staticDir))
app.engine('html', renderFile);
app.set('views', join(__dirname, '../src'));
app.set('view engine', 'html');
app.get('/', (req, res) => {
  res.render('search');
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
