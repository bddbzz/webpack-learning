/* eslint-disable no-debugger */
if (typeof window === 'undefined') {
  global.window = {};
}
const express = require('express');
const { renderToString } = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const data = require('./data.json');
const SSR = require('../dist/search_server.js');

const template = fs.readFileSync(
  path.join(__dirname, '../dist/search.html'),
  'utf-8',
);
const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data);
  return template
    .replace('<!--HTML_PLACEHOLDER-->', str)
    .replace(
      '<!--INITIAL_DATA_PLACEHOLDER-->',
      `<script>window.__initial_data = ${dataStr};</script>`,
    );
};

const createServer = (port) => {
  const app = express();

  app.use(express.static('dist'));
  app.get('/search', (req, res) => {
    res.status(200).send(renderMarkup(renderToString(SSR)));
  });
  app.listen(port, () => {
    console.log('Server is running on port:', port);
  });
};

createServer(process.env.PORT || 3001);
