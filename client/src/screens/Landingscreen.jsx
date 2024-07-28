import {Link} from 'react-router-dom'
import React from 'react'

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
        <div className="col-md-9 my-auto text-center " style={{borderRight:"8px solid white"}}>
            <h2 style={{color:'white',fontSize:"130px" ,fontFamily:"fantasy"}}>Book My Room</h2>
            <h1 className="quot"style={{color:'white',marginTop:'30px'}}>"There is only one boss. The Guest"</h1>
            <Link to='/home'>
            <button className='btn get' >Get Started</button>
            </Link>
            </div>
    </div>
  )
}

export default Landingscreen