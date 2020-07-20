import React, { createContext,useReducer } from 'react';

export const YuntuContext = createContext({});

export const UPLOAD_FILE = "UPLOAD_FILE";

const initialState = {
    fileList:[],
    uploaded:false,
    fromType:'',
    toType:''
}
const reducer = (state,action)=>{
    console.log(state,action)
    switch(action.type){
        case UPLOAD_FILE:
            return action.state;
        default:
            throw new Error();
    }
}
export const Yuntu = props => { 
    const [state, dispatch] = useReducer(reducer,initialState);
    return (
        <YuntuContext.Provider value={{state,dispatch}}>
            {props.children}
        </YuntuContext.Provider>
    )
}


export const BtnSizeContext = createContext({});
export const ConfigContext = createContext({});
export const GlobalContext = createContext({});
export const ProgressContext = createContext({});