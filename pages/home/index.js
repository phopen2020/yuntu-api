import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Converter from '../../components/home/Converter'
import Introduce from '../../components/home/Introduce'
import Upfile from '../../components/home/Upfile'
import { Yuntu, GlobalContext } from '../../store/store' //引入File组件
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
    <div className="container" id="index-container" onClick={()=>handleCloseAll()}>
      <Head>
        <title>九云图-API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GlobalContext.Provider value={{isShowDropDownMenu,handleOpenOne}}>
        <Yuntu>
          <Header />
          <Converter />
          <Upfile />
          <Introduce />
          <Footer />
        </Yuntu>
      </GlobalContext.Provider>

      <style jsx>{`
        #index-container {
          min-height:100vh;
          display:flex;
          flex-direction:column;
        }
      `}</style>
    </div>
  )
}
