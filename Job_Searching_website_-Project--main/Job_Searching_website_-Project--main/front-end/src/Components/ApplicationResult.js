import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
function ApplicationResult() {
    const navigate=useNavigate();
    const handleLocalSignout=()=>
    {
        localStorage.clear();
        navigate('/');
    }
    const handleRefresh=()=>
    {
        window.location.reload();
        
    }
    const [jobresult,setjobresult]=useState([]);

    useEffect(()=>{
            const showInfo=async()=>{
                let result=await axios.post('http://localhost:5000/user/job/feedback',{
                    email:localStorage.getItem('email')
                })
                if(result)
                {
                    setjobresult(result.data)
                }
            }
            showInfo();
    },[])
  return (
    <div>
        <div className='flex flex-row h-screen'>
            <div className='basis-3/12 bg-gradient-to-r from-sky-600 to-blue-700 flex flex-col items-center justify-center space-y-8'>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none' onClick={()=>navigate('/')}>Show Available Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/appliedJobs')}>Applied Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>handleRefresh}>Jobs Feedback</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/userInfo')}>Profile</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg hover:shadow-black cursor-pointer select-none' onClick={handleLocalSignout}>Sign out</div>
            </div>
            <div className='basis-9/12'>
                <div className='flex flex-col p-[90px] space-y-9'>
                    <p className='text-[20px] font-semibold tracking-wider pl-3'>Applied Jobs Result</p>
                    <div className='overflow-auto w-full h-[498px]'>


                    {
                       jobresult.map((items,index)=>(
                        <div className='w-full h-[250px] bg-gradient-to-b from-cyan-500 to-blue-500 mb-1 flex flex-row text-white space-x-2 p-4 rounded-lg'>
                                <img src={items.ImagePath} width={250} className='rounded-lg'/>
                                <div className='w-[490px] flex flex-col space-y-3'>
                                    <p className='text-[18px] font-medium tracking-wider'>{items.JobTitle}</p>
                                    <p className='text-[18px] tracking-wider'>{items.JobDesc}</p>
                                </div>
                                <div className='h-full flex items-center flex-row space-x-2'>
                                    
                                {
                                        items.Accepted==="inprogress"?<div className='text-white w-[110px] h-[55px] cursor-default bg-green-600 tracking-wider rounded-lg flex items-center justify-center'>In Progress</div>
                                        :<></>    
                                    }
                                    {
                                        items.Accepted==="true"?<div className='text-white w-[110px] h-[55px] cursor-default bg-green-600 tracking-wider rounded-lg flex items-center justify-center'>Accepted</div>
                                        :<></>   
                                    }
                                    {
                                        items.Accepted==="false"?<div className='text-white w-[110px] h-[55px] cursor-default bg-red-600 tracking-wider rounded-lg flex items-center justify-center'>Rejected</div>
                                        :<></>
                                    }

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

export default ApplicationResult