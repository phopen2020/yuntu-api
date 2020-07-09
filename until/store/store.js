import React, { createContext,useReducer } from 'react';

export const FileContext = createContext({});
export const UPLOAD_FILE = "UPLOAD_FILE";
const reducer = (state,action)=>{
    switch(action.type){
        case UPLOAD_FILE:
            return action.state;
        default:
            throw new Error();
    }
}
export const File = props => { 
    const [state, dispatch] = useReducer(reducer,{fileList:[],uploaded:false,fromType:'',toType:''});
    return (
        <FileContext.Provider value={{state,dispatch}}>
            {props.children}
        </FileContext.Provider>
    )
}


export const BtnSizeContext = createContext({});
export const ConfigContext = createContext({});
export const GlobalContext = createContext({});
export const ProgressContext = createContext({});