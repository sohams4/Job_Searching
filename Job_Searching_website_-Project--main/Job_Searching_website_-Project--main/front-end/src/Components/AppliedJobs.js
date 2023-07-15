import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function AppliedJobs() {
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
    const [jobTitle,setjobTitle]=useState([]);
    useEffect(()=>{
        const fetchId=async()=>{
            let result=await axios.post('http://localhost:5000/user/applied/title',{
                email:localStorage.getItem('email')
            })
            if(result)
            {
                setjobTitle(result.data);
            }
            
        }
        
        
        fetchId();
    },[])



    
    const handleJobCancel=async(id,email,title)=>{
        let Id=JSON.stringify(id);
        let url=`http://localhost:5000/user/job/cancel/`+Id+'/'+email+'/'+title
        url=url.replace(/['"]+/g, '');
        try{
            let result=await axios.get(url);
            if(result)
            {
                alert("Job application have been withrawal");
                document.location.replace('/appliedJobs');
            }
            else{
                alert("Unable to withdraw job");
                document.location.replace('/appliedJobs');
            }
        }catch(e){
            alert("Check Internet! or refresh the page");
        }
    }

  return (
    <div>
        <div className='flex flex-row h-screen'>
            
            <div className='basis-3/12 bg-gradient-to-r from-sky-600 to-blue-700 flex flex-col items-center justify-center space-y-8'>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none' onClick={()=>navigate('/')}>Show Available Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>handleRefresh}>Applied Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/applicationResult')}>Jobs Feedback</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/userInfo')}>Profile</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg hover:shadow-black cursor-pointer select-none' onClick={handleLocalSignout}>Sign out</div>
            </div>
            <div className='basis-9/12'>
                <div className='flex flex-col p-[90px] space-y-9'>
                    <p className='text-[20px] font-semibold tracking-wider pl-3'>Applied Jobs </p>
                    <div className='overflow-auto w-full h-[498px]'>


                   {jobTitle.map((items,index)=>
                        
                        <div key={index} className='w-full h-[250px] bg-gradient-to-b from-cyan-500 to-blue-500 mb-1 flex flex-row text-white space-x-2 p-4 rounded-lg'>
                            <img src={items.ImagePath} width={250} className='rounded-lg'/>
                                <div className='w-[490px] flex flex-col space-y-3'>
                                    <p className='text-[18px] font-medium tracking-wider'>{items.JobTitle}</p>
                                    <p className='text-[18px] tracking-wider'>{items.JobDesc}</p>
                                </div>
                        <div className='h-full flex items-center flex-row space-x-2'>
                        <button className='text-white w-[100px] h-[55px] bg-red-600 tracking-wider rounded-lg' onClick={()=>handleJobCancel(items._id,localStorage.getItem('email'),items.JobTitle)}>Cancel</button>
                                
                        </div>
                    </div>

                   
                   )}
                           
                            
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AppliedJobs