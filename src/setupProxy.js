const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/products',
    createProxyMiddleware({
      target: "https://iwing-buoyserver-beta.vercel.app",
      changeOrigin: true,
    })
  );
};