import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
function Signin() {


  const [wrongCred,setwrongCred]=useState(false);
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();
  const auth=localStorage.getItem("email");
  const handleUserLogin=async()=>{
    const result=await axios.post('http://localhost:5000/userLogin',{
      email:email,
      password:password
    })
    if(result.data.msg==='User found')
    {
      localStorage.setItem("email",email);
      setwrongCred(false);
      navigate('/userHome')
    }
    else{
      setwrongCred(true);
      setemail("");
      setpassword("");
    }
  }
  const handleAdminLogin=async()=>
  {
    const result=await axios.post('http://localhost:5000/adminLogin',{
      email:email,
      password:password
    })
    if(result.data.status===1)
    {
      localStorage.setItem("email",email);
      setwrongCred(false);
      navigate('/adminHome')
    }
    else if(result.data.status===0)
    {
      setwrongCred(true);
      setemail("");
      setpassword("");
    }
  }
  return (
    <div>
      {
        auth?<Home/>:<div className='h-screen bg-gray-300 flex items-center justify-center'>
        
        <div className='h-[350px] w-[500px] bg-white rounded-lg flex flex-col p-5 space-y-4'>
            <p className='font-semibold text-[17px] pl-3 mb-4'>Login with your Creadentials</p>
            <input placeholder='email address' value={email} name='email' onChange={(e)=>setemail(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
            <input placeholder='password' value={password} name='password' onChange={(e)=>setpassword(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
           {wrongCred? <div className='flex items-center justify-center'><p className='text-[14px] font-semibold text-red-600'>Invalid Email or Password</p></div>:<></>}
            <div className='flex flex-row space-x-2 items-center justify-center '>
              <button className='w-[180px] h-[40px] bg-blue-500 text-white text-[16px] rounded-lg' onClick={handleUserLogin}>user login</button>
              <button className='w-[180px] h-[40px] bg-red-500 text-white text-[16px] rounded-lg' onClick={handleAdminLogin}>admin login</button>
            </div>
            <div className='flex flex-col items-center justify-center'>
            <p className='text-[14px] font-semibold'>Don't have an account?<Link to='/register'><span className='text-[14px] font-semibold text-red-500 cursor-pointer'> Register User</span></Link></p>
            
            </div>
        </div>
         
      </div>
      }
    </div>
  )
}

export default Signin