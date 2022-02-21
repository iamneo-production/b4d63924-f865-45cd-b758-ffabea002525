import React,{useState} from 'react'
import traindata  from './Train';
const RailContext=React.createContext();

 

const RailProvider=({children})=>{
    const[trainData,setTrainData]=useState(traindata);
    const[login,setLogin]=useState({
        loginEmail:"",
        loginPassword:""
    })
    const[signup,setSignup]=useState({
        userType:"",
        userSignupemail:"",
        usernameSignup:"",
        mobileSignup:"",
        passwordsignup:"",
        cpassword:""


    })

    const loginHandle=(e)=>{
        const name=e.target.name;
        const val=e.target.value
        setLogin({...login,[name]:val});
    }

    const signupHandle=(e)=>{
        const name=e.target.name;
        const val=e.target.value
        setSignup({...signup,[name]:val});
    }


    return <RailContext.Provider value={{trainData,login,loginHandle,signup,signupHandle}}>
        {children}
    </RailContext.Provider>
}



export {RailContext,RailProvider};
