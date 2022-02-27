import React from 'react'

const Passanger = ({count}) => {
  return (
    <div className="card-body">
        <h5>Person {count}</h5>
        <div className="d-flex justify-content-center align-items-center">
            <div className='col-md-3'>
                <input id="firstName" class="form-control" type="text" placeholder="First name" aria-label="default input example"/>
            </div>
            <div className='col-md-3'>
                <input id="lastName" class="form-control" type="text" placeholder="Last name" aria-label="default input example"/>
            </div>
            <div className='col-md-3'>
                <input id="age" class="form-control" type="text" placeholder="Age" aria-label="default input example"/>
            </div>
            <div className='col-md-3'>
                <input id="gender" class="form-control" type="text" placeholder="Gender" aria-label="default input example"/>
            </div>
        </div>
    </div>
  )
}

export default Passanger