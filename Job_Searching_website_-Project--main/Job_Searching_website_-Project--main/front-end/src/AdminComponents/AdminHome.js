import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import UserDetail from './UserDetal';
import { Link } from 'react-router-dom';
function AdminHome() {
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
    const [candidatedata,setcandidatedata]=useState([]);

    useEffect(()=>{
        const InterestedCandidates=async()=>{
           let result= await axios.get('http://localhost:5000/admin/user/applied/decision/job')
           if(result)
           setcandidatedata(result.data)
        }
        InterestedCandidates();
    },[])
    const handleAccept=async(id,title,email)=>{
        let Id=JSON.stringify(id);
        let url='http://localhost:5000/admin/user/accept/candidate/'+Id+'/'+title;
        url=url=url.replace(/['"]+/g, '');
        let result=await axios.post(url,{
            email:email
        })
        if(result)
        {
            document.location.replace('/adminHome')
        }
    }
    const handleReject=async(id,title,email)=>{
        let Id=JSON.stringify(id);
        let url='http://localhost:5000/admin/user/reject/candidate/'+Id+'/'+title;
        url=url=url.replace(/['"]+/g, '');
        let result=await axios.post(url,{
            email:email
        })
        console.log(url)
        if(result)
        {
            document.location.replace('/adminHome')
        }
    }
  return (
    <div>
        <div className='flex flex-row h-screen'>
            <div className='basis-3/12 bg-gradient-to-r from-sky-600 to-blue-700 flex flex-col items-center justify-center space-y-8'>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/showalljobs')}>Show All Jobs</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none' onClick={()=>handleRefresh}>Candidate Acceptance</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg  hover:shadow-black cursor-pointer select-none ' onClick={()=>navigate('/addJobs')}>Add Job</div>
                <div className='text-white text-[17px] w-[230px] h-[45px] flex items-center justify-center tracking-wider ring-2 ring-cyan-500 rounded-lg hover:shadow-lg hover:shadow-black cursor-pointer select-none' onClick={handleLocalSignout}>Sign out</div>
            </div>
            <div className='basis-9/12'>
                <div className='flex flex-col p-[90px] space-y-9'>
                    <p className='text-[20px] font-semibold tracking-wider pl-3'>Candidate Acceptance </p>
                    <div className='overflow-auto w-full h-[498px]'>


                    {
                        candidatedata.map((items,index)=>(
                            <div className='w-full h-[250px] bg-gradient-to-b from-cyan-500 to-blue-500 mb-1 flex flex-row text-white space-x-4 p-4 rounded-lg'>
                                <img src={items.ImagePath} width={250} className='rounded-lg'/>
                                <div className='w-[490px] flex flex-col space-y-3'>
                                    <p className='text-[18px] font-medium tracking-wider'>{items.JobTitle}</p>
                                    <pre className='text-[18px] tracking-wider overflow-auto h-[100px]'>{items.JobDesc}</pre>
                                    <div className='flex flex-row space-x-2'>
                                        <p  className='text-[15px] tracking-wider'>Candidate Email:</p>
                                        <p className='text-[15px] tracking-wider te'>{items.email}</p>
                                    </div>
                                    <Link to={"/admin/user/details/"+items.email}><p className='text-[15px] tracking-wider text-gray-700 font-bold underline underline-offset-2 cursor-pointer'>Candidate Detail</p></Link>
                                </div>

                                {  items.Accepted==="inprogress"?
                                <div className='h-full flex items-center flex-row space-x-2'>
                                    <button className='text-white w-[100px] h-[55px] bg-blue-700 tracking-wider rounded-lg' onClick={()=>handleAccept(items._id,items.JobTitle,items.email)}>Accept</button>
                                    <button className='text-white w-[100px] h-[55px] tracking-wider rounded-lg bg-red-500 ' onClick={()=>handleReject(items._id,items.JobTitle,items.email)}>Reject</button>
                                    
                                </div>:<></>
                                }       
                                {
                                     items.Accepted==="false"?<div className='flex items-center'>
                                        <button className='text-white w-[140px] h-[65px] tracking-wider rounded-lg bg-red-500 ' >Rejected Candidate</button>
                                     </div>:<></>

                                }
                                {
                                     items.Accepted==="true"?<div className='flex items-center'> <button className='text-white w-[140px] h-[65px] bg-blue-700 tracking-wider rounded-lg'>Accepted Candidate</button></div>:<></>
                                }

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