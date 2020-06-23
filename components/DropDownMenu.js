import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext, GlobalContext } from '../until/store/store';
const DropDownMenu = () => {
    const menuList = useContext(ConfigContext);
    const [navType, setNavType] = useState("document");
    const [document,setDocument] = useState([]);
    const [image,setImage] = useState([]);
    const [extra,setExtra] = useState([]);
    const {handleOpenOne} = useContext(GlobalContext);
   
    useEffect(()=>{
        switch(menuList.type){
            case 'from':
                setDocument(menuList.fromList[0].Document);
                setImage(menuList.fromList[0].Image);
                break;
            case 'to':
                setDocument(menuList.toList[0].Document);
                setImage(menuList.toList[0].Image);
                setExtra( menuList.toList[0].Extra);
                break;
            default:
                return;
        }
    },[menuList.type]);
    const yuntu = 'yuntuApi';
    const namespace = 'introduce';
    const handleMenuClick = (e) => {
        e.stopPropagation();
        handleOpenOne();
    }
    function type(){
        let type;
        switch(navType){
            case "document":
                type = document.map((item)=><span className="list-items" onClick={(e)=>menuList.getType(item,menuList.type,e)} key={yuntu + namespace + item}>{item}</span>);
                return type;
            case "image":
                type = image.map((item)=><span className="list-items" onClick={(e)=>menuList.getType(item,menuList.type,e)} key={yuntu + namespace + item}>{item}</span>);
                return type;
            case "extra":
                type = extra.map((item)=><span className="list-items" onClick={(e)=>menuList.getType(item,menuList.type,e)} key={yuntu + namespace + item}>{item}</span>);
                return type;
            default:
                type = null;
                return type;
        }
    }
    return (
        <div className="container" onClick={(e)=>handleMenuClick(e)}>
            <div className="menu">
                <ul className="menu-nav">
                    {document.length !== 0 ? <li className="nav-items" onMouseEnter={()=>setNavType("document")}>文档</li> : null}
                    {image.length !== 0 ? <li className="nav-items" onMouseEnter={()=>setNavType("image")}>图片</li> : null}
                    {extra.length !== 0 ? <li className="nav-items" onMouseEnter={()=>setNavType("extra")}>其他</li> : null}
                </ul>
                <div className="menu-list">
                    {
                        type()
                    }
                </div>
            </div>
            <style>{`
                .menu{
                    position:absolute;
                    top:115%;
                    right:-1px;
                    display:flex;
                    width:350px;
                    background:#1e1e1e;
                    padding:10px;
                    font-size:15px;
                    color:#c2c2c2;
                    border-radius:.25rem;
                    z-index:999;
                    box-sizing:border-box;
                }
                .menu-nav{
                    min-width:73px;
                    padding:0 10px;
                }
                .menu-nav .nav-items{
                    padding:10px 0;
                    border-bottom:1px solid #5a5a5a;
                }
                .menu-nav .nav-items:hover{
                    color:#f2f2f2;
                }
                .menu-list{
                    margin-left:5px;
                }
                .menu-list .list-items{
                    display:inline-block;
                    width:66px;
                    height:32px;
                    padding:10px 5px;
                    margin:5px;
                    border-radius:.27rem;
                    background:#5a5a5a;
                    font-size:12px;
                    text-align:center;
                    box-sizing:border-box;
                    line-height:12px;
                }
                .menu-list .list-items:hover{
                    background:#2a2a2a;
                }
            `}</style>
        </div>
    )
}
export default DropDownMenu;