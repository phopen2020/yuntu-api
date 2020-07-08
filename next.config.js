const withCss = require('@zeit/next-css')
if(typeof require !==  'undefined'){
    require.extensions['.css']=file=>{}
}
module.exports = withCss({})
module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/home': { page: '/home' },
      '/yuntuAPI': { page: '/yuntuAPI' },
      '/price': { page: '/price' },
      /* '/DOC': { page: '/', query: { finalType: 'DOC' } },
      '/PDF': { page: '/', query: { finalType: 'PDF' } },
      '/XLS': { page: '/', query: { finalType: 'XLS' } },
      '/CAJ': { page: '/', query: { finalType: 'CAJ' } },
      '/DWG': { page: '/', query: { finalType: 'DWG' } },
      '/PPT': { page: '/', query: { finalType: 'PPT' } },
      '/TXT': { page: '/', query: { finalType: 'TXT' } },
      '/JPG': { page: '/', query: { finalType: 'JPG' } },
      '/PNG': { page: '/', query: { finalType: 'PNG' } },
      '/GIF': { page: '/', query: { finalType: 'GIF' } },
      '/DOC-to-在线文档': { page: '/', query: { finalType: 'DOC-to-在线文档' } },
      '/DOC-to-PDF': { page: '/', query: { finalType: 'DOC-to-PDF' } },
      '/DOC-to-JPG': { page: '/', query: { finalType: 'DOC-to-JPG' } },
      '/DOC-to-PNG': { page: '/', query: { finalType: 'DOC-to-PNG' } },
      '/DOC-to-二维码': { page: '/', query: { finalType: 'DOC-to-二维码' } },
      '/DOC-to-HTML5': { page: '/', query: { finalType: 'DOC-to-HTML5' } },
      '/PDF-to-在线文档': { page: '/', query: { finalType: 'PDF-to-在线文档' } },
      '/PDF-to-DOC': { page: '/', query: { finalType: 'PDF-to-DOC' } },
      '/PDF-to-JPG': { page: '/', query: { finalType: 'PDF-to-JPG' } },
      '/PDF-to-PNG': { page: '/', query: { finalType: 'PDF-to-PNG' } },
      '/PDF-to-二维码': { page: '/', query: { finalType: 'PDF-to-二维码' } },
      '/PDF-to-HTML5': { page: '/', query: { finalType: 'PDF-to-HTML5' } },
      '/XLS-to-在线文档': { page: '/', query: { finalType: 'XLS-to-在线文档' } },
      '/XLS-to-DOC': { page: '/', query: { finalType: 'XLS-to-DOC' } },
      '/XLS-to-PDF': { page: '/', query: { finalType: 'XLS-to-PDF' } },
      '/XLS-to-JPG': { page: '/', query: { finalType: 'XLS-to-JPG' } },
      '/XLS-to-PNG': { page: '/', query: { finalType: 'XLS-to-PNG' } },
      '/XLS-to-二维码': { page: '/', query: { finalType: 'XLS-to-二维码' } },
      '/XLS-to-HTML5': { page: '/', query: { finalType: 'XLS-to-HTML5' } } */
    }
  }
}