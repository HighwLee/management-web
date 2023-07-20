const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/userApi': {
        target:"http://localhost:8082/user", //填写请求的目标地址
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/userApi': '' ,//请求的时候使用这个api就可以
        },
        logLevel: 'debug',
      }
    },
    open: true,
  },
}
