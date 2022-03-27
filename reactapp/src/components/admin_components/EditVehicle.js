import React, { Component, useContext } from 'react';
import Navbar from "./Navbar";
import "../../index.css";

import {Container,Paper} from '@material-ui/core';
import  { useState } from "react";
import TextField from '@mui/material/TextField';
import {Button} from '@material-ui/core';

const EditVehicle = (trainItem) => {
  const paperstyle={padding:"50px 20px",width:900,margin :"40px auto" }
  const { trainName, img, price, time, place } = trainItem;
  
  //const vehicle={name,timing,fromTo,imageURL,fair,capacity,description}
     
 
  
  const[name,setName]=useState(trainItem.name)
  const[timing,setTiming]=useState(trainItem.timing)
  const[fromTo,setfromTo]=useState(trainItem.fromTo)
  const[imageURL,setImageUrl]=useState(trainItem.imageURL)
  const[fair,setFair]=useState(trainItem.fair)
  const[capacity,setCapacity]=useState(trainItem.capacity)
  const[description,setDescription]=useState(trainItem.description)
 
    
  const[nameError,setNameError]=useState(false)
  const[timingError,setTimingError]=useState(false)
  const[fromToError,setFromToError]=useState(false)
  const[imageUrlError,setImageUrlError]=useState(false)
  const[fairError,setFairError]=useState(false)
  const[capacityError,setCapacityError]=useState(false)
  const[descriptionError,setDescriptionError]=useState(false)
 
  const handleClick=(e)=>
  {
    if(name==''){setNameError(true)}
    if(timing==''){setTimingError(true)}
    if(fromTo==''){setFromToError(true)}
    if(imageURL==''){setImageUrlError(true)}
    if(fair==''){setFairError(true)}
    if(capacity==''){setCapacityError(true)}
    if(description==''){setDescriptionError(true)}
  
  
  
      e.preventDefault()
      setNameError=('false')
      setTimingError=('false')
      setFromToError=('false')
      setImageUrlError=('false')
      setFairError=('false')
      setCapacityError=('false')
      setDescriptionError=('false')
     
    
       
     
     // const vehicle={name,timing,fromTo,imageURL,fair,capacity,description}
     
 
 
 
     
  }
  
    function getList()
    {
       fetch("http://localhost:4000/EditVehicle").then((result)=>
       {
         result.json().then((resp)=>
         {
          // setUser(resp)
         })
       }
       ) 
   }
 
 
  
 
   function deleteVehicle(vehicle)
   {
     //alert(vehicle)
     fetch("http://localhost:8080/admin/EditVehicle/${id}",
     {
         method:"POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify()
     }).then((result)=>{
         result.json().then((resp)=>{
           console.warn(resp)
         })
     })
   }

  return (
    <>
      <Navbar />
      <div id="dashBoard" className="container-fluid bg-user-dashboard py-3">
      <React.Fragment>
          <Paper elevation={7} style={paperstyle}>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</link>
            <div className="container">
             <div class="row" style={{borderRadius:'50px'}}>
               <br></br>
             <center><h3>Edit Vehicle</h3></center>
   <div class="col-9" >
   <br></br>
 


   </div>

    <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
     <div class="col-4" >
     <div class="card" style={{width: '4000', margin:'1px',float:'left', borderRadius:'25px'}}>
        <img class="card-img-top" src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/4/12/w900X450/Train.jpg?w=400&dpr=2.6" alt="Card image cap" style={{height:'900',borderRadius:'20px 20px 0px 0px'}}/>
        <div class="card-body" style={{backgroundColor:' #293d3d',height:'400',borderRadius:'0px 0px 20px 20px'}}>
          <h5 class="card-title"  style={{color: 'white'}}>{trainName} </h5>
          <p class="card-text" style={{color: 'white'}}>Address:{place}</p>
          <div style={{display:'block',float:'right'}}>
          <i class="fa fa-trash-o" style={{font:'150px',color:'white' }} 
            onClick={()=>deleteVehicle({trainItem})}
            
        
        ></i>
        </div>
          <p class="card-text" style={{color: 'white'}}>Available Timing:{timing}</p>
          <div style={{display:'block',float:'right'}}
          >
        <i class="fa fa-edit" style={{font:'150px',color:'white'}}></i>
        </div>
         
          <p class="card-text" style={{color: 'white'}}>Price:{price}</p> 
        
        
        
        </div>
      </div>
      </div>
 
 
   
 
 
  <div class="col-6">
     
  <form  class="needs-validation" noValidate  autoComplete='off'>
      
      <TextField id="addName" label="Enter Name"  variant="outlined"  fullWidth
      value={name}
      error={nameError}
      onChange={(e)=>setName(e.target.value)}
       required />
      <br/>


      <TextField id="addTiming" label="Enter Available Timing" variant="outlined" fullWidth
      value={timing}
      error={timingError}
      onChange={(e)=>setTiming(e.target.value)}
     required />
      <br/>



      <TextField id="addFromTo" label="Enter the From and To" variant="outlined"  fullWidth
      value={fromTo}
      error={fromToError}
      onChange={(e)=>setfromTo(e.target.value)}
     required />
       <br/>


      <TextField id="addImageUrl" label="Enter the Image Url" variant="outlined" fullWidth
      value={imageURL}
      error={imageUrlError}
      onChange={(e)=>setImageUrl(e.target.value)}
      required/>
       <br/>

       <TextField id="addPrice" label="Enter the fair per person" variant="outlined" fullWidth
      value={fair}
      error={fairError}
      onChange={(e)=>setFair(e.target.value)}
      required/>
       <br/>

       <TextField id="Traincapacity" label="Enter no of capacity" variant="outlined" fullWidth
      value={capacity}
      error={capacityError}
      onChange={(e)=>setCapacity(e.target.value)}
      required/>
       <br/>

       <TextField id="addDescription" label="Description about product" variant="outlined" fullWidth
      value={description}
      error={descriptionError}
      onChange={(e)=>setDescription(e.target.value)}
      required/>
       <br/>

    <br></br>
    <center> <Button variant="contained" id="addButton" color="secondary" onClick={handleClick}  style={{ backgroundColor: "#570000"}}>Add</Button></center> 
      </form>
  </div>
</div>
</div>
</Paper>
          </React.Fragment>
      </div>
    </>
  );
};

export default EditVehicle;
