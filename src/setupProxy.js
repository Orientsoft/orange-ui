const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/hjy',
    proxy({
      target: 'http://47.111.11.236:9003',
      "changeOrigin": true,
      "secure": false
    })
  );
};