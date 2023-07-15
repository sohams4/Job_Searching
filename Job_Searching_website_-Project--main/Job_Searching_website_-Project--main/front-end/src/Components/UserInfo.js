import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
function UserInfo() {
    
    const navigate=useNavigate();

    const handleRefresh=()=>
    {
        window.location.reload();
        
    }
    const handleLocalSignout=()=>
    {
        localStorage.clear();
        navigate('/');
    }

    const [user,setuser]=useState([]);
    useEffect(()=>{
        const getuser=async()=>{

            let result=await axios.post('http://localhost:5000/user/profile',{
                email:localStorage.getItem('email')
            })
            setuser(result.data);
        }
        getuser();
    },[])
  return (
    <div>
        <div className='flex flex-row h-screen'>
            <div className='basis-3/12 bg-gradient-to-r from-sky-600 to-blue-700 flex flex-col items-center justify-center space-y-8'>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/userHome')}>Show Available Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/appliedJobs')}>Applied Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/applicationResult')}>Jobs Feedback</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>handleRefresh}>Profile</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg hover:shadow-black cursor-pointer select-none' onClick={handleLocalSignout}>Sign out</div>
            </div>
            <div className='basis-9/12'>
                <div className='flex flex-col p-[90px] space-y-9'>
                    <p className='text-[20px] font-semibold tracking-wider pl-3'>Profile </p>
                    <div className=' w-full h-[498px]'>


                    {user.map((data,index)=>(
                        
                        <div className='w-full h-[550px] overflow-auto bg-gradient-to-b from-cyan-500 to-blue-500 mb-1 flex flex-col text-white space-x-2 p-4 rounded-lg'>
                        <div className='flex items-center justify-center'>
                        <img src={data.photopath} width={250} className='rounded-lg fixed'/>
                        </div>
                        <div className=' flex flex-row items-center justify-center space-x-3 pt-[150px]'>
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
                        </div>
                       
                        ))      
                        }  

        
                            
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default UserInfo