import React, { Component } from 'react';
import { FaPen } from "react-icons/fa";
import Navbar from './Navbar';
import "./Addbooking.css"
function AddBooking()
{
    return(
      <div>
        <Navbar/>
        <div class="container p-4 m-5 bg-light bg-darken-lg text-dark 
        text-dark font-weight-bold border border-dark rounded mx-auto"
        id ='MyBookingBody'>
            
            <h4 class="text-center bg-dark text-white mt-0 mb-5 p-3">Booking Details</h4>
             
              <div className='space'>
            
                <div class="row">
                  <div class="col">
                    <input class="rounded font-italic text-white border border-dark p-2"
                    type='text' placeholder ='Train Name'></input>
                  </div>
                  <div class="col">
                    <input class="rounded font-italic text-dark border 
                    border-dark p-2 mb-4"
                    type='text' placeholder ='Address'></input>
                  </div>
                </div>
            
                <div class="row">
                  <div class="col">
                    <input class="rounded font-italic text-dark border 
                    border-dark p-2" id='editBookingDate' 
                    type='date' placeholder ='Edit From Date'></input>
                  </div>
                  <div class="col">
                    <input class="rounded font-italic text-dark border border-dark 
                    p-2 mb-4" id='editBookingDate'
                    type='date' placeholder ='Edit To Date'></input>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <input class="rounded font-italic text-dark border 
                    border-dark p-2 mb-4" id='editNoOfPerson' 
                    type='text' placeholder ='No Of Person'>
                    </input>
                    <FaPen className='editIcon'></FaPen>
                  </div>
                  <div class="col">
                    <input class="rounded font-italic text-dark border border-dark p-2"
                    type='text' placeholder ='Total Price'></input>
                  </div>
                </div>

              </div>

              <div className = 'cancelbtn'>
                <button type='button' id='cancelBookingButton'
                class='mt-3 btn btn-danger border border-dark'>Cancel Booking</button>
              </div>
           
          </div>
      </div>
    )
}
export default AddBooking;