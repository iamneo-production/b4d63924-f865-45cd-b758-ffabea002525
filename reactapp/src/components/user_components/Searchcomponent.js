import React from 'react';
import '../../index.css';
const Searchcomponent = () => {
  return <div className='container'>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Type here to search"  />
                <button className="btn nav-bg text-white" type="button" id="searchButton">Search</button>
            </div>
        </div>;
};

export default Searchcomponent;
