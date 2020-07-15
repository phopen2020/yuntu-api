import IconFont from './IconFont';
const Footer = () => {
    const bgColor = "#f2f2f2";
    const fontColor = "#202020";
    const navColor = "#b53836";
    const yuntu = 'yuntuApi';
    const namespace = 'footer';
    const navList = [
        {
            column:"1",
            title:"公司",
            childTitle:["关于我们","安全"]
        },
        {
            column:"2",
            title:"资源",
            childTitle:["博客","状态"]
        },
        {
            column:"3",
            title:"法律",
            childTitle:["隐私","条款"]
        },
        {
            column:"4",
            title:"联系",
            childTitle:["联系我们","icon"]
        }
    ];
    return (
        <div className="container" id="footer-container">
            <footer>
                <div className="footer-content">
                    <div className="content-nav">
                        {
                            navList.map(item=>(
                            <ul className="nav-list" key={yuntu + namespace + item.column}>
                                <li>{item.title}</li>
                                {
                                    item.childTitle.map((item,index)=>(
                                        <li className="nav-items" key={yuntu + namespace + index + 'nav'}>{item==='icon'?<IconFont type='icon-yunduo'/>:item}</li>
                                    ))
                                }
                            </ul>
                            ))
                        }
                    </div>
                    <div className="content-mark">
                        <p className="mark-1">©2020 Lunaweb GmbH</p>
                        <p className="mark-2">德国慕尼黑制造</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>我们已经转换了0文件 ，总大小为0TB。</p>
                </div>
            </footer>
            <style jsx>{`
                #footer-container{
                    flex:1;
                }
                .container{
                    width:100%;
                    background:${bgColor};
                    color:${fontColor};
                    line-height: 1;
                }
                footer{
                    width:1140px;
                    box-sizing:border-box;
                    padding:6px;
                    margin-left:auto;
                    margin-right:auto;
                }
                .footer-content{
                    display:flex;
                } 
                .footer-content .content-nav{
                    display:flex;
                    align-items:center;
                    width:66.74rem;
                }     
                .content-nav .nav-list{
                    width:120px;
                    padding:0 15px;
                    margin:15px 10px 0 0;
                    box-sizing: border-box;
                    list-style: none;
                }   
                .content-nav .nav-list li{
                    padding:0 0 7.5px;
                    font-size:15px;
                    line-height:20px;
                    font-weight:600;
                }
                .content-nav .nav-list li.nav-items{
                    font-weight:400;
                    color:${navColor};
                }
                .footer-content .content-mark{
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    width:14.68rem;
                    text-align:right;
                    line-height:20px;
                    padding:0 15px;
                }
                .content-mark .mark-1{
                    margin-bottom: 0;
                }
                .content-mark .mark-2{
                    color:#a5a5a5;
                    margin-bottom: 0;
                }
                .footer-bottom{
                    text-align:center;
                    color:#a5a5a5;
                    font-size:21px;
                }
                .footer-bottom p{
                    margin:20px 0 30px 0;
                }
            `}</style>
        </div>
    )
}
export default Footer;