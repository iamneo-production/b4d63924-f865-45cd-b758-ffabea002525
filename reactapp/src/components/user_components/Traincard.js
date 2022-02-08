import React from 'react';

const Traincard = ({trainItem}) => {
    const{trainName,img,price,time,place}=trainItem;
  return <div className='col-md-4 my-2'>
            <div className="card">
    <img src={img} className="card-img-top" alt="trainImg" style={{height:"18rem"}} />
    <div className="card-body">
        <h5 className="card-title">{trainName}</h5>
        <p className="card-text">Place : {place} </p>
        <p className="card-text">Timing : {time}</p>
        <p className="card-text">Price : {price} per head</p>
    </div>
    </div>
            
  </div>;
};

export default Traincard;




