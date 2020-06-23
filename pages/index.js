import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Converter from '../components/home/Converter'
import Introduce from '../components/home/Introduce'
import Upfile from '../components/home/Upfile'
import { File, GlobalContext } from '../until/store/store' //引入File组件
import { useState } from 'react'

export default function Home() {
  const [isShowDropDownMenu,setIsShowDropDownMenu] = useState(false);
  const handleCloseAll = () => {
    setIsShowDropDownMenu(false);
  }
  const handleOpenOne = () => {
    setIsShowDropDownMenu(true);
  }
  return (
    <div className="container" onClick={()=>handleCloseAll()}>
      <Head>
        <title>九云图-API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <GlobalContext.Provider value={{isShowDropDownMenu,handleOpenOne}}>
        <File>
          <Converter />
          <Upfile />
          <Introduce />
        </File>
      </GlobalContext.Provider>
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
          src: url('/font/iconfont.eot?t=1592559992177'); /* IE9 */
          src: url('/font/iconfont.eot?t=1592559992177#iefix') format('embedded-opentype'), /* IE6-IE8 */
          url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
          url('/font/iconfont.woff?t=1592559992177') format('woff'),
          url('/font/iconfont.ttf?t=1592559992177') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
          url('/font/iconfont.svg?t=1592559992177#iconfont') format('svg'); /* iOS 4.1- */
        }

        .iconfont {
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .icon-banshou:before {
          content: "\e65c";
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
