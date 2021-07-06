/* eslint consistent-return:0 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const resolve = require('path').resolve;

const argv = require('./argv');

const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const app = express();

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || 'http://localhost'; // Let http.Server use its default IPv6/4 host

app.use('/api', createProxyMiddleware({ target: host, changeOrigin: true }));
app.listen(port);
