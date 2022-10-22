module.exports = {
    assetsDir: "static",
    devServer: {  // 跨域配置
        proxy: {
            '/api/v1': {
              target: 'http://127.0.0.1:8081',
              changeOrigin: true,
            }
        }
    }
  }
