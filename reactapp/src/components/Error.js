import React from 'react';
import {Link} from 'react-router-dom';
import { BiErrorAlt } from "react-icons/bi";
import './../index.css';
const Error = () => {
  return (
      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <h1>Oops Error < BiErrorAlt className="text-danger"/></h1>
        <Link to="/user/dashboard" className='btn nav-bg text-white'>Go Back</Link>
    </div>
  )
}

export default Error;
