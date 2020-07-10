const withCss = require('@zeit/next-css')
if(typeof require !==  'undefined'){
    require.extensions['.css']=file=>{}
}
module.exports = withCss({})
module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/home': { page: '/home' },
      '/api': { page: '/yuntuAPI' },
      '/price': { page: '/price' },
    }
  }
}