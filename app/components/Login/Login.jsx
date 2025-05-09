'use client'
import React,{useState,useEffect} from 'react'
import './Login.scss'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        "Email": "",
        "Password": "",
    })
    const [error,setError] = useState("")

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user)
            console.log('Login Success...')
            setError('Login Success')
            router.push("/profile")
        } catch (error) {
            console.log('Login Failed...')
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            }
        }
    }

    const [disabledButton, setDisabledButton] = useState(true)
        useEffect(() => {
            if (user.Email.length > 0 && user.Password.length > 0){
                setDisabledButton(false)
            }
            else {
                setDisabledButton(true)
            }
        },[user])

  return (
    <div className='page'>
        <div className="Login">
              <h1>Login</h1>
              <div className="inp">
                  <label htmlFor="emails">EMAIL:</label>
                  <input id='emails' type="text" placeholder='Enter your email'
                      value={user.Email}
                      onChange={(e)=>setUser({...user,Email:e.target.value})}
                  />
              </div>
              <div className="inp">
                  <label htmlFor="pswrd">PASSWORD:</label>
                  <input id='pswrd' type="password" placeholder='Enter your password'
                      value={user.Password}
                      onChange={(e) => setUser({ ...user, Password: e.target.value })}
                  />    
              </div>
              <div className='btn' onClick={onLogin}>
                  <button className={`${disabledButton ? "disabled" : ""}`}>Login</button></div>
              {error && <div className='text-xl text-center'>
                  {error}</div>}
              <Link href="/signup">Create Account</Link>
        </div>
    </div>
  )
}

export default Login 


