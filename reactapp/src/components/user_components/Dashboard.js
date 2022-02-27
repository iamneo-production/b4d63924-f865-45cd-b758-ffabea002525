import React, { useContext } from 'react';
import Navbar from './Navbar';
import '../../index.css';
import Traincard from './Traincard';
import Searchcomponent from './Searchcomponent';
import { RailContext } from '../context/context';


const Dashboard = () => {
  const{trainData}=useContext(RailContext);
  
  return <>
  <Navbar/>
  <div id="dashBoard" className="container-fluid bg-user-dashboard py-3">
    <Searchcomponent/>
    <div className='row'>
       {trainData.map((trainItem)=>{
           
           return <Traincard key={trainItem.id} trainItem={trainItem}  />
       })}
    </div>
  </div>
  </>;
};

export default Dashboard;
