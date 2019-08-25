const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/authenticate/', {
    target: `https://github.com`,
    pathRewrite: path => {
      return path.replace('/authenticate/', `/login/oauth/access_token?` +
        `client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=`)
    },
    changeOrigin: true
  }))
}
