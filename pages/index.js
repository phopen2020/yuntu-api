import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Converter from '../components/home/Converter'
import Introduce from '../components/home/Introduce'
import Upfile from '../components/home/Upfile'
import { File} from '../until/store/store' //引入File组件


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>九云图-API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <File>
        <Converter />
        <Upfile />
        <Introduce />
      </File>
      <Footer />

      <style jsx global>{`
        /**
         * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
         * http://cssreset.com
         */
        
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video{
          margin: 0;
          padding: 0;
          border: 0;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section{
          display: block;
        }
        ol, ul, li{
          list-style: none;
        }
        blockquote, q{
          quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after{
          content: '';
          content: none;
        }
        table{
          border-collapse: collapse;
          border-spacing: 0;
        }
        
        /* custom */
        a{
          text-decoration: none;
          -webkit-backface-visibility: hidden;
        }
        ::-webkit-scrollbar{
          width: 5px;
          height: 5px;
        }
        ::-webkit-scrollbar-track-piece{
          background-color: rgba(0, 0, 0, 0.2);
          -webkit-border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:vertical{
          height: 5px;
          background-color: rgba(125, 125, 125, 0.7);
          -webkit-border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:horizontal{
          width: 5px;
          background-color: rgba(125, 125, 125, 0.7);
          -webkit-border-radius: 6px;
        }
        html, body{
          width: 100%;
          font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", "微软雅黑", sans-serif;
        }
        body{
          line-height: 1;
          -webkit-text-size-adjust: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        html{
          overflow-y: scroll;
          font-size:14px;
        }
        
        /*清除浮动*/
        .clearfix:before,
        .clearfix:after{
          content: " ";
          display: inline-block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
        .clearfix{
          *zoom: 1;
        }
        
        /*隐藏*/
        .dn{
          display: none;
        }


        /*
         * iconfont.css
         */
        @font-face {font-family: "iconfont";
          src: url('/font/iconfont.eot?t=1592213130939'); /* IE9 */
          src: url('/font/iconfont.eot?t=1592213130939#iefix') format('embedded-opentype'), /* IE6-IE8 */
          url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
          url('/font/iconfont.woff?t=1592213130939') format('woff'),
          url('/font/iconfont.ttf?t=1592213130939') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
          url('/font/iconfont.svg?t=1592213130939#iconfont') format('svg'); /* iOS 4.1- */
        }

        .iconfont {
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .icon-iconfonti:before {
          content: "\e62b";
        }

        .icon-sousuosearch82:before {
          content: "\e6d1";
        }

        .icon-xunhuan:before {
          content: "\e636";
        }

        .icon-guanbi:before {
          content: "\e630";
        }

        .icon-wendang:before {
          content: "\e617";
        }

        .icon-wenjian:before {
          content: "\e638";
        }

        .icon-anquan:before {
          content: "\e627";
        }

        .icon-icon-:before {
          content: "\e61a";
        }

        .icon-tianjiawenjian:before {
          content: "\e664";
        }

        .icon-doc-s:before {
          content: "\e64e";
        }

        .icon-view:before {
          content: "\e607";
        }

        .icon-url:before {
          content: "\e79c";
        }

        .icon-xiala:before {
          content: "\e656";
        }

        .icon-apigatewayAPIwangguan:before {
          content: "\e712";
        }

      `}</style>
    </div>
  )
}
