import React,{useState} from 'react';
// import '../index.css';
const Signup = () => {
    const[usertype,setUserType]=useState("");
    const[emailsignup,setEmailSignup]=useState("");
    const[usernameSignup,setUsernameSignUp]=useState("");
    const[mobileSignup,setMobileSignup]=useState("");
    const[passwordsignup,setPasswordSignup]=useState("");
    const[cpassword,setCpassword]=useState("");
  return <div className="container d-flex justify-content-center align-items-center" style={{height: "30rem"}}>   
        
  <div className="card " style={{width: "28rem"}}>
  <h5 className="card-header nav-bg text-white">Register</h5>
      <div className="card-body">
          <form>
      <div className="mb-2">
          <input id="admin/user" onChange={(e)=>setUserType(e.target.value)} className="form-control" type="text" placeholder="Enter admin/user" aria-label="default input example"/>
      </div>
      <div className="mb-2">
          <input id="email" onChange={(e)=>setEmailSignup(e.target.value)} className="form-control" type="email" placeholder="Enter email" aria-label="default input example"/>
      </div>
      <div className="mb-2">
          <input id="username" onChange={(e)=>setUsernameSignUp(e.target.value)} className="form-control" type="text" placeholder="Enter Username" aria-label="default input example"/>
      </div>
      <div className="mb-2">
          <input id="mobileNumber" onChange={(e)=>setMobileSignup(e.target.value)} className="form-control" type="text" placeholder="Enter Mobilenumber" aria-label="default input example"/>
      </div>
      <div className="mb-2">
          <input id="password" onChange={(e)=>setPasswordSignup(e.target.value)} className="form-control" type="password" placeholder="Enter Password" aria-label="default input example"/>
      </div>
      <div className="mb-2">
          <input id="confirmPassword" onChange={(e)=>setCpassword(e.target.value)} className="form-control" type="password" placeholder="Confirm Password" aria-label="default input example"/>
      </div>
      <div className='d-flex flex-column align-items-center'>
      <button type="submit" id="submitButton" className="btn nav-bg text-white d-block m-2">Submit</button>
      <span id="signinLink" ><p className="text-muted me-1 d-inline-block">Already a user?</p><a>Login</a></span>
      </div>
      </form>
      </div>
  
  
</div>

</div>;
};

export default Signup;
