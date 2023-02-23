/* eslint-disable */
const nodeEnv = process.env.NODE_ENV;
const publicPath = process.env.VUE_APP_PATH;
const outputDir = 'dist';
const filenameHashing = nodeEnv === 'production';
console.log(`Node env: ${nodeEnv}`);
console.log(`Publish path: ${publicPath}`);
console.log(`Output dir: ${outputDir}`);
console.log(`File name hashing: ${filenameHashing}`);
module.exports = {
  outputDir,
  publicPath,
  filenameHashing,
  configureWebpack: {
  },
  devServer: {
    disableHostCheck: true,
    port: 8188,
    public: '127.0.0.1:8188',
    proxy: {
      '^/api': {
        target: 'https://localhost:7254',
        secure: false,
        pathRewrite: {
          '^/api': '/api',
        },
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive',
        },
      },
    },
  },
};
/* eslint-enable */

