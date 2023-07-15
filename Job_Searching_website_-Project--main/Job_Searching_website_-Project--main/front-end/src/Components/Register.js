import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


function Register() {
  const [name,setname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [education,setEducation]=useState("");
  const [workExperience,setWorkExp]=useState("");
  const [skills,setSkills]=useState("");
  const [gender,setGender]=useState("");
  const [registrationNo,setRegistrationNo]=useState("");
  const [image,setimage]=useState();


  const handleRegister=async()=>{
    let formdata=new FormData();
    formdata.append('name',name);
    formdata.append('pic',image);
    formdata.append('email',email);
    formdata.append('password',password);
    formdata.append('education',education);
    formdata.append('workExperience',workExperience);
    formdata.append('skills',skills);
    formdata.append('gender',gender);
    formdata.append('registrationNo',registrationNo);
    try{
    const result=await axios.post('http://localhost:5000/userRegister',formdata)
      if(result.data.msg==='Email already existed')
      {
        alert("Email already existed");
      }
      else if(result.data.msg==='User inserted'){
        alert("New User Created.");
        document.location.replace('/');
      }
      else{
        alert("Server Side Error Please Try Again!!!")
      }
    }catch(e){
      console.log("Error Occured: "+e)
    }
  }
  return (   
  <div className='h-screen bg-gray-300 flex items-center justify-center'>
        
    <div className='h-[650px] w-[650px] bg-white rounded-lg flex flex-col p-5 space-y-4'>
        <p className='font-semibold text-[17px] pl-3 mb-2'>Register Here.</p>
        
        <form className='flex flex-col items-center justify-center space-y-2' encType="multipart/form-data">
          <input placeholder='your name' type="text" value={name} onChange={(e)=>setname(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <input placeholder='email address' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <input placeholder='password' type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <input placeholder='education' type="text" value={education} onChange={(e)=>setEducation(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <input placeholder='work experience' value={workExperience} onChange={(e)=>setWorkExp(e.target.value)} type="text" className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <input placeholder='skills' type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <input placeholder='gender' type="text" value={gender} onChange={(e)=>setGender(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <input placeholder='registration number' type="text" value={registrationNo} onChange={(e)=>setRegistrationNo(e.target.value)} className='w-full ring-1 ring-gray-500 h-[45px] pl-3 focus:ring-2 focus:ring-sky-500 outline-none placeholder:text-[16px] text-[16px] rounded-lg text-gray-600'/>
          <div className='flex flex-row space-x-5 w-full pl-3 ring-1 ring-gray-500 h-[45px] rounded-lg items-center'>
            <p className='text-[16px] text-gray-700 font-semibold'>Profile pic</p>
            <input type='file' className='h-full file:mt-2 file:text-gray-600 w-[430px]' name='pic' onChange={(e)=>setimage(e.target.files[0])}/>
          </div>
            
          <div className='flex flex-row space-x-2 items-center justify-center '>
           <button className='w-[180px] h-[40px] bg-red-500 text-white text-[16px] rounded-lg' type='submit' onClick={handleRegister}>Register User</button>
          </div>


        </form>
        
        
        <div className='flex flex-col items-center justify-center'>
        <p className='text-[14px] font-semibold'>Already have an account?<Link to='/'><span className='text-[14px] font-semibold text-sky-500 cursor-pointer'> Login Here</span></Link></p>
        
        </div>
    </div>
     
  </div>
  )
}

export default Register