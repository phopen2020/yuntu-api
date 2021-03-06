import React, { useState, useEffect, useContext } from 'react'
import DropDownMenu from '../DropDownMenu'
import { newApiConfig } from '../../until/newApiConfig'
import { ConfigContext, YuntuContext, GlobalContext } from '../../store/store'
import Router, { withRouter } from 'next/router';
import IconFont from '../IconFont';
import { route } from 'next/dist/next-server/server/router';

const Converter = ({router}) => {
    const bgColor = "#202020";
    const fontColor = "#fff";
    const [fromDropDown, setFromDropDown] = useState(false);
    const [toDropDown, setToDropDown] = useState(false);
    const [fromType, setFromType] = useState("");
    const [toType, setToType] = useState("");
    const [fromList, setFromList] = useState(newApiConfig.getConvertFrom());
    const [toList, setToList] = useState(null);
    const [fromSelected, setFromSelected] = useState(false);
    const [convertList, setConvertList] = useState([]);
    const convertListInit = [
        {title:"文件转换",describe:"九云图是一个在线文件转换器。我们确实支持几乎所有文档，电子书，档案，图像，电子表格或演示文稿格式。要开始使用，请使用下面的按钮并选择要从您的计算机转换的文件。"}
    ]
    const { state, dispatch } = useContext(YuntuContext);
    const [finalType,setFinalType] = useState('');
    const {isShowDropDownMenu,handleOpenOne} = useContext(GlobalContext);

    useEffect(()=>{
        if(!isShowDropDownMenu){
            setFromDropDown(false);
            setToDropDown(false);
        }
    },[isShowDropDownMenu]);
    useEffect(()=>{
        setFromSelected(fromType!='' ? true : false);
        setToList(newApiConfig.getConvertTo(fromType));
        setConvertList(newApiConfig.getConvertMessage(fromType,toType));
        setFinalType(fromType + (toType ? '-to-' + toType : ''));
    },[fromType,toType]);
    useEffect(()=>{
        if(state.fromType && state.fromType!=="UNKNOWN"){
            setFromType(state.fromType);
        }
    },[state.fromType]);
    useEffect(()=>{
        if(state.toType && state.toType!=='none'){
            if(state.fromType!=="UNKNOWN"){
                setToType(state.toType);
            }
        }
    },[state.toType]);
    useEffect(()=>{
        if(finalType!==''){
            Router.push({pathname:'/home',query:{finalType}},'/home/'+finalType);
        }
    },[finalType])
    useEffect(()=>{
        if(router.query.finalType){
            const final = router.query.finalType.split('-');
            setFromType(final[0]);
            if(final[2]){
                setToType(final[2]);
            }
        }
        if(router.asPath.match('/home/')){
            let params = decodeURI(router.asPath).replace('/home/','');
            const final = params.split('-');
            setFromType(final[0]);
            if(final[2]){
                setToType(final[2]);
            }
        }
    },[router])

    const getType = (type,option,e) => {
        e.stopPropagation();
        switch(option){
            case 'from':
                setFromType(type);
                setFromDropDown(false);
                break;
            case 'to':
                setToType(type);
                setToDropDown(false);
                break;
            default:
                break;
        }
    }

    function fromBtnClick(e){
        e.stopPropagation();
        handleOpenOne();
        setToDropDown(false);
        return setFromDropDown(!fromDropDown);
    }
    function toBtnClick(e){
        e.stopPropagation();
        handleOpenOne();
        setFromDropDown(false);
        if(fromSelected){
            setToDropDown(!toDropDown);
            return (e) => {
                e.addEventListener('click');
            }
        }else{
            return (e) => {
                e.preventDefault();
            }
        }
    }
    return (
        <div className="container">
            <section className="converter">
                <div className="converter-left">
                    <h1>{convertList[0] ? convertList[0].title : convertListInit[0].title}</h1>
                    <p>{convertList[0] ? convertList[0].describe : convertListInit[0].describe}</p>
                </div>
                <div className="converter-right">
                    <ul className="converter-control">
                        <li className="control-items">转换</li>
                        <li className="control-items control-btn" onClick={(e)=>fromBtnClick(e)}>
                            {fromType ? fromType : "..."}
                            <IconFont type="icon-xiala" style={{fontSize: 20, marginLeft: '3px'}}/>
                            <ConfigContext.Provider value={{fromList,type:'from',getType}}>
                            {
                                fromDropDown
                                ? <DropDownMenu />
                                : null
                            }
                            </ConfigContext.Provider>
                        </li>
                        <li className="control-items">至</li>
                        <li className="control-items control-btn" onClick={(e)=>toBtnClick(e)}>
                            {toType ? toType : "..."}
                            <IconFont type="icon-xiala" style={{fontSize: 20, marginLeft: '3px'}}/>
                            <ConfigContext.Provider value={{toList,type:'to',getType}}>
                            {
                                toDropDown
                                ? <DropDownMenu />
                                : null
                            }
                            </ConfigContext.Provider>
                        </li>
                    </ul>
                </div>
            </section>
            <style jsx>{`
                .container{
                    width:100%;
                    background:${bgColor};
                    color:${fontColor};
                    background-image: linear-gradient(45deg,${bgColor},#3a3a3a);
                    background-repeat: repeat-x;
                    line-height: 1;
                }
                .converter{
                    display:flex;
                    align-items:center;
                    width:1140px;
                    min-height:220px;
                    box-sizing:border-box;
                    padding:60px 27px;
                    margin-left:auto;
                    margin-right:auto;
                }
                .converter-left{
                    width:37.7rem;
                }
                .converter-left h1{
                    padding:0 0 7.5px;
                    color: #fff;
                    font-size:30px;
                    margin-bottom: 0;
                }
                .converter-left p{
                    line-height:20px;
                    font-size:15px;
                    margin-bottom: 0;
                }
                .converter-right{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:37.7rem;
                }
                .converter-right .converter-control{
                    display:flex;
                    align-items:center;
                    list-style: none;
                }
                .converter-control .control-items{
                    margin:5px;
                    font-size:1.25rem;
                    line-height:1.25;
                    border-radius:.27rem;
                }
                .converter-control .control-items.control-btn{
                    position:relative;
                    padding:1rem 1.25rem;
                    border:1px solid #5a5a5a;
                    font-weight:600;
                    cursor:pointer;
                }
                .converter-control .control-items.control-btn:hover{
                    background:#1e1e1e;
                }
            `}</style>
        </div>
    )
}
export default withRouter(Converter);