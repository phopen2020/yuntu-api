import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
const {  Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
import { MenuOutlined, HomeFilled } from '@ant-design/icons';
import axios from 'axios';
const Api = (data) => {
    const [api, setApi] = useState({});
    const [navList, setNavList] = useState([]);

    const bgColor = "#202020";
    const fontColor = "#fff";
    const themeColor = "#b53836";

    Api.getInitialProps = async() => {
        const res = await axios.get('http://localhost:3000/mock/apiData.json')
        return res.data.data;
    }
    
    useEffect(()=>{
        if(data.api){
            setApi(data.api);
            const overview = data.api.overview;
            const navNameList = []; 
            overview.overviewList.map((item)=>{
                navNameList.push(item.nav);
            })
            const nav = {
                title: overview.title,
                overviewList: navNameList
            }
            setNavList([nav]);
        }
    },[data]);

    function getIcon(index){
        let icon;
        switch(index){
            case 0:
                icon = <HomeFilled />;
                break;
            default:
                icon = null;
                break;
        }
        return icon;
    }

    return (
        <div className="container">
            <Layout>
                <Header className="header">
                    <div className="header-left">
                        <div className="header-logo">
                            <img src="https://cloudconvert.com/images/logo_flat_110_borderless.png" />
                        </div>
                        <h2 className="header-text">cloudconvert</h2>
                    </div>
                    <div className="header-content">
                        <MenuOutlined className="header-icon" />
                        <Menu mode="horizontal" theme="dark" style={{backgroundColor: bgColor}} >
                            <Menu.Item key="nav1" style={{color: fontColor}}>API</Menu.Item>
                            <Menu.Item key="nav2" style={{color: fontColor}}>价钱</Menu.Item>
                            <Menu.Item key="nav3" style={{color: fontColor}}>新闻</Menu.Item>
                        </Menu>
                    </div>
                    <div className="header-right">
                        <Menu mode="horizontal" theme="dark" style={{backgroundColor: bgColor}} >
                            <Menu.Item key="login1" style={{color: fontColor, fontSize: 16}}>注册</Menu.Item>
                            <Menu.Item key="login2" style={{color: fontColor, fontSize: 16}}>登录</Menu.Item>
                        </Menu>
                    </div>
                </Header>
                <Layout>
                    <Sider>
                        <Menu mode="inline" style={{color: 'red'}}>
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
                                                <span>{menu.title}</span>
                                            </span>
                                        }
                                    >
                                        {
                                            menu.overviewList.map((item)=><Menu.Item key={item}>{item}</Menu.Item>)
                                        }
                                    </SubMenu>
                                ))
                                :null
                            }
                        </Menu>
                    </Sider>
                    <Content>main content</Content>
                </Layout>
            </Layout>
            <style>{`
                .header {
                    background: ${bgColor};
                    color: ${fontColor};
                    display: flex;
                    align-items: center;
                }
                .header-left {
                    display: flex;
                    align-items: center;
                }
                .header-content {
                    flex: 1;
                    display: flex;
                    align-items: center;
                }
                .header-logo img {
                    height: 32px;
                    margin-top: -5px;
                    vertical-align: middle;
                }
                .header-text {
                    color: ${fontColor};
                    padding-left: 10px;
                }
                .header-icon {
                    font-size: 25px;
                    padding: 0 20px 0 50px;
                }
                .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
                    background-color: ${bgColor};
                }
            `}</style>
        </div>
    )
}
export default Api;