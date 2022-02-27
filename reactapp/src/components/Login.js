import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom'
import { RailContext } from './context/context';
// import './index.css';
const Login = () => {
    // const[loginemail,setLoginEmail]=useState("");
    // const[loginpassword,setLoginPassword]=useState("");
    const{login,loginHandle}=useContext(RailContext);
  return (
      <div className="container d-flex justify-content-center align-items-center" style={{height: "30rem"}}>
        <div className="card " style={{width: "28rem"}}>
        <h5 className="card-header nav-bg text-white">Login</h5>
            <div className="card-body">
            <form>
            <div className="mb-2">
                <input id="email" name='loginEmail' value={login.loginEmail} onChange={(e)=>loginHandle(e)} className="form-control" type="email" placeholder="Enter email" aria-label="default input example"/>
            </div>
            <div className="mb-2">
                <input id="password" value={login.loginPassword} name="loginPassword" onChange={(e)=>loginHandle(e)} className="form-control" type="password" placeholder="Enter Password" aria-label="default input example"/>
            </div>
            <button type="submit" id="loginButton" className="btn nav-bg text-white  m-1">Login</button>
            <span id="signupLink"><p className="text-muted me-1 d-inline-block">New User/admin?</p><Link to="/signup">Sign Up</Link></span>
            </form>
            </div>
            
        
      </div>

  </div>);
};

export default Login;
