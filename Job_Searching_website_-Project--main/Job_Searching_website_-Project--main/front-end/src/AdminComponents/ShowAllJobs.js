import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function AdminHome() {
    const navigate=useNavigate();
    const [jobdata,setjobdata]=useState([]);
    const handleLocalSignout=()=>
    {
        localStorage.clear();
        navigate('/');
    }
    const handleRefresh=()=>
    {
        window.location.reload();
        
    }
    const handleUserDelete=async(id)=>{
        let Id=JSON.stringify(id);
        let url=`http://localhost:5000/admin/job/delete/`+Id
        url=url.replace(/['"]+/g, '');
        try{
            let result=await axios.get(url);
            if(result)
            {
                alert("Job have been deleted");
                document.location.replace('/showalljobs');
            }
            else{
                alert("Unable to delete job");
                document.location.replace('/showalljobs');
            }
        }catch(e){
            alert("Check Internet! or refresh the page");
        }
    }
    useEffect(()=>{
        const gettingJobs=async()=>{
            try{
                let result=await axios.get('http://localhost:5000/getalljobs');
                console.log(result)
                setjobdata(result.data);
            }
            catch(e){
                alert("Please check your Internet Connection or Refresh")
            }
        }
        gettingJobs();
    },[])
  return (
    <div>
        <div className='flex flex-row h-screen'>
            <div className='basis-3/12 bg-gradient-to-r from-sky-600 to-blue-700 flex flex-col items-center justify-center space-y-8'>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>handleRefresh}>Show All Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none' onClick={()=>navigate('/adminHome')}>Candidate Acceptance</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/addJobs')}>Add Job</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg hover:shadow-black cursor-pointer select-none' onClick={handleLocalSignout}>Sign out</div>
            </div>
            <div className='basis-9/12'>
                <div className='flex flex-col p-[90px] space-y-9'>
                    <p className='text-[20px] font-semibold tracking-wider pl-3'>Listed Jobs </p>
                    <div className='overflow-auto w-full h-[498px]'>


                    {
                        jobdata.map((data,index)=>(
                            <div className='w-full h-[250px] bg-gradient-to-b from-cyan-500 to-blue-500 mb-1 flex flex-row text-white space-x-2 p-4 rounded-lg'>
                            <img src={data.ImagePath} width={250} className='rounded-lg'/>
                            <div className='w-[490px] flex flex-col space-y-3'>
                                <p className='text-[18px] font-medium tracking-wider'>{data.JobTitle}</p>
                                <pre className='text-[18px] tracking-wider'>{data.JobDesc}</pre>
                            </div>
                            <div className='flex items-center'>
                            <button className='text-white w-[100px] h-[55px] tracking-wider rounded-lg bg-red-500 cursor-default' onClick={()=>handleUserDelete(data._id)} >Remove</button>
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

export default AdminHome