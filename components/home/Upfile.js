import React , { useRef, useContext, useEffect, useState } from 'react';
import { YuntuContext, UPLOAD_FILE, BtnSizeContext, ConfigContext, GlobalContext, ProgressContext } from '../../store/store';
import { fileUntils } from '../../until/fileUntils';
import { newApiConfig } from '../../until/newApiConfig';
import { uuidUntil } from '../../until/uuidUntil';
import { uploadFile } from '../../until/uploadToOss'
import DropDownList from '../DropDownList';
import DropDownMenu from '../DropDownMenu';
import Loading from '../Loading';
import Progress from '../Progress';
import Fingerprint2 from 'fingerprintjs2';
import { yuntuApi } from '../../until/yuntuApi';
import WindowUtil from '../../until/WindowUtil';
import QRCode from 'qrcode.react'
import IconFont from '../IconFont';

const Upfile = () => {
    const bgColor = "#f9f9f9";
    const fontColor = "#202020";
    const btnColor = ["#b53836","#303030"];
    const yuntu = 'yuntuApi';
    const namespace = 'upfile';

    const inputFile = useRef(null);
    const { state, dispatch } = useContext(YuntuContext);
    const [btnSize, setBtnSize] = useState({});   /* 上传按钮大小 */
    const [btnList, setBtnList] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const leftBtn = useRef(null);
    const rightBtn = useRef(null);
    const [fromType, setFromType] = useState("");
    const [toType, setToType] = useState("在线文档");
    const [toList, setToList] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(-1);   /* 正在进行操作的索引值 */
    const [opacity,setOpacity] = useState(0.65);
    const [fileConfigList,setFileConfigList] = useState([]);
    const {isShowDropDownMenu,handleOpenOne} = useContext(GlobalContext);
    const finishLeftBtn = useRef(null);
    const finishRightBtn = useRef(null);
    const [finishDropDown, setFinishDropDown] = useState(false);
    const [token, setToken] = useState("");
    const [currentI,setCurrentI] = useState(-1); /* 正在转换所对应的索引值 */
    const [uploadPercentList,setUploadPercentList] = useState([]); 
    const [uploadTextColorList,setUploadTextColorList] = useState([]); 
    
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
            dispatch({type:UPLOAD_FILE ,state:{fileList:state.fileList,fromType:fileUntils.getFileType(state.fileList[0].name).toUpperCase(),toType:"在线文档",uploaded:true}});
            /*
             * 下面的数组遍历是为了在文件数量变更后判断能否转换
             */
            state.fileList.map((item)=>{
                if(fileUntils.getFileType(item.name) === 'unknown'){
                    setOpacity(.65);
                }else{
                    setOpacity(1);
                }
            })

            /* 添加文件 */
            if(state.fileList.length>fileConfigList.length){
                state.fileList.map((item,index)=>{
                    if(fileUntils.getFileType(item.name) === 'unknown'){
                        setToType('none');
                        const fileConfig = {
                            id:index,
                            name:item.name,
                            fromType:fileUntils.getFileType(item.name).toUpperCase(),
                            toType:'none',
                            unknownType:true,
                            toDropDown:false,
                            isOnlineDoc:false,
                            convertStatus:'init',
                            token:'',
                            downloadUrl:'',
                            downloadMethod:null
                        }
                        setFileConfigList([...fileConfigList,fileConfig]);
                    }else{
                        const fileConfig = {
                            id:index,
                            name:item.name,
                            fromType:fileUntils.getFileType(item.name).toUpperCase(),
                            toType:'在线文档',
                            unknownType:false,
                            toDropDown:false,
                            isOnlineDoc:false,
                            convertStatus:'init',
                            token:token,
                            downloadUrl:'',
                            downloadMethod:null
                        }
                        setFileConfigList([...fileConfigList,fileConfig]);
                    }
                })
            }
        }
    },[state.fileList]);
    useEffect(()=>{
        if(state.uploaded){
            if(toType && toType!=='none' && currentIndex!==-1){
                fileConfigList[currentIndex].toType = toType;
                fileConfigList[currentIndex].allowConfig = true;
                fileConfigList[currentIndex].toDropDown = false;
                setFileConfigList([...fileConfigList]);
                fileConfigList.map((item)=>{
                    if(item.unknownType || !item.toType){
                        setOpacity(.65);
                    }else{
                        setOpacity(1);
                    }
                })
            }
            dispatch({type:UPLOAD_FILE,state:{fileList:state.fileList,fromType,toType:fileConfigList[0].toType,uploaded:true}});
        }
    },[toType]);
    useEffect(()=>{
        if(fileConfigList[currentI]){
            fileConfigList[currentI].downloadMethod = downloadMethodControl(currentI);
            setFileConfigList([...fileConfigList]);
        }
    },[currentI]);

    if(!state.uploaded){
        return null;
    }

    const uploadBtnList = [
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
            for(let i in fileConfigList){
                fileConfigList[i].convertStatus = 'uploading';
                setFileConfigList([...fileConfigList]);
                uploadFile.multipartUpload(fileConfigList[i].token + '.source',state.fileList[i],function(res) {
                    _convert(i);
                }, (p)=>{
                    
                    /*
                     * 设置每个进度条的百分比
                     */
                    uploadPercentList[i] = 100-parseInt(p);
                    setUploadPercentList([...uploadPercentList]);

                    /*
                     * 设置每个进度条的字体颜色
                     */
                    uploadTextColorList[i] = "#ffc107";
                    if(p>40){
                        uploadTextColorList[i] = "#fff";
                        setUploadTextColorList([...uploadTextColorList]);
                    }

                    if(p===100){
                        fileConfigList[i].convertStatus = 'converting';
                        setFileConfigList([...fileConfigList]);
                    }
                });
            }
        } 
    }
    function _convert(i) {
        const fileType = getConvertType(i);
        yuntuApi.convert(fileConfigList[i].token, fileType, state.fileList[i].name, function (res) {
          if (res && res.json && res.json.retCode == 0) {
            setCurrentI(i);
            fileConfigList[i].downloadUrl = res.json.outputURLs[0];
            fileConfigList[i].convertStatus = 'finished';
            setFileConfigList([...fileConfigList]);
          } else if(res.json.retCode == 1) {
              yuntuApi.queryState(fileConfigList[i].token, function (res) {
                  if (res) {
                    _getImgUrl(fileConfigList[i].token, fileType,i);
                  }
              })
          }
        })
    }
    function _getImgUrl(token,type,i) {
        yuntuApi.getResult(token, type, function (res) {
            if (res && res.json && res.json.retMsg == 'success') {
              setCurrentI(i);
              fileConfigList[i].downloadUrl = res.json.outputURLs[0];
              fileConfigList[i].convertStatus = 'finished';
              setFileConfigList([...fileConfigList]);
            }
        })
    }
    function getConvertType(i){
        let type;
        switch(fileConfigList[i].toType){
            case "PDF":
                type = "pdf";
                break;
            case "二维码":
            case "在线文档":
                type = "webview";
                break;
            case "JPG":
                type = "longimage";
                break;
            case "HTML5":
                type = "html";
                break;
            default:
                type = "webview";
                break;
        }
        return type;
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
    function downloadMethodControl(i) {
        let downloadMethod;
        if(fileConfigList[i]){
            switch(fileConfigList[i].toType){
                case "JPG":
                case "PDF":
                    downloadMethod = (<div ref={finishLeftBtn} className="finish-content" onClick={(e)=>e.stopPropagation()}>
                                        <IconFont type="icon-yunduo-copy" style={{fontSize: 18, marginRight: '15px'}}/>
                                        <a href={fileConfigList[i].downloadUrl} download={fileConfigList[i].name}>下载</a>
                                    </div>);
                    break;
                case "在线文档":
                    downloadMethod = (<div ref={finishLeftBtn} className="finish-content" onClick={(e)=>e.stopPropagation()}>
                                        <IconFont type="icon-banshou" style={{fontSize: 18, marginRight: '15px'}}/>

                                        <a href={fileConfigList[i].downloadUrl} target="_blank">设置</a>

                                    </div>);
                    break;
                case "HTML5":
                    downloadMethod = (<div ref={finishLeftBtn} className="finish-content" onClick={(e)=>downloadHtml(e)}>
                                        <IconFont type="icon-yunduo-copy" style={{fontSize: 18, marginRight: '15px'}}/>
                                        下载
                                    </div>);
                    break;
                case "二维码":
                    downloadMethod = (<div ref={finishLeftBtn} className="finish-content" onClick={(e)=>downloadQRCode(e)}>
                                        <IconFont type="icon-yunduo-copy" style={{fontSize: 18, marginRight: '15px'}}/>
                                        <QRCode 
                                        id="yuntu_qrcode"
                                        value={fileConfigList[i].downloadUrl}
                                        size={220}
                                        style={Object.assign({},{"display":"none"})} 
                                        />
                                        下载
                                    </div>);
                    break;
                default:
                    downloadMethod = (<div ref={finishLeftBtn} className="finish-content" onClick={(e)=>e.stopPropagation()}>
                                        <IconFont type="icon-yunduo-copy" style={{fontSize: 18, marginRight: '15px'}}/>
                                        下载
                                    </div>);
                    break;
            }
            return downloadMethod;
        }
    }
    function downloadHtml(e){
        e.stopPropagation();
        handleOpenOne();
        let fileName =  fileUntils.getFileName(state.fileList[currentI].name);
        fileName += '.html';
        WindowUtil.saveDataToLocal(fileName, fileConfigList[currentI].downloadUrl);
    }
    function downloadQRCode(e){
        e.stopPropagation();
        handleOpenOne();
        const Qr = document.getElementById('yuntu_qrcode');
        let image = new Image();
        image.src = Qr.toDataURL('image/png');
        const a = document.createElement('a');
        const event = new MouseEvent('click');
        a.href = image.src;
        const qrCodeName = fileUntils.getFileName(state.fileList[currentI].name);
        a.download = qrCodeName + '.png';
        a.dispatchEvent(event);
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
                                    <IconFont type="icon-doc-s" style={{fontSize:20,marginRight:"15px"}} />
                                    <p>{item.name}</p>
                                </div>
                                <div className="items-center">
                                    <span className="center-icon">
                                        <IconFont type="icon-xunhuan" />
                                    </span>
                                    转换为
                                    <div className="center-control" onClick={(e)=>convertSelect(index,e)}>
                                        {fileConfigList[index]?(fileConfigList[index].toType.length!==0?fileConfigList[index].toType:"..."):"..."}
                                        <IconFont type="icon-xiala" style={{fontSize:16,marginLeft:'5px'}} />
                                    </div>
                                    <ConfigContext.Provider value={{toList,type:'to',getType}}>
                                        {
                                            (fileConfigList[index]?fileConfigList[index].toDropDown:false)
                                            ? <DropDownMenu />
                                            : null
                                        }
                                    </ConfigContext.Provider>
                                </div>
                                {
                                    (fileConfigList[index]?fileConfigList[index].unknownType:false)
                                    ? <div className="item-err"><span>Error</span>该类型不支持转换！</div>
                                    : null
                                }
                                {
                                    (fileConfigList[index]?fileConfigList[index].convertStatus==='uploading':false)
                                    ?(
                                        <div className="item-wait"><span>Waiting</span>
                                            <ProgressContext.Provider value={{uploadPercentList,uploadTextColorList,index}}>
                                                <Progress />
                                            </ProgressContext.Provider>
                                        </div>
                                    )
                                    :null
                                }
                                {
                                    (fileConfigList[index]?fileConfigList[index].convertStatus==='converting':false)
                                    ?<div className="item-wait"><span>Waiting</span><Loading /></div>
                                    :null
                                }
                                {
                                    (fileConfigList[index]?fileConfigList[index].convertStatus==='finished':false)
                                    ?<div className="item-finish">
                                        <span className="finish-message">Finished</span>
                                        <div className="finish-btn">
                                            {fileConfigList[index]?fileConfigList[index].downloadMethod:null}
                                            <span ref={finishRightBtn} className="finish-options" onClick={(e)=>finishDropDownClick(e)}>
                                                <IconFont type="icon-xiala" style={{fontSize: 20}}/>
                                            </span>
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
                                    <span onClick={()=>deleteClick(index)}>
                                        <IconFont type="icon-guanbi" />
                                    </span>
                                </div>
                            </li>
                        ))
                        :null
                    }
                </ul>
                <div className="upfile-btn">
                    <div className="btn-more">
                        <div ref={leftBtn} className="more-content">
                            <IconFont type="icon-tianjiawenjian" style={{ fontSize: 20, lineHeight: '25px', marginRight: '15px', verticalAlign: 'middle'}}/>
                            添加更多文件
                            <input ref={inputFile} className="hide" type="file" onChange={() => inputChange()} />
                        </div>
                        <span ref={rightBtn} className="more-options" onClick={(e) => dropDownClick(e)}>
                            <IconFont type="icon-xiala" style={{fontSize: 26}}/>
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
                    <div className="btn-convert" onClick={()=>convertTo()}>
                        <IconFont type="icon-xunhuan" style={{ fontSize: 20, lineHeight: '22px', marginRight: '15px', verticalAlign: 'middle'}}/>
                        转换
                    </div>
                </div>
            </div>
            <style>{`
                .container{
                    background:${bgColor};
                    color:${fontColor};
                    line-height: 1;
                }
                .upfile{
                    width:1140px;
                    box-sizing:border-box;
                    padding:27px;
                    margin-left:auto;
                    margin-right:auto;
                }
                .upfile-list{
                    list-style: none;
                    padding-left: 0;
                    margin-bottom: 0;
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
                .upfile-items .items-left p{
                    line-height:20px;
                    text-overflow:ellipsis;
                    overflow:hidden; 
                    white-space:nowrap; 
                    width:350px;
                    margin-bottom: 0;
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
                    padding:0.9rem 1.24rem;
                    line-height:1.24;
                    font-size:18px;
                    border-radius:.27rem;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    background:${btnColor[1]};
                }
                .more-content span{
                    font-size:20px;
                    margin:0 10px 0 0;
                }
                .more-content:hover{
                    background:#202020;
                }
                .btn-more .more-options{
                    padding:0.9rem 1rem;
                    line-height: 1.24;
                    border-radius:.27rem;
                    border-top-left-radius:0;
                    border-bottom-left-radius:0;
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
                    width:184px;
                    height:55px;
                    opacity: 0;
                    filter:alpha(opacity=0);
                }
            `}</style>
        </div>
    )
}
export default Upfile;