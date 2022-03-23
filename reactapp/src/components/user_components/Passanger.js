import React, { useContext } from 'react'
import { RailContext } from '../context/context';
import { FcApproval} from "react-icons/fc";
const Passanger = () => {
const {singlePassanger,SinglePassangerDetail,MultiplePassangerDetail,person,passangerDetails}=useContext(RailContext);
console.log(passangerDetails.length+" "+person)
  return (
      
    <div className="card-body">
        <h5>Person </h5>
        <div className="d-flex justify-content-center align-items-center">
            <div className='col-md-3'>
                <input   id="firstName" onChange={(e)=>SinglePassangerDetail(e)} class="form-control" type="text" value={singlePassanger.firstName} name="firstName" placeholder="First name" aria-label="default input example"/>
            </div>
            <div className='col-md-3'>
                <input  id="lastName" onChange={(e)=>SinglePassangerDetail(e)} class="form-control" type="text" value={singlePassanger.lastName} name="lastName"  placeholder="Last name" aria-label="default input example"/>
            </div>
            <div className='col-md-2'>
                <input  id="age" onChange={(e)=>SinglePassangerDetail(e)} class="form-control" type="text" value={singlePassanger.age} placeholder="Age" name="age"  aria-label="default input example"/>
            </div>
            <div className='col-md-2'>
                <input  id="gender" onChange={(e)=>SinglePassangerDetail(e)} class="form-control" type="text" value={singlePassanger.gender} placeholder="Gender" name="gender"  aria-label="default input example"/>
            </div>
            <div className='col-md-2'>
                {person==passangerDetails.length?<button disabled className='btn btn-success' onClick={()=>MultiplePassangerDetail()}>Add</button>:
                <button className='btn btn-success' onClick={()=>MultiplePassangerDetail()}>Add</button>}
            </div>
        </div>
    </div>
  )
}

export default Passanger