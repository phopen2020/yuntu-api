import { useContext, useEffect, useRef } from 'react';
import { ProgressContext } from '../store/store';
const Progress = () => {
    const {uploadPercentList,uploadTextColorList,index} = useContext(ProgressContext);
    const block = useRef(null);
    const text = useRef(null);
    useEffect(()=>{
        if(uploadPercentList){
            block.current.style.left = "-" + uploadPercentList[index] + "%";
            text.current.style.color = uploadTextColorList[index];
        }
    },[uploadPercentList])

    return (
        <div className="container" id="progress-container">
            <div className="progress">
                <div className="progress-bg"></div>
                <div className="progress-block" ref={block}></div>
                <div className="progress-text" ref={text}>{uploadPercentList.length!==0?100-uploadPercentList[index]:0}%</div>
            </div>
            <style>{`
                #progress-container{
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 6%;
                    right:-265%;
                }
                .progress{
                    position: relative;
                    width: 100px;
                    height: 20px;
                    overflow: hidden;
                }
                .progress-bg{
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ffc107;
                    border-radius: 3px;
                    box-sizing: border-box;
                }
                .progress-block{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 3px;
                    top: 0;
                    left: -100%;
                    background-color: #ffc107;
                }
                .progress-text{
                    position: absolute;
                    top:28%;
                    left:38%;
                    height:100%;
                    font-size:12px;
                    color:#ffc107;
                    z-index: 999;
                }
            `}</style>
        </div>
    )
}
export default Progress;