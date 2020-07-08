import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
const Price = () => {
    return (
        <div className="container"  id="price-container">
            <Head>
                <title>九云图-API</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            price页面
            <Footer />
            <style jsx>{`
                #api-container {
                    min-height:100vh;
                    display:flex;
                    flex-direction:column;
                }
            `}</style>
        </div>
    )
}
export default Price;