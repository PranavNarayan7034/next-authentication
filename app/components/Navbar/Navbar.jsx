import React from 'react'
import './Navbar.scss'

const Navbar = () => {
  return (
      <div className='navbar'>
          <h1>logo</h1>
          <div className="navlinks">
              <a href="">Home</a>
              <a href="">About</a>
              <a href="">Contact</a>
          </div>
          <div className="btns">
              <button>LogIn</button>
              <button>SignUp</button>
          </div>
    </div>
  )
}

export default Navbar