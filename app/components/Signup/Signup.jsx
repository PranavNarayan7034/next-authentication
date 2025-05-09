'use client'
import React, { useState, useEffect } from 'react'
import '../Login/Login.scss'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Signup = () => {
    const router = useRouter()
    //user creation
    const [user, setUser] = useState({
        Username: "",
        Email: "",
        Password: "",
    })
    const [error,setError] = useState("")
    
    // Submit of Signup button
    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Sucess", response.data)
            setError('Signup Success..')
            router.push("/login")
        } catch (error) {
            setError("Signup Failed..")
            console.log("Signup Failed",error.message)
        }
    }

    // Button Disable
    const [disabledButton, setDisabledButton] = useState(true)
    useEffect(() => {
        if (user.Username.length > 0 && user.Email.length > 0 && user.Password.length > 0){
            setDisabledButton(false)
        }
        else {
            setDisabledButton(true)
        }
    },[user])

  return (
    <div className='page'>
        <div className="Signup">
              <h1>Signup</h1>
              <div className="inp">
                  <label htmlFor="usrnm">USERNAME:</label>
                  <input id='usrnm' type="text" placeholder='Enter your username'
                    value={user.Username}
                  onChange={(e)=>setUser({...user,Username:e.target.value})}
                  />
              </div>
              <div className="inp">
                  <label htmlFor="emails">EMAIL:</label>
                  <input id='emails' type="email" placeholder='Enter your email'
                  value={user.Email}
                  onChange={(e)=>setUser({...user,Email:e.target.value})}
                  />
              </div>
              <div className="inp">
                  <label htmlFor="pswrd">PASSWORD:</label>
                  <input id='pswrd' type="password" placeholder='Enter your password'
                  value={user.Password}
                  onChange={(e)=>setUser({...user,Password:e.target.value})}
                  />
              </div>  
              <div className="btn" onClick={onSignup}>
                  <button className={`${disabledButton ? "disabled" : ""}`}>Signup</button>
              </div>
              {error && <div className='text-center text-white'>{error}</div>}
              <Link href="/login">Already user</Link>
        </div>
    </div>
  )
}

export default Signup