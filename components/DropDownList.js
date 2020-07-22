import React, { useContext, useRef } from 'react';
import { BtnSizeContext } from '../store/store';
import IconFont from './IconFont';
const DropDownList = () => {
    const {btnSize,btnList,inputChange,isUploadBtn} = useContext(BtnSizeContext);
    const inputFile = useRef(null);
    const yuntu = 'yuntuApi';
    const namespace = 'introduce';

    function itemClick(index,e){
        e.stopPropagation();
        switch(index){
            case 1:
                break;
        }
    }

    return (
        <div className="container">
            <ul className="list" style={{top:btnSize.height+"px",left:btnSize.left+"px",width:btnSize.width+"px"}}>
                {btnList.map((item,index)=>(
                    <li className="list-items" key={yuntu + namespace + item.id + 'btnList'} onClick={(e)=>itemClick(index,e)}>
                        <span className="items-icon">
                            <IconFont type={item.iconType}/>
                        </span>
                        {item.title}
                        {isUploadBtn&&index===0?<input ref={inputFile} className="hide" style={{width:btnSize.width+"px"}} type="file" onChange={() => inputChange(inputFile.current.files[0])}/>:null}
                    </li>
                ))}
            </ul>
            <style>{`
                .list{
                    color:#5a5a5a;
                    position:absolute;
                    padding:10px 0;
                    background:#fff;
                    box-shadow: 0 1px 3px rgba(0,0,0,.1);
                    border-radius: .2rem;
                    font-weight: 500;
                    box-sizing:border-box;
                    list-style: none;
                }
                .list-items{
                    padding:15px 20px 15px 55px;
                    font-size:15px;
                    cursor:pointer;
                }
                .list-items:hover{
                    background:#e6e6e6;
                }
                .items-icon{
                    position:absolute;
                    left:20px;
                    font-size:15px;
                }
                .hide{
                    overflow:hidden;
                    position:absolute;
                    right:0;
                    top:10px;
                    height:44px;
                    opacity:0;
                    filter:alpha(opacity=0);
                }
            `}</style>
        </div>
    )
}
export default DropDownList;