import React from 'react';
import Navbar from './Navbar';
import '../../index.css';
import Traincard from './Traincard';
import Searchcomponent from './Searchcomponent';
import { traindata } from './Train';

const Dashboard = () => {
  return <>
  <Navbar/>
  <div id="dashBoard" className="container-fluid bg-user-dashboard py-3">
    <Searchcomponent/>
    <div className='row'>
       {traindata.map((trainItem)=>{
           
           return <Traincard key={trainItem.id} trainItem={trainItem} />
       })}
    </div>
  </div>
  </>;
};

export default Dashboard;
