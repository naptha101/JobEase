import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { GiMoneyStack } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import userImg from '../../assets/userImg.png'
const JobDetails = () => {
  const {id}=useParams()
   const user=JSON.parse(localStorage.getItem('user'))
     const [job,setJob]=useState({});
  const [by,setBy]=useState({});
  const fetchJob=async ()=>{
    try{
const data=await axios.get('http://localhost:8000/api/jobs/'+id,{withCredentials:true}).then((e)=>{
 setJob(e.data.job)
fetchBy(e.data.job)
updateCount();

  toast.success(e.data.message);
}).catch(err)(
  toast.error("Error occured")
)


    }
    catch(err){
  //    toast.error(err.message);
    }
  }
  const updateCount=async ()=>{
    try{
  //    console.log(job);

      
      // setJob(updatedJob);
    await axios.put('http://localhost:8000/api/jobs/updcount/'+id,job,{withCredentials:true}).then((data)=>{
//console.log(data);
setJob(data.data.updt);
console.log(data.data.updt)
    })
  
  }
    catch(err){
 console.log(err);
    }
  }
  const fetchBy=async (e)=>{
    try{
      console.log(e.postedBy);
const data=await axios.get(`http://localhost:8000/api/auth/getby/${e.postedBy}`).then((data)=>{
  setBy(data.data.data);
console.log(data);
})
    }catch(err){
toast.success(err);
    }
  }
  const navigate=useNavigate();
  useEffect(()=>{
    fetchJob()
  },[])
  return (
    <div className='flex flex-col w-full min-h-screen max-h-fit my-[10%] gap-4 p-3 px-10 justify-center items-center'>
      <div className='flex flex-row gap-7  justify-between items-start rounded-lg py-8 w-full px-10 bg-slate-400'>
        <div className='flex flex-col items-start gap-3'>
      <h1 className='text-4xl font-bold'>{job.title}</h1>
<Link to={'/userprofile/'+by._id}><h1  className='font-3xl font-semibold hover:scale-105 duration-300'>By-{by.username}</h1></Link>
<div className='p-2 text-center text-white bg-slate-500 rounded-md'> {job.category}</div>
<div className='flex flex-col gap-1 bg-gray-200 rounded-lg'>
  <h1 className='flex flex-row item-center justify-center gap-4 '>Location<CiLocationOn size={26} className='bg-transparent white'></CiLocationOn></h1>
 <div className='bg-gray-300 p-2 rounded-b-lg'>
  {job.city+" "+job.country}
 </div>
</div>
</div>
<div className='w-[200px] h-[200px] border border-black border-2 rounded-full overflow-hidden'>
  <img className="w-[250px] h-[250px] " src={by.profileSet?by.profile.url:userImg}></img>
</div>
</div>
      <div className='container w-100% bg-slate-400 p-4 rounded-lg'>
      <div className='flex flex-col border-solid border rounded-lg  border-black'>
  <div className='flex flex-col p-2 '>
    <div className='bg-gray-200 rounded-lg py-2 px-2'>Description<h4 className='bg-gray-300 p-2 rounded-md'>{job.description}</h4>
    <div></div>
    <div className='flex flex-col gap-1 bg-gray-200 rounded-lg'>
  <h1 className='flex flex-row item-center justify-start gap-4 '>Salary<GiMoneyStack size={26} className='bg-transparent white'></GiMoneyStack></h1>
 <div className='bg-gray-300 p-2 rounded-b-lg'>
  {job.fixedSalary?`$.${job.fixedSalary}`:`$.${job.salaryFrom} -$.${job.salaryTo}`}
 </div>
</div>
<div className='flex flex-col gap-1 bg-gray-200 rounded-lg'>
  <h1 className='flex flex-row item-center justify-start gap-4 '>Exact Location<CiLocationOn size={26} className='bg-transparent white'></CiLocationOn></h1>
 <div className='bg-gray-300 p-2 rounded-b-lg'>
  {job.location}
 </div>
</div>



  </div>
  </div>
<div className='grid grid-flow-col justify-between item-center'>
 {user&&user.role=='Job seeker'?<Link to={'/application/'+job._id}><button className='rounded-md flex flex-row items-center px-4 py-2 mx-10 bg-slate-500 text-2xl font-bold gap-3 text-white hover:scale-105 duration-300' >Apply <CiEdit></CiEdit> </button></Link>:<div className='w-full'></div>}
  <div className=' flex flex-row justify-end gap-2 items-end p-4'>
<FaRegEye className='bg-transparent color-white' size={20}></FaRegEye>
<h1>{job.count}</h1>
  </div>
</div>
</div>
      </div>

    </div>
  )
}

export default JobDetails