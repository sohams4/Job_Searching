import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Home() {
    const [jobdata,setjobdata]=useState([]);
    const [jobapplieddata,setjobapplieddata]=useState([]);
    useEffect(()=>{
        const showJobs=async()=>{
            let result=await axios.get('http://localhost:5000/getalljobs')
            setjobdata(result.data);
        }
        
        showJobs();
    },[])

    

    const navigate=useNavigate();
    const handleAppliedJob=async(id,title,desc,imgpath)=>{

            let Id=JSON.stringify(id);
            let url=`http://localhost:5000/user/job/applied/`+Id
            url=url.replace(/['"]+/g, '');
            const result=await axios.post(url,{
            email:localStorage.getItem('email'),
            JobTitle:title,
            JobDesc:desc,
            ImagePath:imgpath,
        })
        if(result)
        {
            if(result.data.msg==="Already Applied")
            alert("Already Applied")
            else
            alert("applied To Job");
            document.location.replace('/userHome');
        }
        else{
            alert("Unable to Apply.")
        }

        
    }

    const handleRefresh=()=>
    {
        window.location.reload();
        
    }
    const handleLocalSignout=()=>
    {
        localStorage.clear();
        navigate('/');
    }
  return (
    <div>
        <div className='flex flex-row h-screen'>
            <div className='basis-3/12 bg-gradient-to-r from-sky-600 to-blue-700 flex flex-col items-center justify-center space-y-8'>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={handleRefresh}>Show Available Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/appliedJobs')}>Applied Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/applicationResult')}>Jobs Feedback</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/userInfo')}>Profile</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg hover:shadow-black cursor-pointer select-none' onClick={handleLocalSignout}>Sign out</div>
            </div>
            <div className='basis-9/12'>
                <div className='flex flex-col p-[90px] space-y-9'>
                    <p className='text-[20px] font-semibold tracking-wider pl-3'>Available Jobs </p>
                    <div className='overflow-auto w-full h-[498px]'>

                
                    {
                        jobdata.map((data,index)=>(
                            <div className='w-full h-[250px] bg-gradient-to-b from-cyan-500 to-blue-500 mb-1 flex flex-row text-white space-x-2 p-4 rounded-lg'>
                            <img src={data.ImagePath} width={250} className='rounded-lg'/>
                            <div className='w-[490px] flex flex-col space-y-3'>
                                <p className='text-[18px] font-medium tracking-wider'>{data.JobTitle}</p>
                                <pre className='text-[18px] tracking-wider'>{data.JobDesc}</pre>
                                
                            </div>
                        
                               
                                
                                    <div className='h-full flex items-center'>
                              
                                    <button className='text-white w-[190px] h-[55px] bg-blue-700 tracking-wider rounded-lg' onClick={()=>handleAppliedJob(data._id,data.JobTitle,data.JobDesc,data.ImagePath)}>Apply Now</button>     
                                  
                                      
                               
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

export default Home