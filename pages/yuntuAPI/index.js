import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Layout, Menu, Row, Col, Card } from 'antd';
const {  Header, Sider } = Layout;
const { SubMenu } = Menu;
import { MenuOutlined, HomeFilled, CompassFilled } from '@ant-design/icons';
import axios from 'axios';

const Api = (data) => {
    const [api, setApi] = useState({});
    const [doc, setDoc] = useState([]);
    const [navList, setNavList] = useState([]);
    const [openKeys, setOpenKeys] = useState(["总览"]);
    const [rootSubmenuKeys,setRootSubmenuKeys] = useState([]);

    const bgColor = "#202020";
    const fontColor = "#fff";

    const logoClick = () => {
        Router.push('/home');
    }
    const apiClick = () => {
        Router.push('/api');
    }
    const priceClick = () => {
        Router.push('/price');
    }

    useEffect(()=>{
        if(data.api){
            setApi(data.api);
            const apiList = data.api.apiList;
            setDoc(apiList[0]);
            const navNameList = []; 
            let nav = {};
            apiList.map((val,idx)=>{
                rootSubmenuKeys[idx] = val.title;
                setRootSubmenuKeys([...rootSubmenuKeys]);
                if(navNameList.length===0){
                    val.docList.map((item)=>{
                        navNameList.push({nav:item.nav,position:item.description.position});
                    }) 
                }
                nav = {
                    title: val.title,
                    docList: navNameList,
                }
                navList.push(nav);
            })
            setNavList([...navList]);
        }
    },[data]);

    function onOpenChange(keys){
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    function navClick(index){
        if(api.apiList){
            setDoc(api.apiList[index]);
        }
    }

    function getIcon(index){
        let icon;
        switch(index){
            case 0:
                icon = <HomeFilled />;
                break;
            case 1:
                icon = <CompassFilled />;
                break;
            default:
                icon = null;
                break;
        }
        return icon;
    }

    function setHeadMark(head){
        if(head && head.section){
            let article = head.section;
            let code = head.codeMark;
            let link = head.linkMark;
            if(article.length!==0){
                let arr = article.map((item)=>{
                    if(code.length!==0){
                        for(let i in code){
                            item = item.replace(code[i],"<span class='code-mark'>" + code[i] + "</span>");
                        }
                    }
                    if(link.length!==0){
                        for(let j in link){
                            item = item.replace(link[j],"<span class='link-mark'>" + link[j] + "</span>");
                        }
                    }
                    return item;
                });
                return arr;
            }
        }
        return false;
    }

    function setContentMark(content){
        if(content && content.section){
            let article = content.section;
            let code = content.codeMark;
            let link = content.linkMark;
            let bold = content.boldMark;
            if(article.length!==0){
                let brr = article.map((item)=>{
                    if(code.length!==0){
                        for(let i in code){
                            item = item.replace(code[i],"<span class='code-mark'>" + code[i] + "</span>");
                        }
                    }
                    if(link.length!==0){
                        for(let j in link){
                            item = item.replace(link[j],"<span class='link-mark'>" + link[j] + "</span>");
                        }
                    }
                    if(bold.length!==0){
                        for(let k in bold){
                            item = item.replace(bold[k],"<span class='bold-mark'>" + bold[k] + "</span>");
                        }
                    }
                    return item;
                });
                return brr;
            }
        }
        return false;
    }

    function hasLevel3(content){
        if(content.level3.isLevel3){

        }else{
            if(content.level3.tableList.length!==0){
                let tableArea = content.level3.tableList.map((table,index)=>(
                    <tr key={"table" + index + table.th} style={{width: '100%', fontSize:16, borderBottom: '1px solid rgba(0,0,0,0.03)'}}>
                        <th style={{padding: '5px 20px'}}>{table.th}</th>
                        <td style={{padding: '10px'}}>{table.td}</td>
                    </tr>
                ))
                return tableArea;
            }
        }
        return null;
    }

    return (
        <div className="container">
            <Head>
                <title>九云图 - API文档</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Layout style={{height: '100%'}}>
                <Header className="header" style={{color:fontColor,backgroundColor:bgColor}}>
                    <div className="header-left" onClick={()=>logoClick()}>
                        <div className="header-logo">
                            <img src="https://cloudconvert.com/images/logo_flat_110_borderless.png" />
                        </div>
                        <h2 className="header-text">cloudconvert</h2>
                    </div>
                    <div className="header-content">
                        <MenuOutlined className="header-icon" />
                        <ul className="header-nav">
                            <li className="nav-items" onClick={()=>apiClick()}>API</li>
                            <li className="nav-items" onClick={()=>priceClick()}>价钱</li>
                            <li className="nav-items">新闻</li>
                        </ul>
                    </div>
                    <div className="header-right">
                        <ul className="header-login">
                            <li className="login-items">注册</li>
                            <li className="login-items">登录</li>
                        </ul>
                    </div>
                </Header>
                <Layout style={{backgroundColor:'#ffffff',height: '100%'}}>
                    <div className="api-bg">
                        <Row>
                            <Col span={12}>
                                <div className="bg-left"></div>
                            </Col>
                            <Col span={12}>
                                <div className="bg-right"></div>
                            </Col>
                        </Row>
                    </div>
                    <Sider className="nav">
                        <Menu 
                            mode="inline"
                            openKeys={openKeys} 
                            onOpenChange={onOpenChange}
                            style={{width:'260px'}}
                        >
                            {
                                navList.length!==0
                                ?navList.map((menu,index)=>(
                                    <SubMenu
                                        key={menu.title}
                                        title={
                                            <span>
                                                {
                                                    getIcon(index)
                                                }
                                                <span style={{paddingLeft:'15px',fontSize:16}}>{menu.title}</span>
                                            </span>
                                        }
                                        onTitleClick={()=>navClick(index)}
                                    >
                                        {
                                            menu.docList.map((item,index)=><Menu.Item key={item.nav + index} className="menu-items"><a href={item.position}>{item.nav}</a></Menu.Item>)
                                        }
                                    </SubMenu>
                                ))
                                :null
                            }
                        </Menu>
                    </Sider>
                    <div className="content">
                        {
                            doc.length!==0?doc.docList.map((item,index)=>(
                                <section className="content-block" id={item.description.position.replace('#','')} key={item.description.position + index}>
                                    <h1 style={{fontSize:index===0?30:22}}>{item.description.title}</h1>
                                    <Row>
                                        <Col span={12}>
                                            <Card style={{backgroundColor:'#ffffff', marginRight: '.8rem', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '.1rem'}}>
                                                {
                                                    setHeadMark(item.description.head)?setHeadMark(item.description.head).map((p,index)=><p key={"headerMark"+index} dangerouslySetInnerHTML={{__html:p}}></p>):null
                                                }
                                                {
                                                    item.description.content.length!==0
                                                    ?item.description.content.map((content,index)=>(
                                                        <div key={content.title + index}>
                                                            <h3 style={{fontSize:17,margin:'45px 0 22px',fontWeight:600}}>{content.title}</h3>
                                                            <div>
                                                                {
                                                                    setContentMark(content)?setContentMark(content).map((p,index)=><p key={"contentMark"+index} dangerouslySetInnerHTML={{__html:p}}></p>):null 
                                                                }
                                                            </div>
                                                            <table className="content-table" style={{borderCollapse: 'collapse',width: '100%'}}>
                                                                <tbody>
                                                                    {
                                                                        hasLevel3(content)
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        )
                                                    )
                                                    :null
                                                }
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card style={{backgroundColor:'#202020', marginLeft: '.8rem', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '.1rem', opacity: item.code.length!==0?1:0}}>
                                                {
                                                    item.code.length!==0
                                                    ?item.code.map((code,index)=>(
                                                        <div key={code+index+'code'} style={{marginBottom:'50px'}}>
                                                            <h1 style={{color:'#ffffff',fontSize:18,marginBottom:'15px'}}>{code.title}</h1>
                                                            {
                                                                code.pre?code.pre.map((pre,index)=><pre key={pre+index+'pre'} style={{color:'#abb2bf'}}>{pre}</pre>):null
                                                            }
                                                        </div>
                                                    ))
                                                    :null
                                                }
                                            </Card>
                                        </Col>
                                    </Row>
                                </section>
                                )
                            ):null
                        }
                    </div>
                </Layout>
            </Layout>
            <style>{`
                .header {
                    display: flex;
                    align-items: center;
                    position: fixed;
                    left: 0;
                    right: 0;
                    top: 0;
                    min-height: 4.75rem;
                    background-image: linear-gradient(45deg,#202020,#3a3a3a);
                    background-repeat: repeat-x;
                }
                .header-left {
                    display: flex;
                    align-items: center;
                }
                .header-content {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    font-size: 15px;
                }
                .header-right {
                    font-weight: 600;
                }
                .header-logo img {
                    height: 32px;
                    margin-top: -5px;
                    vertical-align: middle;
                }
                .header-text {
                    color: #ffffff;
                    padding-left: 10px;
                }
                .header-icon {
                    font-size: 25px;
                    padding: 0 20px 0 50px;
                }
                .header-nav {
                    list-style: none;
                    display: flex;
                    margin: 0;
                    padding: 0;
                }
                .nav-items {
                    padding: 0 20px;
                    cursor: pointer;
                }
                .header-login {
                    list-style: none;
                    display: flex;
                    margin: 0;
                    padding: 0;
                }
                .login-items {
                    padding: 0 20px;
                    font-size: 16px;
                    cursor: pointer;
                }
                .nav {
                    position: fixed;
                    top: 4.75rem;
                    height: calc(100% - 4.75rem);
                    background-color: #ffffff;
                }
                .nav a {
                    padding-left: 25px;
                }
                .api-bg {
                    position: fixed;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    z-index: -1;
                    margin-left: 260px;
                }
                .api-bg div {
                    height:100%;
                }
                .bg-left {
                    background-color: #f9f9f9;
                }
                .bg-right {
                    background-color: #1b1b1b;
                }
                .content {
                    position: fixed;
                    left:260px;
                    top: 4.75rem;
                    height: calc(100% - 4.75rem);
                    padding: 1.8rem;
                    width: calc(100% - 260px);
                    overflow-y: scroll;
                }
                .content-block {
                    margin: 5px 0 20px 0;
                }
                .content-block h1 {
                    letter-spacing: .05rem;
                    font-weight: 700;
                    color: #3a3a3a;
                }

                .code-mark {
                    color: #5a5a5a;
                    background: #f2f2f2;
                    padding: 3px 6px;
                    border-radius: .25rem;
                    margin: 0 3px;
                }
                .link-mark {
                    color: #b53836;
                }
                .bold-mark {
                    font-weight: 600;
                }
            `}</style>
        </div>
    )
}

Api.getInitialProps = async() => {
    const res = await axios.get('http://localhost:3000/mock/apiData.json')
    return res.data.data;
}

export default Api;