import React from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
function AddJobs() {
    const navigate=useNavigate();
    const [image,setImage]=useState();
    const [jobtitle,setjobtitle]=useState("");
    const [jobdesc,setjobdesc]=useState("");

    const handleJobpost=async()=>
    {
        let formdata=new FormData();
        formdata.append('pic',image);
        formdata.append('JobTitle',jobtitle);
        formdata.append('JobDesc',jobdesc);

        try{
            const result=await axios.post('http://localhost:5000/addingJob',formdata)
              if(result.data.msg==='Job Added'){
                alert("Job have been Added.");
              }
              else{
                alert("Server Side Error Please Try Again!!!")
              }
            }catch(e){
              console.log("Error Occured: "+e)
            }
    }
    const handleLocalSignout=()=>
    {
        localStorage.clear();
        navigate('/');
    }
    const handleRefresh=()=>
    {
        window.location.reload();
        
    }
  return (
    <div>
        <div className='flex flex-row h-screen'>
            <div className='basis-3/12 bg-gradient-to-r from-sky-600 to-blue-700 flex flex-col items-center justify-center space-y-8'>
            <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/showalljobs')}>Show All Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none' onClick={()=>navigate('/adminHome')}>Candidate Acceptance</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>handleRefresh}>Add Job</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg hover:shadow-black cursor-pointer select-none' onClick={handleLocalSignout}>Sign out</div>
            </div>
            <div className='basis-9/12'>
                <div className='flex flex-col p-[90px] space-y-9'>
                    <p className='text-[20px] font-semibold tracking-wider pl-3'>Add Jobs </p>
                    <div className='overflow-auto w-full h-[498px]'>


                    <div className=' w-full h-full bg-gradient-to-b from-cyan-500 to-blue-500 mb-1 flex flex-col text-white space-x-2 p-4 rounded-lg'>
                                <form className='flex flex-col space-y-2'>
                                    <div className='flex flex-row space-x-2 ml-2'>
                                        <p className='tracking-wider'>Job Poster: </p>
                                        <input type='file' className='file:text-white file:bg-blue-500 file:border-none file:rounded-lg file:tracking-wider file:mr-2 file:ml-2' onChange={(e)=>setImage(e.target.files[0])}/>
                                    </div>
                                    <input type='text' className='rounded-lg w-full h-[45px] tracking-wider text-gray-700 pl-3 placeholder:gray-500 outline-none focus:ring-2 focus:ring-blue-500' placeholder='Job Title' value={jobtitle} onChange={(e)=>setjobtitle(e.target.value)}/>
                                    <textarea className='resize-none w-full rounded-lg h-[320px] text-gray-700 placeholder:text-gray-400 pl-2 pt-4 pr-2 pb-2 outline-none focus:ring-2 focus:ring-blue-500' placeholder='Job Description' value={jobdesc} onChange={(e)=>setjobdesc(e.target.value)}></textarea>
                                    <button className='w-[120px] h-[45px] bg-blue-700 rounded-lg' onClick={handleJobpost}>post job</button>
                                </form>

                    </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AddJobs