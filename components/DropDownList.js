import React, { useContext } from 'react';
import { BtnSizeContext } from '../until/store/store';
const DropDownList = () => {
    const {btnSize,btnList} = useContext(BtnSizeContext);
    const yuntu = 'yuntuApi';
    const namespace = 'introduce';
    return (
        <div className="container">
            <ul className="list">
                {btnList.map((item)=>(
                    <li className="list-items" key={yuntu + namespace + item.id + 'btnList'}>
                        <span className="iconfont items-icon">{item.icon}</span>
                        {item.title}
                    </li>
                ))}
            </ul>
            <style>{`
                .list{
                    color:#5a5a5a;
                    position:absolute;
                    top:${btnSize.height}px;
                    left:${btnSize.left}px;
                    width:${btnSize.width}px;
                    padding:10px 0;
                    background:#fff;
                    box-shadow: 0 1px 3px rgba(0,0,0,.1);
                    border-radius: .2rem;
                    font-weight: 500;
                    box-sizing:border-box;
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
            `}</style>
        </div>
    )
}
export default DropDownList;