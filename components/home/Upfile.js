import React , { useRef, useContext, useEffect, useState } from 'react';
import { FileContext, UPLOAD_FILE, BtnSizeContext, ConfigContext, GlobalContext } from '../../until/store/store';
import { fileUntils } from '../../until/fileUntils';
import { newApiConfig } from '../../until/newApiConfig';
import { uuidUntil } from '../../until/uuidUntil';
import { uploadFile } from '../../until/uploadToOss'
import DropDownList from '../DropDownList';
import DropDownMenu from '../DropDownMenu';
import Loading from '../Loading';
import Fingerprint2 from 'fingerprintjs2';

const Upfile = () => {
    const bgColor = "#f9f9f9";
    const fontColor = "#202020";
    const btnColor = ["#b53836","#303030"];
    const yuntu = 'yuntuApi';
    const namespace = 'upfile';

    const inputFile = useRef(null);
    const { state, dispatch } = useContext(FileContext);
    const [btnSize, setBtnSize] = useState({});   /* 上传按钮大小 */
    const [btnList, setBtnList] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const leftBtn = useRef(null);
    const rightBtn = useRef(null);
    const [fromType, setFromType] = useState("");
    const [toType, setToType] = useState("");
    const [toList, setToList] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(-1);
    const [opacity,setOpacity] = useState(0.65);
    const [fileConfigList,setFileConfigList] = useState([]);
    const {isShowDropDownMenu,handleOpenOne} = useContext(GlobalContext);
    const finishLeftBtn = useRef(null);
    const finishRightBtn = useRef(null);
    const [finishDropDown, setFinishDropDown] = useState(false);
    const [token, setToken] = useState("");
    
    useEffect(()=>{
        if(!isShowDropDownMenu){
            setDropDown(false);
            setFinishDropDown(false);
            if(fileConfigList[currentIndex]){
                fileConfigList[currentIndex].toDropDown = false;
                setFileConfigList([...fileConfigList]);
            }
        }
    },[isShowDropDownMenu]);
    useEffect(()=>{
        saveToken();
        if(state.fileList[0]){
            setFromType(fileUntils.getFileType(state.fileList[0].name).toUpperCase());
            dispatch({type:UPLOAD_FILE ,state:{fileList:state.fileList,fromType:fileUntils.getFileType(state.fileList[0].name).toUpperCase(),uploaded:true}});
            if(state.fileList.length>fileConfigList.length){
                state.fileList.map((item,index)=>{
                    if(fileUntils.getFileType(item.name) === 'unknown'){
                        const fileConfig = {
                            id:index,
                            fromType:fileUntils.getFileType(item.name).toUpperCase(),
                            toType:'none',
                            unknownType:true,
                            toDropDown:false,
                            allowConfig:false,
                            convertStatus:'init',
                            token:'',
                            config:{}
                        }
                        setFileConfigList([...fileConfigList,fileConfig]);
                    }else{
                        const fileConfig = {
                            id:index,
                            fromType:fileUntils.getFileType(item.name).toUpperCase(),
                            toType,
                            unknownType:false,
                            toDropDown:false,
                            allowConfig:false,
                            convertStatus:'init',
                            token:token,
                            config:{}
                        }
                        setFileConfigList([...fileConfigList,fileConfig]);
                    }
                })
            }
        }
    },[state.fileList]);
    useEffect(()=>{
        if(state.uploaded){
            if(toType){
                fileConfigList[currentIndex].toType = toType;
                fileConfigList[currentIndex].allowConfig = true;
                fileConfigList[currentIndex].toDropDown = false;
                setFileConfigList([...fileConfigList]);
                fileConfigList.map((item)=>{
                    if(item.unknownType || item.toType==='' || !item.toType){
                        setOpacity(.65);
                    }else{
                        setOpacity(1);
                    }
                })
            }
            dispatch({type:UPLOAD_FILE,state:{fileList:state.fileList,fromType,toType:fileConfigList[0].toType,uploaded:true}});
        }
    },[toType]);

    if(!state.uploaded){
        return null;
    }

    const uploadBtnList = [
        {
            id:"01",
            icon:"\ue638",
            title:"从我的电脑"
        },
        {
            id:"02",
            icon:"\ue79c",
            title:"通过URL"
        }
    ]
    const finishBtnList = [
        {
            id:"01",
            icon:"\ue607",
            title:"重试"
        },
        {
            id:"02",
            icon:"\ue617",
            title:"发送反馈"
        }
    ]

    const getType = (type,option,e) => {
        e.stopPropagation();
        switch(option){
            case 'from':
                setFromType(type);
                break;
            case 'to':
                setToType(type);
                break;
            default:
                break;
        }
    }

    function saveToken() {
        let token = '';
        Fingerprint2.get(function(components){
            let values = components.map(function (component) { return component.value })
            let murmur = Fingerprint2.x64hash128(values.join(''), 31)
            let tokenLen = 22;
            let creatorUUID = uuidUntil.hash(murmur);
            if (creatorUUID) {
                tokenLen -= creatorUUID.length;
            }
            token = uuidUntil.uuid(tokenLen);
            if (creatorUUID) {
                token = creatorUUID + token;
            }
            setToken(token);
        })
    }
    function convertTo(){
        
        if(opacity===1){
            fileConfigList.map((item,index)=>{
                if(index===0){
                    item.convertStatus = 'waiting';
                    setFileConfigList([...fileConfigList]);
                    setTimeout(()=>{
                        item.convertStatus = 'finished';
                        setFileConfigList([...fileConfigList]);
                    },2000);
                }else if(index===1){
                    item.convertStatus = 'waiting';
                    setFileConfigList([...fileConfigList]);
                    setTimeout(()=>{
                        item.convertStatus = 'finished';
                        setFileConfigList([...fileConfigList]);
                    },5000);
                }
            });
            console.log(state.fileList[0]);
            console.log(fileConfigList[0].token);
            uploadFile.putObject(fileConfigList[0].token + '.source',state.fileList[0]);
        }
    }
    function convertSelect(index,e){
        e.stopPropagation();
        handleOpenOne();
        if(fileConfigList[index].unknownType){
            return (e) => {
                e.preventDefault();
            }
        }
        setToList(newApiConfig.getConvertTo(fileConfigList[index].fromType));
        setCurrentIndex(index);
        fileConfigList.map((item,idx)=>{
            if(idx===index){
                item.toDropDown = !item.toDropDown;
            }else{
                item.toDropDown = false;
            }
        })
        setFileConfigList(fileConfigList);
    }
    function deleteItem(arr, index){
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
    function deleteClick(index){
        setFileConfigList(deleteItem(fileConfigList,index));
        dispatch({type:UPLOAD_FILE,state:{fileList:deleteItem(state.fileList,index),uploaded:state.fileList.length-1!==0}});
    }
    function dropDownClick(e){
        e.stopPropagation();
        handleOpenOne();
        setDropDown(!dropDown);
        setBtnList(uploadBtnList);
        setBtnSize({
            width: leftBtn.current.offsetWidth + rightBtn.current.offsetWidth,
            height: leftBtn.current.offsetHeight + 1,
            left: leftBtn.current.offsetLeft
        });
    }
    function finishDropDownClick(e){
        e.stopPropagation();
        handleOpenOne();
        setFinishDropDown(!finishDropDown);
        setBtnList(finishBtnList);
        setBtnSize({
            width: finishLeftBtn.current.offsetWidth + finishRightBtn.current.offsetWidth,
            height: finishLeftBtn.current.offsetHeight + 1,
            left: finishLeftBtn.current.offsetLeft
        });
    }
    function inputChange(file){
        if(file){   //从下拉列表中选择文件
            dispatch({type:UPLOAD_FILE,state:{fileList:[...state.fileList,file],uploaded:true}});
        }else{     //从按钮直接选择文件
            dispatch({type:UPLOAD_FILE,state:{fileList:[...state.fileList,inputFile.current.files[0]],uploaded:true}});
        }
        setDropDown(false);
    }

    return (
        <div className="container">
            <div className="upfile">
                <ul className="upfile-list">
                    {
                        state.fileList.length !== 0
                        ? state.fileList.map((item,index)=>(
                            <li className="upfile-items" key={yuntu + namespace + 'file' + index}>
                                <div className="items-left">
                                    <span className="iconfont">&#xe64e;</span>
                                    <p>{item.name}</p>
                                </div>
                                <div className="items-center">
                                    <span className="iconfont center-icon">&#xe636;</span>
                                    转换为
                                    <div className="center-control" onClick={(e)=>convertSelect(index,e)}>
                                        {fileConfigList[index]?(fileConfigList[index].toType.length!==0?fileConfigList[index].toType:"..."):"..."}
                                        <span className="iconfont">&#xe656;</span>
                                    </div>
                                    <ConfigContext.Provider value={{toList,type:'to',getType}}>
                                        {
                                            (fileConfigList[index]?fileConfigList[index].toDropDown:false)
                                            ? <DropDownMenu />
                                            : null
                                        }
                                    </ConfigContext.Provider>
                                    {
                                        (fileConfigList[index]?fileConfigList[index].allowConfig:false)
                                        ? <div className="center-set"><span className="iconfont">&#xe65c;</span></div>
                                        : null
                                    }
                                </div>
                                {
                                    (fileConfigList[index]?fileConfigList[index].unknownType:false)
                                    ? <div className="item-err"><span>Error</span>该类型不支持转换！</div>
                                    : null
                                }
                                {
                                    (fileConfigList[index]?fileConfigList[index].convertStatus==='waiting':false)
                                    ?<div className="item-wait"><span>Waiting</span><Loading /></div>
                                    :null
                                }
                                {
                                    (fileConfigList[index]?fileConfigList[index].convertStatus==='finished':false)
                                    ?<div className="item-finish">
                                        <span className="finish-message">Finished</span>
                                        <div className="finish-btn">
                                            <div ref={finishLeftBtn} className="finish-content">
                                                <span className="iconfont">&#xe61a;</span>
                                                下载
                                            </div>
                                            <span ref={finishRightBtn} className="iconfont finish-options" onClick={(e)=>finishDropDownClick(e)}>&#xe656;</span>
                                                {
                                                    finishDropDown 
                                                    ? (
                                                        <BtnSizeContext.Provider value={{btnSize,btnList,isUploadBtn:false}}>
                                                            <DropDownList /> 
                                                        </BtnSizeContext.Provider>
                                                    ) 
                                                    : null
                                                }
                                        </div>
                                    </div>
                                    :null
                                }
                                <div className="items-right">
                                    <span className="iconfont" onClick={()=>deleteClick(index)}>&#xe630;</span>
                                </div>
                            </li>
                        ))
                        :null
                    }
                </ul>
                <div className="upfile-btn">
                    <div className="btn-more">
                        <div ref={leftBtn} className="more-content">
                            <span className="iconfont">&#xe664;</span>
                            添加更多文件
                            <input ref={inputFile} className="hide" type="file" onChange={() => inputChange()} />
                        </div>
                        <span ref={rightBtn} className="iconfont more-options" onClick={(e) => dropDownClick(e)}>&#xe656;</span>
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
                    <div className="btn-convert" onClick={()=>convertTo()}>
                        <span className="iconfont">&#xe636;</span>
                        转换
                    </div>
                </div>
            </div>
            <style>{`
                .container{
                    background:${bgColor};
                    color:${fontColor};
                }
                .upfile{
                    width:1140px;
                    box-sizing:border-box;
                    padding:27px;
                    margin-left:auto;
                    margin-right:auto;
                }
                .upfile-list .upfile-items{
                    position:relative;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    width:100%;
                    min-width: 0;
                    word-wrap: break-word;
                    background-color: #fff;
                    background-clip: border-box;
                    border: 1px solid rgba(0,0,0,.06);
                    box-shadow: 0px 1px 1px #ccc;
                    margin-bottom:15px;
                }
                .upfile-items .items-left{
                    display:flex;
                    padding:15px;
                    font-size:15px;
                }
                .upfile-items .items-left span{
                    margin:0 15px 0 0;
                    font-size:20px;
                    line-height:20px;
                }
                .upfile-items .items-left p{
                    line-height:20px;
                }
                .upfile-items .items-center{
                    position:absolute;
                    left:40%;
                    display:flex;
                    align-items:center;
                    padding:15px;
                    font-size:15px;
                    line-height:20px;
                }
                .upfile-items .items-center .center-icon{
                    margin:0 15px 0 0;
                    font-size:20px;
                    font-weight:600;
                    line-height:20px;
                }
                .upfile-items .items-center .center-control{
                    padding: .5rem .9rem;
                    margin:-15px 10px;
                    border:1px solid #5a5a5a;
                    border-radius:.25rem;
                    cursor:pointer;
                }
                .upfile-items .items-center .center-control span{
                    margin:0 0 0 5px;
                    font-size:15px;
                    font-weight:600;
                }
                .upfile-items .items-center .center-set{
                    padding: .5rem .7rem;
                    margin:-15px 0;
                    border:1px solid #5a5a5a;
                    border-radius:.25rem;
                    font-size:20px;
                    cursor:pointer;
                }
                .upfile-items .item-err{
                    position:absolute;
                    left:70%;
                    font-size:15px;
                }
                .upfile-items .item-err span{
                    font-size:12px;
                    color:#fff;
                    line-height:15px;
                    background:#dc3545;
                    margin-right:10px;
                    padding:.3rem .5rem;
                    border-radius:.2rem;
                }
                .upfile-items .item-wait{
                    position:absolute;
                    display:flex;
                    left:70%;
                    font-size:15px;
                }
                .upfile-items .item-wait span{
                    font-size:12px;
                    color:#fff;
                    line-height:15px;
                    background:#ffc107;
                    margin-right:10px;
                    padding:.3rem .5rem;
                    border-radius:.2rem;
                }
                .upfile-items .item-finish{
                    display:flex;
                    align-items:center;
                    position:absolute;
                    left:70%;
                    font-size:15px;
                }
                .upfile-items .item-finish .finish-message{
                    font-size:12px;
                    color:#fff;
                    line-height:15px;
                    background:#28a745;
                    margin-right:10px;
                    padding:.3rem .5rem;
                    border-radius:.2rem;
                }
                .item-finish .finish-btn{
                    position:relative;
                    right:-30%;
                    display:flex;
                    align-items:center;
                    color:#fff;
                    cursor:pointer;
                }
                .item-finish .finish-btn .finish-content{
                    position:relative;
                    padding:.7rem .9rem;
                    font-size:18px;
                    line-height:20px;
                    border-radius:.27rem;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    background:#28a745;
                }
                .item-finish .finish-btn .finish-content:hover,.item-finish .finish-btn .finish-options:hover{
                    background:#228B22;
                }
                .item-finish .finish-btn .finish-content span{
                    font-size:18px;
                    margin-right:15px;
                }
                .item-finish .finish-btn .finish-options{
                    padding:.7rem .9rem;
                    border-radius:.27rem;
                    border-top-left-radius:0;
                    border-bottom-left-radius:0;
                    font-size:21px;
                    font-weight:600;
                    background:#28a745;
                }
                .upfile-items .items-right span{
                    padding:15px;
                    font-size:10px;
                    font-weight:800;
                    line-height:20px;
                    color:${btnColor[0]};
                    cursor:pointer;
                }
                .upfile-btn{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin:23.5px 0;
                }
                .btn-more{
                    position:relative;
                    display:flex;
                    align-items:center;
                    color:#fff;
                    cursor:pointer;
                }
                .btn-more .more-content{
                    position:relative;
                    padding:1rem 1.25rem;
                    font-size:1.25rem;
                    line-height:25px;
                    border-radius:.27rem;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    background:${btnColor[1]};
                }
                .more-content span{
                    font-size:22px;
                    margin:0 10px 0 0;
                }
                .more-content:hover{
                    background:#202020;
                }
                .btn-more .more-options{
                    padding:1rem 1.25rem;
                    line-height:1.25;
                    border-radius:.27rem;
                    border-top-left-radius:0;
                    border-bottom-left-radius:0;
                    font-size:22px;
                    font-weight:600;
                    background:${btnColor[1]};
                }
                .btn-more .more-options:hover{
                    background:#202020;
                }
                .btn-convert{
                    padding:1rem 1.25rem;
                    line-height:1.25;
                    border-radius:.27rem;
                    background:${btnColor[0]};
                    color:#fff;
                    font-size:1.25rem;
                    opacity:${opacity};
                    cursor:pointer;
                }
                .btn-convert span{
                    line-height:1.25;
                    margin-right:15px;
                    font-size:22px;
                    font-weight:600;
                }
                .hide{
                    overflow: hidden;
                    position:absolute;
                    right:0;
                    top:0;
                    width:172px;
                    height:55px;
                    opacity: 0;
                    filter:alpha(opacity=0);
                }
            `}</style>
        </div>
    )
}
export default Upfile;