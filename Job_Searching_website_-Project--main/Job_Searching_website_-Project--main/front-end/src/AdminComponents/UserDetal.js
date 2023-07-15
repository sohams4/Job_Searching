import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
function UserDetail() {

    const {email}=useParams();
    const [user,setuser]=useState([]);
    useEffect(()=>{
        const getuser=async()=>{

            let result=await axios.post('http://localhost:5000/user/profile',{
                email:email
            })
            setuser(result.data);
        }
        getuser();
    },[])
    const handleClick=()=>{
        document.location.replace('/adminHome');
    }
  return (
    <div>
        {user.map((data,index)=>(
            <div className='flex flex-col bg-gradient-to-r from-sky-600 to-blue-700 h-screen text-white items-center justify-center'>
                
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                                <p className='text-[24px] font-medium tracking-wider'>Name:</p>
                                <p className='text-[24px] tracking-wider'>{data.name}</p>   
                            </div>   
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                                <p className='text-[24px] font-medium tracking-wider'>Email:</p>
                                <p className='text-[24px] tracking-wider'>{data.email}</p>   
                            </div> 
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                                <p className='text-[24px] font-medium tracking-wider'>Education:</p>
                                <p className='text-[24px] tracking-wider'>{data.education}</p>   
                            </div> 
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                                <p className='text-[24px] font-medium tracking-wider'>Work Experience:</p>
                                <p className='text-[24px] tracking-wider'>{data.workExperience}</p>   
                            </div> 
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                                <p className='text-[24px] font-medium tracking-wider'>Skills:</p>
                                <p className='text-[24px] tracking-wider'>{data.skills}</p>   
                            </div> 
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                                <p className='text-[24px] font-medium tracking-wider'>Gender:</p>
                                <p className='text-[24px] tracking-wider'>{data.gender}</p>   
                            </div> 
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                                <p className='text-[24px] font-medium tracking-wider'>Registration No:</p>
                                <p className='text-[24px] tracking-wider'>{data.registrationNo}</p>   
                            </div>      
                            <div className=' flex flex-row items-center justify-center space-x-3 pt-4'>
                            <button className='w-[200px] h-[65px] bg-green-700 rounded-lg' onClick={()=>handleClick()}>
                                Back To Previous Page
                            </button>
                            </div>
            </div>
        ))}
      
    </div>
  )
}

export default UserDetail