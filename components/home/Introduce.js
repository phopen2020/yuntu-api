import React, { useState, useRef, useContext, useEffect } from 'react';
import { YuntuContext, UPLOAD_FILE, BtnSizeContext, GlobalContext } from '../../store/store';
import DropDownList from '../DropDownList';
import Router from 'next/router';
import IconFont from '../IconFont';

const Introduce = () => {
    const { state, dispatch } = useContext(YuntuContext);
    const [btnSize, setBtnSize] = useState({});
    const [dropDown, setDropDown] = useState(false);
    const inputFile = useRef(null);
    const leftBtn = useRef(null);
    const rightBtn = useRef(null);
    const {isShowDropDownMenu,handleOpenOne} = useContext(GlobalContext);
    useEffect(()=>{
        if(!state.uploaded && state.fromType!==''){
            Router.push('/home');
        }
    },[state.uploaded]);
    useEffect(()=>{
        if(!isShowDropDownMenu){
            setDropDown(false);
        }
    },[isShowDropDownMenu]);

    if(state.uploaded){
        return null;
    }

    const bgColor = "#f9f9f9";
    const fontColor = "#202020";
    const btnColor = "#b53836";
    const yuntu = 'yuntuApi';
    const namespace = 'introduce';

    const introduceList = [
        {
            id:"01",
            iconType:"icon-wendang",
            title:"支持+200格式",
            describe:"CloudConvert是您进行文件转换的瑞士军刀。我们确实支持几乎所有音频，视频，文档，电子书，档案，图像，电子表格或演示文稿格式。无需下载和安装任何软件。",
            link:""
        },
        {
            id:"02",
            iconType:"icon-anquan",
            title:"数据安全",
            describe:"自2012年以来，CloudConvert受到我们用户和客户的信任。没有人可以访问您的文件。我们通过出售对我们API的访问权来赚钱，而不是通过出售您的数据来赚钱。",
            link:"隐私政策"
        },
        {
            id:"03",
            iconType:"icon-view",
            title:"高品质转换",
            describe:"除了在后台使用开源软件之外，我们还与各种软件供应商合作，以提供最佳的结果。大多数转换类型都可以根据您的需要进行调整，例如设置质量和许多其他选项。",
            link:""
        },
        {
            id:"04",
            iconType:"icon-apigatewayAPIwangguan-copy",
            title:"强大的API",
            describe:"我们的API允许与您的应用程序进行自定义集成。您只需为实际使用付费，大批量客户可获得大量折扣。我们确实提供了许多方便的功能，例如完整的Amazon S3集成。",
            link:"API文档"
        }
    ];
    const btnList = [
        {
            id:"01",
            iconType:"icon-wenjian",
            title:"从我的电脑"
        },
        {
            id:"02",
            iconType:"icon-url",
            title:"通过URL"
        }
    ]

    function dropDownClick(e){
        e.stopPropagation();
        handleOpenOne();
        setDropDown(!dropDown);
        setBtnSize({
            width: leftBtn.current.offsetWidth + rightBtn.current.offsetWidth,
            height: leftBtn.current.offsetHeight + 1,
            left: leftBtn.current.offsetLeft
        });
    }
    function inputChange(file){
        if(file){      //从下拉列表中选择文件
            dispatch({type:UPLOAD_FILE,state:{fileList:[file],uploaded:true}});
        }else{     //从按钮直接选择文件
            dispatch({type:UPLOAD_FILE,state:{fileList:[inputFile.current.files[0]],uploaded:true}});
        }
        setDropDown(false);
    }

    return (
        <div className="container">
            <section className="introduce">
                <div className="introduce-upload">
                    <div ref={leftBtn} className="upload-btn">
                        <IconFont type="icon-tianjiawenjian" style={{ fontSize: 22, lineHeight: '25px', marginRight: '15px', verticalAlign: 'middle'}}/>
                        选择文件
                        <input ref={inputFile} className="hide" type="file" onChange={() => inputChange()}/>
                    </div>
                    <span ref={rightBtn} className="upload-options" onClick={(e) => dropDownClick(e)}>
                        <IconFont type="icon-xiala" style={{fontSize: 22}}/>
                    </span>
                        {
                            dropDown 
                            ? (
                                <BtnSizeContext.Provider value={{btnSize,btnList,inputChange,isUploadBtn:true}}>
                                    <DropDownList /> 
                                </BtnSizeContext.Provider>
                            ) 
                            : null
                        }
                </div>
                <div className="introduce-content">
                    <ul className="content-list">
                        {introduceList.map((item)=>(
                            <li className="content-items" key={yuntu + namespace + item.id}>
                                <span className="items-left">
                                    <IconFont type={item.iconType} />
                                </span>
                                <div className="items-right">
                                    <h1 className="items-title">{item.title}</h1>
                                    <p className="items-text">{item.describe}<span>{item.link}</span></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <style jsx>{`
                .container{
                    width:100%;
                    background:${bgColor};
                    color:${fontColor};
                    line-height: 1;
                }
                .introduce{
                    width:1140px;
                    box-sizing:border-box;
                    padding:27px;
                    margin-left:auto;
                    margin-right:auto;
                }
                .introduce .introduce-upload{
                    position:relative;
                    display:flex;
                    justify-content:center;
                    margin:0 0 20px;
                    font-size:18.75px;
                    color:#fff;
                }
                .introduce-upload .upload-btn{
                    position:relative;
                    padding:0.9rem 1.24rem;
                    font-size:1.24rem;
                    line-height:25px;
                    border-radius:.27rem;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    background:${btnColor};
                    cursor:pointer;
                }
                .introduce-upload .upload-btn:hover{
                    background-color: #982f2d;
                    border-color: #8e2c2a;
                }
                .introduce-upload .upload-options:hover{
                    background-color: #982f2d;
                    border-color: #8e2c2a;
                }
                .introduce-upload .upload-options{
                    padding:0.9rem 1.24rem;
                    line-height: 1.24;
                    border-radius: .27rem;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    font-size:22px;
                    font-weight:600;
                    background:${btnColor};
                    cursor:pointer;
                }
                .introduce-content .content-list{
                    display:flex;
                    flex-wrap:wrap;
                    width:100%;
                    list-style: none;
                    padding-left: 0;
                    margin-bottom: 0;
                }
                .content-list .content-items{
                    display:flex;
                    width:50%;
                    padding:0 15px;
                    margin:22.5px 0;
                    box-sizing:border-box;
                }
                .content-items .items-left{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:26.4rem;
                    font-size:5.7rem;
                    padding:0 15px;
                }
                .content-items .items-right{
                    padding:0 15px;
                }
                .items-right .items-title{
                    margin:0 0 7.5px;
                    font-size:1.51rem;
                    font-weight: 600;
                }
                .items-right .items-text{
                    font-size:15px;
                    line-height:20px;
                    font-weight:400;
                    margin-bottom: 0;
                }
                .items-right .items-text span{
                    color:${btnColor};
                }
                .hide{
                    overflow: hidden;
                    position:absolute;
                    right:0;
                    top:0;
                    width:156px;
                    height:56px;
                    opacity: 0;
                    filter:alpha(opacity=0);
                }
            `}</style>
        </div>
    )
}
export default Introduce;
