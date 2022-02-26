import React,{useContext} from 'react'
import{Link} from 'react-router-dom'
import { RailContext } from '../context/context';
import Navbar from './Navbar';
import Passanger from './Passanger';


const Vehicle = () => {
    const{currentId,personRows,vehicleData,person,handlePerson}=useContext(RailContext)
    
    console.log(vehicleData);
    if(vehicleData===undefined||vehicleData===null){
        return <div className='d-flex justify-content-center align-items-center mt-5'>
            <Link className="btn btn-dark" to="/user/dashboard">Go back</Link>
        </div>
    }
    return (
        <>
        <Navbar/>
          <div className='container-fluid'>
          <div className='container' id="dashBoardBody">
          <div className="card mt-5" id="dsgrid1">
              <h5 className="card-header text-success">Available</h5>
              <div className="card-body">
                  <h5 className="card-title text-center">{vehicleData.trainName}</h5>
                  <p className="card-text">Place: {vehicleData.place}</p>
                  <div className='row mb-3'>
                      <div className='col-md-4' >
                          <span>From :</span><input id="fillFromDate" type="date" className="form-control "   />
                      </div>
                      <div className='col-md-4' >
                          <span>To :</span><input id="fillToDate" type="date" className="form-control "  />
                      </div>
                  </div>
                  <div className='row'>
                      <div className='col-md-4'>
                      <input type="number" className="form-control" id="enterNoTicket" value={person} onChange={(e)=>handlePerson(e)}  placeholder="Enter number of person" />
                      </div>
                     <div className='col-md-4'>
                     <p >Price: {vehicleData.price} per head</p>
                     </div>
                      <div className='col-md-4'>
                      <button className='btn btn-dark' id="bookButton">Book</button>
                      </div>
                      
                  </div>
              </div>
              </div>
          </div>
          <div className='container my-5'>
            <div class="card">
                <div class="card-header text-center text-success">
                    Add Passanger Details
                </div>
                {
                    personRows.map((data)=>data)
                }
            </div>
          </div>
          </div>
      </>
    )
}

export default Vehicle