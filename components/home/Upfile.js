import React , { useRef, useContext, useEffect } from 'react';
import { FileContext, UPLOAD_FILE, } from '../../until/store/store';
import { fileUntils } from '../../until/fileUntils'
const Upfile = () => {
    const bgColor = "#f9f9f9";
    const fontColor = "#202020";
    const btnColor = ["#b53836","#303030"];
    const yuntu = 'yuntuApi';
    const namespace = 'upfile';

    const inputFile = useRef(null);
    const { state, dispatch } = useContext(FileContext);
    
    useEffect(()=>{
        if(state.fileList[0]){
            dispatch({type:UPLOAD_FILE ,state:{fileList:state.fileList,fromType:fileUntils.getFileType(state.fileList[0].name).toUpperCase(),uploaded:true}}); 
        }
    },[state.fileList]);
    if(!state.uploaded){
        return null;
    }
    console.log(state.fileList);
    function deleteFile(arr, index){
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    };

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
                                    <span className="iconfont">&#xe636;</span>
                                    转换为
                                    <div className="center-control">...<span className="iconfont">&#xe656;</span></div>
                                </div>
                                <div className="items-right">
                                    <span className="iconfont" onClick={()=>dispatch({type:UPLOAD_FILE,state:{fileList:deleteFile(state.fileList,index),uploaded:state.fileList.length-1!==0}})}>&#xe630;</span>
                                </div>
                            </li>
                        ))
                        :null
                    }
                </ul>
                <div className="upfile-btn">
                    <div className="btn-more">
                        <div className="more-content">
                            <span className="iconfont">&#xe664;</span>
                            添加更多文件
                            <input ref={inputFile} className="hide" type="file" onChange={() => dispatch({type:UPLOAD_FILE,state:{fileList:[...state.fileList,inputFile.current.files[0]],uploaded:true}})} />
                        </div>
                        <span className="iconfont more-options">&#xe656;</span>
                    </div>
                    <div className="btn-convert">
                        <span className="iconfont">&#xe636;</span>
                        转换
                    </div>
                </div>
            </div>
            <style>{`
                .container{
                    width:100%;
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
                .upfile-items .items-center span{
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
                    font-weight:600;
                    cursor:pointer;
                }
                .upfile-items .items-center .center-control span{
                    margin:0 0 0 5px;
                    font-size:15px;
                }
                .upfile-items .items-right span{
                    padding:15px;
                    font-size:10px;
                    font-weight:800;
                    line-height:20px;
                    color:${btnColor[0]};
                }
                .upfile-btn{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin:25px 0;
                }
                .btn-more{
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
                    opacity:.65;
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